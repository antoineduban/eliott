// Lance le mode démo du jeu de course (dossier course/, simulateur sur le port
// 7002) et suit sa progression via la console du jeu.
//
// Usage : node tools/play-race.mjs [durée max de jeu en s] [intervalle captures en s] [course de départ 1-5]
//
// Le serveur doit tourner : cd course && ../node_modules/.bin/makecode serve -p 7002
// Le temps du jeu est accéléré (SIM_SPEED, défaut 4). Le script s'arrête sur
// CHAMPION ou à la fin du temps imparti.

import { openSim } from "./sim.mjs"

const maxSeconds = Number(process.argv[2] || 400)
const shotEvery = Number(process.argv[3] || 30)
const startTrack = Number(process.argv[4] || 1)
const speed = Number(process.env.SIM_SPEED || 4)

const sim = await openSim({
    speed,
    url: process.env.SIM_URL || "http://localhost:7002/",
})
try {
    await sim.wait(2000)
    for (let i = 1; i < startTrack; i++) {
        await sim.press("x")
        await sim.wait(150)
    }
    await sim.down("ArrowDown")
    await sim.wait(100)
    await sim.press("z")
    await sim.wait(100)
    await sim.up("ArrowDown")

    const realStart = Date.now()
    let gameSeconds = 0
    let lastShot = 0
    let shotIndex = 0
    let allLog = ""
    let done = false
    while (!done && gameSeconds < maxSeconds) {
        await sim.wait(1000)
        gameSeconds += 1
        const log = await sim.serial()
        if (log) {
            process.stdout.write(log.replace(/^(?=.)/gm, `[${gameSeconds}s] `))
            allLog += log
        }
        if (gameSeconds - lastShot >= shotEvery) {
            lastShot = gameSeconds
            shotIndex++
            const name = `race-${String(shotIndex).padStart(2, "0")}-${gameSeconds}s`
            await sim.shot(name)
            console.log(`[shot ${name}]`)
        }
        if (/CHAMPION/.test(allLog)) done = true
    }
    await sim.shot("race-final")
    const realSeconds = (Date.now() - realStart) / 1000
    console.log(
        `${done ? "=== Partie terminée ===" : "=== Temps écoulé ==="} ${gameSeconds}s de jeu en ${realSeconds.toFixed(0)}s réels (x${(gameSeconds / realSeconds).toFixed(1)})`,
    )
} finally {
    await sim.close()
}
