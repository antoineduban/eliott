// Pilote le simulateur MakeCode (servi par `makecode serve`) avec Playwright.
//
// Usage : node tools/sim.mjs "<commandes séparées par ;>"
//   wait <ms>            attendre (en temps de jeu)
//   shot <nom>           capture d'écran du simulateur dans tools/shots/<nom>.png
//   press <touche> [ms]  appuyer puis relâcher (maintien optionnel en ms)
//   hold <touche> <ms>   maintenir la touche pendant <ms>
//   down <touche>        enfoncer la touche
//   up <touche>          relâcher la touche
//   log                  afficher la sortie console (serial) accumulée du jeu
//   reload               recharger la page (redémarre le jeu)
//
// Touches : ArrowLeft/Right/Up/Down, z (bouton A), x (bouton B), Enter (menu)
//
// SIM_URL=<url> (défaut http://localhost:7001/, le jeu Lila) : page du simulateur ;
// le jeu de course (dossier course/) est servi sur http://localhost:7002/.
// SIM_SPEED=<k> (défaut 1) accélère le temps du simulateur d'un facteur k :
// l'horloge et les minuteries de la page sont mises à l'échelle, le jeu tourne
// k fois plus vite (tant que le CPU suit). Les durées des commandes sont en
// temps de jeu. Voir tools/play.mjs pour un scénario complet.

import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { chromium } from "playwright-core"

const here = path.dirname(fileURLToPath(import.meta.url))
const shotsDir = path.join(here, "shots")
export async function openSim(options = {}) {
    const speed = options.speed ?? Number(process.env.SIM_SPEED || 1)
    const url = options.url || process.env.SIM_URL || "http://localhost:7001/"
    fs.mkdirSync(shotsDir, { recursive: true })
    const browser = await chromium.launch({ headless: true })
    const page = await browser.newPage({
        viewport: { width: 900, height: 620 },
    })
    // Accélération du temps : s'applique à toutes les frames (dont le simulateur)
    if (speed !== 1) {
        await page.addInitScript((k) => {
            const realDateNow = Date.now.bind(Date)
            const realPerfNow = performance.now.bind(performance)
            const t0 = realDateNow()
            const p0 = realPerfNow()
            Date.now = () => t0 + (realDateNow() - t0) * k
            performance.now = () => p0 + (realPerfNow() - p0) * k
            const st = window.setTimeout.bind(window)
            const si = window.setInterval.bind(window)
            window.setTimeout = (fn, ms, ...args) =>
                st(fn, (ms || 0) / k, ...args)
            window.setInterval = (fn, ms, ...args) =>
                si(fn, (ms || 0) / k, ...args)
        }, speed)
    }
    // Capture les messages "serial" (console.log du jeu) envoyés par le simulateur
    await page.addInitScript(() => {
        window.__serial = []
        window.addEventListener("message", (ev) => {
            const d = ev.data
            if (d && (d.type === "serial" || d.type === "bulkserial")) {
                const txt =
                    d.type === "serial"
                        ? d.data
                        : (d.data || []).map((x) => x.data).join("")
                window.__serial.push(txt)
            }
        })
    })
    await page.goto(url)
    const frameEl = await page.waitForSelector("#simframe", { timeout: 20000 })
    const frame = await frameEl.contentFrame()
    await frame.waitForSelector("canvas", { timeout: 30000 })
    // Le simulateur écoute les touches sur son document : on lui donne le focus
    await frameEl.click({ position: { x: 20, y: 20 } })
    await page.waitForTimeout(500)

    // Attente exprimée en temps de jeu
    const wait = (ms) => page.waitForTimeout(ms / speed)

    const sim = {
        page,
        frame,
        browser,
        speed,
        wait,
        // La page se recharge si le jeu appelle control.reset() : on retrouve
        // la frame du simulateur à chaque fois.
        async currentFrame() {
            const el = await page.waitForSelector("#simframe", {
                timeout: 20000,
            })
            const f = await el.contentFrame()
            await f.waitForSelector("canvas", { timeout: 30000 })
            sim.frame = f
            return f
        },
        async shot(name) {
            const f = await sim.currentFrame()
            const canvas = f.locator("canvas").first()
            const file = path.join(shotsDir, `${name}.png`)
            await canvas.screenshot({ path: file })
            return file
        },
        async serial() {
            try {
                return await page.evaluate(() => {
                    const s = window.__serial.join("")
                    window.__serial = []
                    return s
                })
            } catch (e) {
                if (/Execution context was destroyed/.test(String(e)))
                    return "[page rechargée]\n"
                throw e
            }
        },
        async press(key, ms = 80) {
            await page.keyboard.down(key)
            await wait(ms)
            await page.keyboard.up(key)
        },
        async hold(key, ms) {
            await page.keyboard.down(key)
            await wait(ms)
            await page.keyboard.up(key)
        },
        down: (key) => page.keyboard.down(key),
        up: (key) => page.keyboard.up(key),
        async reload() {
            await page.reload()
            const el = await page.waitForSelector("#simframe", {
                timeout: 20000,
            })
            const f = await el.contentFrame()
            await f.waitForSelector("canvas", { timeout: 30000 })
            await el.click({ position: { x: 20, y: 20 } })
            sim.frame = f
        },
        close: () => browser.close(),
    }
    return sim
}

export async function runScript(sim, script) {
    const cmds = script
        .split(";")
        .map((s) => s.trim())
        .filter(Boolean)
    for (const cmd of cmds) {
        const [op, ...args] = cmd.split(/\s+/)
        switch (op) {
            case "wait":
                await sim.wait(Number(args[0]))
                break
            case "shot":
                console.log(`shot: ${await sim.shot(args[0])}`)
                break
            case "press":
                await sim.press(args[0], args[1] ? Number(args[1]) : 80)
                break
            case "hold":
                await sim.hold(args[0], Number(args[1]))
                break
            case "down":
                await sim.down(args[0])
                break
            case "up":
                await sim.up(args[0])
                break
            case "log":
                console.log(`--- serial ---\n${await sim.serial()}--- end ---`)
                break
            case "reload":
                await sim.reload()
                break
            default:
                throw new Error(`commande inconnue: ${op}`)
        }
    }
}

const isMain =
    process.argv[1] &&
    path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
if (isMain) {
    const script = process.argv[2] || "wait 2000; shot screen; log"
    const sim = await openSim()
    try {
        await runScript(sim, script)
    } finally {
        await sim.close()
    }
}
