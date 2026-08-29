// Lance le "mode démo" du jeu (le jeu se joue tout seul) dans le simulateur
// et suit sa progression via la console du jeu.
//
// Usage : node tools/play.mjs [durée max de jeu en secondes] [intervalle captures en s]
//
// Le temps du jeu est accéléré (SIM_SPEED, défaut 4). Le mode démo se déclenche
// sur l'écran titre en maintenant BAS et en appuyant sur A. Le script s'arrête
// sur VICTOIRE ou à la fin du temps imparti.

import { openSim } from "./sim.mjs"

const maxSeconds = Number(process.argv[2] || 600)
const shotEvery = Number(process.argv[3] || 30)
const speed = Number(process.env.SIM_SPEED || 4)

const sim = await openSim({ speed })
try {
    await sim.wait(2000)
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
            const name = `demo-${String(shotIndex).padStart(2, "0")}-${gameSeconds}s`
            await sim.shot(name)
            console.log(`[shot ${name}]`)
        }
        if (/VICTOIRE|GAME OVER/.test(allLog)) done = true
    }
    await sim.shot("demo-final")
    const realSeconds = (Date.now() - realStart) / 1000
    console.log(
        `${done ? "=== Partie terminée ===" : "=== Temps écoulé ==="} ${gameSeconds}s de jeu en ${realSeconds.toFixed(0)}s réels (x${(gameSeconds / realSeconds).toFixed(1)})`,
    )
} finally {
    await sim.close()
}
