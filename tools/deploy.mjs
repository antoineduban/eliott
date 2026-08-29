// Déploie le jeu sur la console ELECFREAKS Arcade (STM32F401) branchée en USB.
//
// La console, quand elle fait tourner un jeu, n'apparaît pas comme un disque :
// elle expose seulement une interface USB "HF2". On lui envoie la commande
// HF2 "reset into bootloader", elle redémarre en mode bootloader et monte un
// disque UF2 (/Volumes/...). On y copie alors le fichier .uf2 : la console
// flashe le jeu et redémarre dessus.
//
// Usage : node tools/deploy.mjs [chemin du .uf2]   (défaut : built/stm32f401/binary.uf2)
//         node tools/deploy.mjs --info              (affiche l'état de la console)
//         node tools/deploy.mjs --reset-app         (redémarre l'application)

import fs from "node:fs"
import { createRequire } from "node:module"
import path from "node:path"
import { fileURLToPath } from "node:url"

// Le paquet "usb" (v3) est en CommonJS et expose une API façon WebUSB
const require = createRequire(import.meta.url)
const { usb } = require("usb")

// Identifiants USB de la console (vus dans ioreg) :
//  - bootloader (ou bootloader avec relais HF2) : ELECFREAKS "Arcade", VID 26AC / PID 1043
//  - jeu MakeCode en cours d'exécution : "Arcade (app)", VID 0483 (STMicro) / PID 5799
const KNOWN_IDS = [
    { vid: 0x26ac, pid: 0x1043 },
    { vid: 0x0483, pid: 0x5799 },
]
const isConsole = (d) =>
    KNOWN_IDS.some((k) => d.vendorId === k.vid && d.productId === k.pid) ||
    /arcade/i.test(d.productName || "")

const HF2_CMD_BININFO = 0x0001
const HF2_CMD_INFO = 0x0002
const HF2_CMD_RESET_INTO_APP = 0x0003
const HF2_CMD_RESET_INTO_BOOTLOADER = 0x0004
const HF2_FLAG_CMDPKT_LAST = 0x40
const HF2_FLAG_SERIAL_OUT = 0x80
const HF2_FLAG_SERIAL_ERR = 0xc0

const here = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(here, "..")

class Hf2 {
    constructor() {
        this.tag = 1
    }

    async open() {
        const devices = await usb.getDevices()
        const dev = devices.find(isConsole)
        if (!dev) {
            throw new Error(
                "Console introuvable en USB. Est-elle branchée et allumée ?",
            )
        }
        console.log(
            `Console : ${dev.productName || "?"} (VID ${dev.vendorId.toString(16)} / PID ${dev.productId.toString(16)})`,
        )
        await dev.open()
        if (!dev.configuration) await dev.selectConfiguration(1)
        const iface = dev.configuration.interfaces.find((i) =>
            i.alternates.some((a) => a.interfaceClass === 0xff),
        )
        if (!iface)
            throw new Error(
                "Interface HF2 (classe 0xFF) introuvable sur la console",
            )
        await dev.claimInterface(iface.interfaceNumber)
        const alt = iface.alternates.find((a) => a.interfaceClass === 0xff)
        const epIn = alt.endpoints.find((e) => e.direction === "in")
        const epOut = alt.endpoints.find((e) => e.direction === "out")
        if (!epIn || !epOut) throw new Error("Endpoints bulk HF2 introuvables")
        this.dev = dev
        this.ifaceNumber = iface.interfaceNumber
        this.epIn = epIn.endpointNumber
        this.epOut = epOut.endpointNumber
    }

    async close() {
        try {
            await this.dev.releaseInterface(this.ifaceNumber)
        } catch {}
        try {
            await this.dev.close()
        } catch {}
    }

    // Envoie une commande HF2 et renvoie { status, data } (ou null si pas de réponse)
    async command(cmdId, data = Buffer.alloc(0), expectResponse = true) {
        const tag = this.tag++ & 0xffff
        const msg = Buffer.alloc(8 + data.length)
        msg.writeUInt32LE(cmdId, 0)
        msg.writeUInt16LE(tag, 4)
        data.copy(msg, 8)
        // découpage en paquets de 63 octets de données + 1 octet d'en-tête
        for (let off = 0; off < msg.length; off += 63) {
            const chunk = msg.subarray(off, Math.min(off + 63, msg.length))
            const last = off + 63 >= msg.length
            const pkt = Buffer.alloc(chunk.length + 1)
            pkt[0] = chunk.length | (last ? HF2_FLAG_CMDPKT_LAST : 0)
            chunk.copy(pkt, 1)
            const r = await this.dev.transferOut(this.epOut, pkt)
            if (r.status !== "ok")
                throw new Error(`Envoi USB échoué (${r.status})`)
        }
        if (!expectResponse) return null
        // réponse : paquets jusqu'au drapeau "dernier"
        const parts = []
        for (;;) {
            const r = await this.dev.transferIn(this.epIn, 64)
            if (r.status !== "ok")
                throw new Error(`Réception USB échouée (${r.status})`)
            const pkt = Buffer.from(
                r.data.buffer,
                r.data.byteOffset,
                r.data.byteLength,
            )
            if (pkt.length === 0) continue
            const flag = pkt[0] & 0xc0
            const len = pkt[0] & 0x3f
            const payload = pkt.subarray(1, 1 + len)
            if (flag === HF2_FLAG_SERIAL_OUT || flag === HF2_FLAG_SERIAL_ERR) {
                process.stdout.write(`[console] ${payload.toString("utf8")}`)
                continue
            }
            parts.push(payload)
            if (flag === HF2_FLAG_CMDPKT_LAST) break
        }
        const resp = Buffer.concat(parts)
        const respTag = resp.readUInt16LE(0)
        if (respTag !== tag)
            throw new Error(`Réponse HF2 inattendue (tag ${respTag} != ${tag})`)
        return { status: resp[2], statusInfo: resp[3], data: resp.subarray(4) }
    }

