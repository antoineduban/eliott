// ============================================
// BOSS : Polyphème le Cyclope, la Reine des Harpies, Circé la magicienne,
//        la Reine des Sirènes, Atlas le Titan, Poséidon
// ============================================

// biome-ignore lint/correctness/noUnusedVariables: utilisé par main.ts
namespace Bosses {
    export const Kind = SpriteKind.create()
    export const ShotKind = SpriteKind.create()

    export const CYCLOPS = 0
    export const HARPY_QUEEN = 1
    export const CIRCE = 2
    export const SIREN_QUEEN = 3
    export const ATLAS = 4
    export const POSEIDON = 5

    export let active = false
    export let hp = 0
    export let maxHp = 0
    export let name = ""

    let boss: Sprite = null
    let type = 0
    let t = 0
    let arenaW = 0
    let floorY = 0
    let nextShotAt = 0
    let nextSpecialAt = 0
    let specialUntil = 0
    let hitFlashUntil = 0
    let dir = -1
    let wasInAir = false
    let chargeAt = 0
    let speech = ""
    let speechUntil = 0

    // Petite bulle au-dessus du boss (dessinée dans drawHud)
    function say(text: string, ms: number) {
        speech = text
        speechUntil = game.runtime() + ms
    }

    export function start(which: number, arenaWidth: number, floor: number) {
        clear()
        type = which
        arenaW = arenaWidth
        floorY = floor
        t = 0
        active = true
        dir = -1
        wasInAir = false
        const now = game.runtime()
        nextShotAt = now + 2000
        nextSpecialAt = now + 4000
        specialUntil = 0
        hitFlashUntil = 0

        if (type === CYCLOPS) {
            name = "Polyphème le Cyclope"
            maxHp = 7
            nextSpecialAt = now + 5000
            boss = sprites.create(Assets.cyclopsL, Kind)
            boss.x = arenaW - 40
            boss.bottom = floorY
            boss.ay = 350
            boss.vx = -18
        } else if (type === HARPY_QUEEN) {
            name = "Reine des Harpies"
            maxHp = 8
            boss = sprites.create(Assets.harpyQueenL, Kind)
            boss.setPosition(arenaW - 40, 56)
            boss.vx = -35
            boss.setFlag(SpriteFlag.GhostThroughWalls, true)
        } else if (type === CIRCE) {
            name = "Circé la Magicienne"
            maxHp = 9
            boss = sprites.create(Assets.circeL, Kind)
            boss.setPosition(arenaW - 50, 70)
            boss.setFlag(SpriteFlag.GhostThroughWalls, true)
        } else if (type === SIREN_QUEEN) {
            name = "Reine des Sirènes"
            maxHp = 9
            nextSpecialAt = now + 3000
            boss = sprites.create(Assets.sirenQueenL, Kind)
            boss.setPosition(arenaW - 40, 58)
            boss.vx = -30
            boss.setFlag(SpriteFlag.GhostThroughWalls, true)
        } else if (type === ATLAS) {
            name = "Atlas le Titan"
            maxHp = 10
            nextSpecialAt = now + 3000
            boss = sprites.create(Assets.atlas, Kind)
            boss.x = arenaW - 40
            boss.bottom = floorY
            boss.ay = 350
            boss.vx = -14
        } else {
            name = "Poséidon"
            maxHp = 11
            nextSpecialAt = now + 3000
            boss = sprites.create(Assets.poseidonL, Kind)
            boss.setPosition(arenaW - 44, floorY - 40)
            boss.setFlag(SpriteFlag.GhostThroughWalls, true)
        }
        hp = maxHp
        boss.z = 6
    }

    export function clear() {
        active = false
        if (boss) {
            boss.destroy()
            boss = null
        }
        sprites.destroyAllSpritesOfKind(Kind)
        sprites.destroyAllSpritesOfKind(ShotKind)
    }

    export function sprite(): Sprite {
        return boss
    }

    function shot(
        im: Image,
        x: number,
        y: number,
        vx: number,
        vy: number,
    ): Sprite {
        const s = sprites.create(im, ShotKind)
        s.setPosition(x, y)
        s.vx = vx
        s.vy = vy
        s.z = 7
        s.setFlag(SpriteFlag.AutoDestroy, true)
        return s
    }

    // Projectile lancé en cloche vers Ulysse (rocher, éclair)
    function lob(im: Image, fromY: number, player: Sprite, height: number) {
        const dx = player.x - boss.x
        const s = shot(im, boss.x, fromY, dx / 1.3, -height)
        s.ay = 300
        s.setFlag(SpriteFlag.DestroyOnWall, true)
        return s
    }

    // Va-et-vient au sol entre minX et maxX, image selon la direction
    function patrol(minX: number, maxX: number, speed: number) {
        if (boss.x < minX) boss.vx = speed
        else if (boss.x > maxX) boss.vx = -speed
        dir = boss.vx < 0 ? -1 : 1
    }

