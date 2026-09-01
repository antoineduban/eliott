// ============================================
// MODE DÉMO : le jeu se joue tout seul (sert aussi de test automatique)
// Sur l'écran titre : maintenir BAS et appuyer sur A.
// ============================================

// biome-ignore lint/correctness/noUnusedVariables: utilisé par main.ts
namespace Autoplay {
    export let active = false

    let nextDialogPressAt = 0
    let dialogPressed = false
    let holdAUntil = 0
    let nextJumpAt = 0

    // Le robot tourne dans une fibre à part : il continue même pendant les
    // dialogues (qui mettent en pause la boucle du jeu).
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

    function setA(on: boolean) {
        controller.A.setPressed(on)
    }

    function setMove(dir: number) {
        controller.left.setPressed(dir < 0)
        controller.right.setPressed(dir > 0)
    }

    // Y a-t-il du sol quelque part sous ce point ?
    function groundBelow(x: number, y: number): boolean {
        for (let yy = y; yy < Levels.heightPx; yy += Levels.TILE) {
            if (Levels.isWall(x, yy)) return true
        }
        return false
    }

    export function update() {
        if (!active) return
        const now = control.millis()
        const st = Game.state
        const s = Player.sprite

        // Écran de fin : on ne touche plus à rien (A relancerait le jeu)
        if (st === Game.State.Ending) {
            setMove(0)
            setA(false)
            return
        }

        // Dialogues et transitions : appuyer sur A régulièrement
        if (st === Game.State.Transition || st === Game.State.Title || !s) {
            setMove(0)
            if (now >= nextDialogPressAt) {
                dialogPressed = !dialogPressed
                setA(dialogPressed)
                nextDialogPressAt = now + (dialogPressed ? 120 : 400)
            }
            return
        }
        if (dialogPressed) {
            dialogPressed = false
            setA(false)
        }

        const onGround = s.isHittingTile(CollisionDirection.Bottom)

        if (st === Game.State.Playing) {
            // Si le navire est derrière nous (on l'a survolé), on revient
            const portals = sprites.allOfKind(Game.PortalKind)
            if (portals.length > 0 && portals[0].x < s.x - 4) {
                setMove(-1)
                setA(false)
                return
            }
            setMove(1)
            const aheadX = s.right + 10
            const gapAhead =
                !Levels.isWall(aheadX, s.bottom + 6) &&
                !Levels.isWall(aheadX + 16, s.bottom + 6)
            const spikesAhead =
                Levels.tileIndexAt(aheadX, s.bottom - 2) === Levels.SPIKES ||
                Levels.tileIndexAt(aheadX + 8, s.bottom - 2) === Levels.SPIKES
            const wallAhead =
                Levels.isWall(s.right + 3, s.y) ||
                s.isHittingTile(CollisionDirection.Right)
            if (Player.form === Player.FORM_EAGLE) {
                // En aigle : A maintenu fait voler. On vole seulement
                // au-dessus des dangers, sans monter trop haut.
                const overDanger =
                    !onGround && !groundBelow(s.x + 6, s.bottom + 2)
                setA(
                    (gapAhead || spikesAhead || wallAhead || overDanger) &&
                        s.y > 40,
                )
                holdAUntil = 0
            } else {
                if (
                    onGround &&
                    (gapAhead || spikesAhead || wallAhead) &&
                    now >= nextJumpAt
                ) {
                    nextJumpAt = now + 400
                    holdAUntil = now + 900
                    setA(true)
                }
                if (now >= holdAUntil) setA(false)
            }
            // une flèche si un ennemi est devant
            for (const e of sprites.allOfKind(Enemies.Kind)) {
                if (
                    e.x > s.x - 4 &&
                    e.x - s.x < 70 &&
                    Math.abs(e.y - s.y) < 24
                ) {
                    Player.magicPressed()
                    break
                }
            }
        } else if (st === Game.State.Boss) {
            const b = Bosses.sprite()
            if (!b) {
                setMove(0)
                setA(false)
                return
            }
            const dx = b.x - s.x
            const dist = Math.abs(dx)
            const toward = dx > 0 ? 1 : -1
            // garder une distance moyenne, face au boss
            let move = 0
            if (dist > 75) move = toward
            else if (dist < 45) move = -toward
            if (s.x < 20 && move < 0) move = 0
            if (s.x > Levels.widthPx - 20 && move > 0) move = 0
            setMove(move)
            Player.facing = toward
            Player.magicPressed()

            // sauter si un projectile approche, si le boss est en hauteur, ou de temps en temps
            let danger = false
            for (const p of sprites.allOfKind(Bosses.ShotKind)) {
                if (Math.abs(p.x - s.x) < 34 && Math.abs(p.y - s.y) < 30)
                    danger = true
            }
            const bossHigh = b.y < s.y - 14 && dist < 70
            // le boss fonce sur nous (cyclope) ou avance (Poséidon) : sauter par-dessus
            const bossClose = dist < 42 && Math.abs(b.y - s.y) < 28
            if (
                onGround &&
                (danger || bossHigh || bossClose || now >= nextJumpAt)
            ) {
                nextJumpAt = now + 1800
                holdAUntil = now + (bossHigh ? 250 : 650)
                setA(true)
            }
            if (now >= holdAUntil) setA(false)
        }
    }
}
