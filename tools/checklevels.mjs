// Vérifie les niveaux de levels.ts : largeur des lignes, une ligne de danger
// sous le sol, et la règle "jamais de plateforme au-dessus d'un trou, de
// piques ou de la case qui les précède" (on se cognerait la tête en sautant).
//
// Usage : node tools/checklevels.mjs

import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const here = path.dirname(fileURLToPath(import.meta.url))
const src = fs.readFileSync(path.join(here, "..", "levels.ts"), "utf8")

const levels = []
const re = /new LevelDef\(\s*"([^"]+)",\s*[^,]+,\s*\[([\s\S]*?)\]\s*\)/g
for (const m of src.matchAll(re)) {
    const rows = [...m[2].matchAll(/"([^"]*)"/g)].map((r) => r[1])
    levels.push({ name: m[1], rows })
}

let errors = 0
const fail = (msg) => {
    errors++
    console.log(`  ERREUR : ${msg}`)
}

for (const { name, rows } of levels) {
    console.log(`${name} (${rows[0].length} x ${rows.length})`)
    const w = rows[0].length
    rows.forEach((r, i) => {
        if (r.length !== w) fail(`ligne ${i} : largeur ${r.length} != ${w}`)
    })
    const last = rows[rows.length - 1]
    if (!/^~+$/.test(last)) fail("la dernière ligne doit être des ~")
    const ground = rows.length - 2
    const walk = ground - 1
    const cell = (r, c) =>
        r >= 0 && r < rows.length && c >= 0 && c < w ? rows[r][c] : "."
    for (let c = 0; c < w; c++) {
        const danger = cell(ground, c) !== "#" || cell(walk, c) === "^"
        if (!danger) continue
        const what = cell(walk, c) === "^" ? "piques" : "trou"
        // Les deux cases avant : c'est là qu'on prend son élan pour sauter
        for (const cc of [c - 2, c - 1, c]) {
            for (let r = 0; r < walk; r++) {
                if (cell(r, cc) === "=")
                    fail(
                        `${what} colonne ${c} : plateforme au-dessus en ligne ${r}, colonne ${cc}`,
                    )
            }
        }
        // La case qui suit : pas de plateforme haute (on s'y cogne au sommet du saut)
        for (let r = 0; r < walk - 1; r++) {
            if (cell(r, c + 1) === "=")
                fail(
                    `${what} colonne ${c} : plateforme haute juste après, en ligne ${r}, colonne ${c + 1}`,
                )
        }
    }
    // Un volant au-dessus d'un trou ou de piques doit être assez haut
    for (let c = 0; c < w; c++) {
        const gapLen = (() => {
            if (cell(ground, c) === "#") return 0
            let a = c
            while (a > 0 && cell(ground, a - 1) !== "#") a--
            let b = c
            while (b < w - 1 && cell(ground, b + 1) !== "#") b++
            return b - a + 1
        })()
        const spikes = cell(walk, c) === "^"
        if (!gapLen && !spikes) continue
        const maxRow = gapLen === 2 ? 3 : 2
        // (le volant va et vient sur 2 à 3 cases de chaque côté)
        for (let cc = c - 2; cc <= c + 2; cc++) {
            for (let r = 0; r < walk; r++) {
                if (cell(r, cc) === "b" && r > maxRow)
                    fail(
                        `volant ligne ${r} colonne ${cc} : trop bas près ${spikes ? "des piques" : "du trou"} colonne ${c} (ligne ${maxRow} maximum)`,
                    )
            }
        }
    }
    // Le portail et le départ sont sur du sol
    for (const k of ["P", "F"]) {
        const c = rows[walk].indexOf(k)
        if (c < 0) fail(`pas de ${k}`)
        else if (cell(ground, c) !== "#") fail(`${k} n'est pas sur du sol`)
    }
    // Les ennemis qui marchent sont posés sur du sol (les objets peuvent flotter au-dessus d'un trou : on les attrape en sautant)
    for (let c = 0; c < w; c++) {
        const ch = cell(walk, c)
        if ("e?".includes(ch) && cell(ground, c) !== "#")
            fail(`'${ch}' colonne ${c} est au-dessus d'un trou`)
    }
    const count = (ch) => rows.join("").split(ch).length - 1
    console.log(
        `  étoiles ${count("*")}  coeurs ${count("h")}  potions ${count("p")}  champignons ${count("m")}  marcheurs ${count("e")}  volants ${count("b")}  piques ${count("^")}  portes ${count("?")}`,
    )
}
console.log(errors ? `${errors} erreur(s)` : "OK")
process.exit(errors ? 1 : 0)