    export function update(dt: number) {
        if (!active || !boss) return
        t += dt
        const now = game.runtime()
        const player = Player.sprite

        if (type === CYCLOPS) {
            if (now < specialUntil) {
                if (now < chargeAt) {
                    // Il s'arrête, gronde... puis fonce tête baissée !
                    boss.vx = 0
                } else {
                    if (boss.vx === 0 && player)
                        boss.vx = player.x < boss.x ? -70 : 70
                    dir = boss.vx < 0 ? -1 : 1
                    if (boss.x < 26 || boss.x > arenaW - 26) specialUntil = 0
                }
            } else {
                patrol(arenaW / 2, arenaW - 28, 18)
                if (now >= nextSpecialAt && player) {
                    nextSpecialAt = now + 8000
                    chargeAt = now + 900
                    specialUntil = now + 3500
                    dir = player.x < boss.x ? -1 : 1
                    say("GRRR !", 900)
                    music.knock.play()
                }
            }
            const im = dir < 0 ? Assets.cyclopsL : Assets.cyclopsR
            if (boss.image !== im) boss.setImage(im)

            // Lance un rocher en cloche
            if (now >= nextShotAt && player && now >= specialUntil) {
                nextShotAt = now + 2600
                lob(Assets.rock, boss.y - 12, player, 150)
                music.pewPew.play()
            }
        } else if (type === HARPY_QUEEN) {
            // Va-et-vient en volant, reste dans l'arène
            if (boss.x < 30) boss.vx = 35
            else if (boss.x > arenaW - 30) boss.vx = -35
            dir = boss.vx < 0 ? -1 : 1
            const im = dir < 0 ? Assets.harpyQueenL : Assets.harpyQueenR
            if (boss.image !== im) boss.setImage(im)

            // Plongeon vers le sol de temps en temps (on peut la toucher facilement)
            let targetY = 56 + Math.sin(t * 2) * 6
            if (now < specialUntil) targetY = floorY - 14
            else if (now >= nextSpecialAt) {
                nextSpecialAt = now + 6000
                specialUntil = now + 1800
                say("Kriii !", 800)
            }
            boss.y += (targetY - boss.y) * Math.min(1, dt * 4)

            // Lâche une plume pointue
            if (now >= nextShotAt) {
                nextShotAt = now + 1700
                const p = shot(Assets.feather, boss.x, boss.y + 8, 0, 20)
                p.ay = 220
                p.setFlag(SpriteFlag.DestroyOnWall, true)
            }
        } else if (type === CIRCE) {
            // Flotte en ondulant
            boss.y += Math.sin(t * 3) * 0.4
            // Se téléporte ailleurs
            if (now >= nextSpecialAt) {
                nextSpecialAt = now + 3400
                boss.startEffect(effects.disintegrate, 300)
                let nx = randint(40, arenaW - 40)
                if (player && Math.abs(nx - player.x) < 40) {
                    nx = player.x < arenaW / 2 ? arenaW - 45 : 45
                }
                boss.setPosition(nx, randint(60, floorY - 18))
            }
            // Lance un sortilège vers Ulysse
            if (now >= nextShotAt && player) {
                nextShotAt = now + 2300
                const dx = player.x - boss.x
                const dy = player.y - boss.y
                const len = Math.max(1, Math.sqrt(dx * dx + dy * dy))
                const sp = 50
                const b = shot(
                    Assets.magicBolt,
                    boss.x,
                    boss.y,
                    (dx / len) * sp,
                    (dy / len) * sp,
                )
                b.setFlag(SpriteFlag.GhostThroughWalls, true)
                b.lifespan = 3500
                music.sonar.play()
            }
            const im =
                player && player.x > boss.x ? Assets.circeR : Assets.circeL
            if (boss.image !== im) boss.setImage(im)
        } else if (type === SIREN_QUEEN) {
            // Nage dans les airs en ondulant
            if (boss.x < 30) boss.vx = 30
            else if (boss.x > arenaW - 30) boss.vx = -30
            dir = boss.vx < 0 ? -1 : 1
            const im = dir < 0 ? Assets.sirenQueenL : Assets.sirenQueenR
            if (boss.image !== im) boss.setImage(im)

            let targetY = 58 + Math.sin(t * 2.5) * 8
            if (now < specialUntil) targetY = floorY - 16
            else if (now >= nextSpecialAt) {
                nextSpecialAt = now + 6500
                specialUntil = now + 1800
                say("La la laaa !", 900)
            }
            boss.y += (targetY - boss.y) * Math.min(1, dt * 4)

            // Chante une note qui vole vers Ulysse
            if (now >= nextShotAt && player) {
                nextShotAt = now + 2200
                const dx = player.x - boss.x
                const dy = player.y - boss.y
                const len = Math.max(1, Math.sqrt(dx * dx + dy * dy))
                const sp = 55
                const n = shot(
                    Assets.musicNote,
                    boss.x,
                    boss.y,
                    (dx / len) * sp,
                    (dy / len) * sp,
                )
                n.setFlag(SpriteFlag.GhostThroughWalls, true)
                n.lifespan = 3500
                music.sonar.play()
            }
        } else if (type === ATLAS) {
            const onFloor = boss.isHittingTile(CollisionDirection.Bottom)
            patrol(arenaW / 2, arenaW - 28, 14)

            // Fait rouler un rocher tout droit vers Ulysse
            if (now >= nextShotAt && player) {
                nextShotAt = now + 2100
                const toward = player.x < boss.x ? -1 : 1
                const s = shot(
                    Assets.rock,
                    boss.x + toward * 16,
                    boss.y + 2,
                    toward * 80,
                    0,
                )
                s.setFlag(SpriteFlag.DestroyOnWall, true)
                music.pewPew.play()
            }
            // Gros saut : en retombant, la montagne tremble et des rochers roulent
            if (now >= nextSpecialAt && onFloor) {
                nextSpecialAt = now + 5000
                boss.vy = -170
                wasInAir = true
            } else if (wasInAir && onFloor) {
                wasInAir = false
                scene.cameraShake(4, 300)
                music.smallCrash.play()
                for (const d of [-1, 1]) {
                    const s = shot(
                        Assets.rock,
                        boss.x + d * 18,
                        floorY - 4,
                        d * 60,
                        0,
                    )
                    s.setFlag(SpriteFlag.DestroyOnWall, true)
                    s.lifespan = 3000
                }
            }
        } else {
            // Poséidon flotte au-dessus des vagues et suit Ulysse
            if (player) {
                const minX = arenaW * 0.45
                let target = Math.max(minX, Math.min(arenaW - 24, player.x))
                if (Math.abs(target - boss.x) < 6) target = boss.x
                boss.vx = target > boss.x ? 12 : target < boss.x ? -12 : 0
                const im =
                    player.x > boss.x ? Assets.poseidonR : Assets.poseidonL
                if (boss.image !== im) boss.setImage(im)
            }
            boss.y = floorY - 40 + Math.sin(t * 2) * 4

            // Deux éclairs en cloche : un vers Ulysse, un plus haut
            if (now >= nextShotAt && player) {
                nextShotAt = now + 2600
                lob(Assets.lightning, boss.y - 6, player, 130)
                lob(Assets.lightning, boss.y - 6, player, 190)
                music.pewPew.play()
            }
            // Appelle un serpent de mer
            if (now >= nextSpecialAt) {
                nextSpecialAt = now + 8000
                if (Enemies.count() < 2) {
                    say("ULYSSE !", 800)
                    scene.cameraShake(3, 300)
                    Enemies.spawnWalker(boss.x - 26, floorY, Assets.THEME_STORM)
                }
            }
        }

        // Flash quand il est touché
        if (now < hitFlashUntil) {
            boss.setFlag(SpriteFlag.Invisible, Math.idiv(now, 60) % 2 === 0)
        } else {
            boss.setFlag(SpriteFlag.Invisible, false)
        }
    }