    async binInfo() {
        const r = await this.command(HF2_CMD_BININFO)
        const d = r.data
        return {
            mode: d.readUInt32LE(0), // 1 = bootloader, 2 = application
            pageSize: d.readUInt32LE(4),
            numPages: d.readUInt32LE(8),
            maxMessage: d.readUInt32LE(12),
            family: d.length >= 20 ? d.readUInt32LE(16) : 0,
        }
    }

    async info() {
        const r = await this.command(HF2_CMD_INFO)
        return r.data.toString("utf8")
    }
}

function modeName(mode) {
    if (mode === 1) return "bootloader"
    if (mode === 2) return "application"
    return String(mode)
}

function listUf2Volumes() {
    const vols = []
    for (const name of fs.readdirSync("/Volumes")) {
        const p = path.join("/Volumes", name)
        try {
            if (fs.existsSync(path.join(p, "INFO_UF2.TXT"))) vols.push(p)
        } catch {}
    }
    return vols
}

async function waitForUf2Volume(timeoutMs) {
    const start = Date.now()
    while (Date.now() - start < timeoutMs) {
        const vols = listUf2Volumes()
        if (vols.length) return vols[0]
        await new Promise((r) => setTimeout(r, 500))
    }
    return null
}

async function main() {
    const arg = process.argv[2]
    if (arg === "--info") {
        const hf2 = new Hf2()
        await hf2.open()
        try {
            const bi = await hf2.binInfo()
            console.log(`mode: ${modeName(bi.mode)}`)
            console.log(
                `page: ${bi.pageSize} octets, pages: ${bi.numPages}, message max: ${bi.maxMessage}, famille UF2: 0x${bi.family.toString(16)}`,
            )
            console.log(`info: ${await hf2.info()}`)
        } finally {
            await hf2.close()
        }
        return
    }
    if (arg === "--reset-app") {
        const hf2 = new Hf2()
        await hf2.open()
        await hf2.command(HF2_CMD_RESET_INTO_APP, Buffer.alloc(0), false)
        await hf2.close()
        console.log("Redémarrage de l'application demandé.")
        return
    }

    const uf2Path = path.resolve(
        arg || path.join(root, "built", "stm32f401", "binary.uf2"),
    )
    if (!fs.existsSync(uf2Path)) {
        throw new Error(
            `Fichier UF2 introuvable : ${uf2Path} (lancer : makecode build)`,
        )
    }
    const size = fs.statSync(uf2Path).size
    console.log(`UF2 : ${uf2Path} (${(size / 1024).toFixed(0)} Ko)`)

    const manual =
        "Passer la console en mode bootloader À LA MAIN, puis relancer ce script :\n" +
        "  - appuyer deux fois de suite sur le bouton reset (au dos), OU\n" +
        "  - la débrancher/rebrancher en maintenant le bouton A.\n" +
        "Le disque ARCADE-F4 doit apparaître ; ce script y copiera alors le jeu."

    let volume = listUf2Volumes()[0]
    if (!volume) {
        // Essai automatique : demander le passage en bootloader via HF2.
        // Attention : le bootloader HF2 de cette console peut se bloquer (Stall)
        // après plusieurs resets ; dans ce cas on retombe sur la méthode manuelle.
        console.log("Tentative de passage en mode bootloader via HF2...")
        const hf2 = new Hf2()
        try {
            await hf2.open()
            const bi = await hf2.binInfo()
            console.log(`  mode actuel : ${modeName(bi.mode)}`)
            await hf2.command(
                HF2_CMD_RESET_INTO_BOOTLOADER,
                Buffer.alloc(0),
                false,
            )
        } catch (e) {
            // la console redémarre souvent avant d'accuser réception ; un Stall
            // persistant = bootloader bloqué, on bascule en manuel plus bas
            console.log(`  (HF2 indisponible : ${e.message})`)
        } finally {
            await hf2.close()
        }
        console.log("Attente du disque UF2...")
        volume = await waitForUf2Volume(15000)
        if (!volume)
            throw new Error(`Le disque UF2 n'est pas apparu.\n${manual}`)
    }
    console.log(`Disque UF2 : ${volume}`)
    try {
        console.log(
            fs
                .readFileSync(path.join(volume, "INFO_UF2.TXT"), "utf8")
                .trim()
                .replace(/^/gm, "  "),
        )
    } catch {}
    const dest = path.join(volume, "binary.uf2")
    console.log("Copie du jeu sur la console...")
    fs.copyFileSync(uf2Path, dest)
    console.log("Copie terminée : la console redémarre sur le jeu.")
}

main().catch((e) => {
    console.error(`Erreur : ${e.message}`)
    process.exit(1)
})
