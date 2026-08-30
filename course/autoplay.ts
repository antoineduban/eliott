// ============================================
// MODE DÉMO : la voiture se conduit toute seule (sert aux tests automatiques)
// Sur l'écran titre : maintenir BAS et appuyer sur A.
// ============================================

// biome-ignore lint/correctness/noUnusedVariables: utilisé par race.ts
namespace Autoplay {
    export let active = false

    let nextDialogPressAt = 0
    let dialogPressed = false

    export function start() {
        if (active) return
        active = true
        console.log("AUTOPLAY ON")
        control.runInBackground(() => {
            while (active) {
                pause(33)
                update()
            }
        })
    }

    function setMove(dir: number) {
        controller.left.setPressed(dir < 0)
        controller.right.setPressed(dir > 0)
    }

    function update() {
        const now = control.millis()
        const st = Race.state
        const car = Race.car

        if (st === Race.State.Ending) {
            setMove(0)
            controller.A.setPressed(false)
            return
        }
        if (st !== Race.State.Racing || !car) {
            // dialogues : appuyer sur A régulièrement
            setMove(0)
            if (now >= nextDialogPressAt) {
                dialogPressed = !dialogPressed
                controller.A.setPressed(dialogPressed)
                nextDialogPressAt = now + (dialogPressed ? 120 : 400)
            }
            return
        }
        if (dialogPressed) {
            dialogPressed = false
            controller.A.setPressed(false)
        }

        // Choisir la position la plus sûre parmi quelques positions de la route
        const speed = Math.max(20, Race.speed)
        let best = car.x
        let bestDanger = 1e9
        for (let cx = 38; cx <= 122; cx += 14) {
            let danger = Math.abs(cx - car.x) * 0.3
            for (const o of sprites.allOfKind(Race.ObstacleKind)) {
                const dy = car.y - o.y // > 0 : l'obstacle est devant nous
                if (dy < -16 || dy > 96) continue
                // où sera l'obstacle quand on arrivera à sa hauteur ?
                const ox = o.x + (o.vx * dy) / speed
                const reach = (o.width + car.width) / 2 + 5
                const dx = Math.abs(ox - cx)
                if (dx < reach) danger += (110 - dy) * 10 + (reach - dx)
            }
            for (const s of sprites.allOfKind(Race.ItemKind)) {
                const dy = car.y - s.y
                if (dy > 0 && dy < 80 && Math.abs(s.x - cx) < 6) danger -= 15
            }
            if (danger < bestDanger) {
                bestDanger = danger
                best = cx
            }
        }
        const dx = best - car.x
        setMove(dx > 3 ? 1 : dx < -3 ? -1 : 0)
        // turbo quand la voie est libre
        controller.A.setPressed(bestDanger < 40)
    }
}