    // Une flèche touche le boss
    export function hit() {
        if (!active || !boss) return
        hp -= 1
        hitFlashUntil = game.runtime() + 300
        music.zapped.play()
        console.log(`BOSS ${name} hp=${hp}`)
        if (hp <= 0) {
            active = false
            boss.setFlag(SpriteFlag.Invisible, false)
            boss.destroy(effects.disintegrate, 900)
            boss = null
            sprites.destroyAllSpritesOfKind(ShotKind)
            music.powerUp.play()
            info.changeScoreBy(20)
            Game.onBossDefeated()
        } else {
            say("Aïe !", 500)
        }
    }

    // Barre de vie du boss (dessinée par-dessus le jeu)
    export function drawHud() {
        if (!active) return
        if (boss && game.runtime() < speechUntil) {
            const cam = game.currentScene().camera
            const w = speech.length * 6 + 6
            const x = Math.min(
                screen.width - w - 1,
                Math.max(1, boss.x - cam.drawOffsetX - (w >> 1)),
            )
            const y = boss.top - cam.drawOffsetY - 13
            screen.fillRect(x, y, w, 11, 1)
            screen.drawRect(x, y, w, 11, 15)
            screen.print(speech, x + 3, y + 2, 15, image.font8)
        }
        const barW = 60
        const x = (screen.width - barW) / 2
        screen.fillRect(x - 1, 2, barW + 2, 7, 15)
        screen.fillRect(x, 3, Math.idiv(barW * hp, maxHp), 5, 2)
        // fond sombre derrière le nom (sinon illisible sur le ciel clair)
        const nameW = name.length * 6 + 4
        screen.fillRect((screen.width - nameW) / 2, 10, nameW, 10, 15)
        screen.printCenter(name, 11, 1, image.font8)
    }
}
