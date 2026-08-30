// ============================================
// BOSS : la Sorcière Cracra, le Dragon Ronchon, le Roi des Ombres,
//        le Crabe Pirate, le Yéti Frileux, Magma le Golem
// ============================================

// biome-ignore lint/correctness/noUnusedVariables: utilisé par main.ts
namespace Bosses {
    export const Kind = SpriteKind.create()
    export const ShotKind = SpriteKind.create()

    export const WITCH = 0
    export const DRAGON = 1
    export const SHADOW_KING = 2
    export const PIRATE_CRAB = 3
    export const YETI = 4
    export const GOLEM = 5

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

        if (type === WITCH) {
            name = "Sorcière Cracra"
            maxHp = 7
            boss = sprites.create(Assets.witchL, Kind)
            boss.setPosition(arenaW - 40, 58)
            boss.vx = -35
            boss.setFlag(SpriteFlag.GhostThroughWalls, true)
        } else if (type === DRAGON) {
            name = "Dragon Ronchon"
            maxHp = 9
            boss = sprites.create(Assets.dragonL, Kind)
            boss.x = arenaW - 40
            boss.bottom = floorY
            boss.ay = 350
            boss.vx = -15
        } else if (type === SHADOW_KING) {
            name = "Roi des Ombres"
            maxHp = 9
            boss = sprites.create(Assets.shadowKing, Kind)
            boss.setPosition(arenaW - 50, 70)
            boss.setFlag(SpriteFlag.GhostThroughWalls, true)
        } else if (type === PIRATE_CRAB) {
            name = "Crabe Pirate"
            maxHp = 9
            nextSpecialAt = now + 2500
            boss = sprites.create(Assets.pirateCrabL, Kind)
            boss.x = arenaW - 40
            boss.bottom = floorY
            boss.ay = 350
            boss.vx = -20
        } else if (type === YETI) {
            name = "Yéti Frileux"
            maxHp = 10
            nextSpecialAt = now + 3000
            boss = sprites.create(Assets.yeti, Kind)
            boss.x = arenaW - 40
            boss.bottom = floorY
            boss.ay = 350
            boss.vx = -14
        } else {
            name = "Magma le Golem"
            maxHp = 11
            nextSpecialAt = now + 3000
            boss = sprites.create(Assets.golem, Kind)
            boss.x = arenaW - 44
            boss.bottom = floorY
            boss.ay = 350
            boss.vx = -10
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

    // Projectile lancé en cloche vers Lila (noix de coco, rocher)
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

        if (type === WITCH) {
            // Va-et-vient en volant, reste dans l'arène
            if (boss.x < 30) boss.vx = 35
            else if (boss.x > arenaW - 30) boss.vx = -35
            dir = boss.vx < 0 ? -1 : 1
            const im = dir < 0 ? Assets.witchL : Assets.witchR
            if (boss.image !== im) boss.setImage(im)

            // Plongeon vers le sol de temps en temps (on peut la toucher facilement)
            let targetY = 58 + Math.sin(t * 2) * 6
            if (now < specialUntil) targetY = floorY - 14
            else if (now >= nextSpecialAt) {
                nextSpecialAt = now + 6000
                specialUntil = now + 1800
            }
            boss.y += (targetY - boss.y) * Math.min(1, dt * 4)

            // Lâche une potion
            if (now >= nextShotAt) {
                nextShotAt = now + 1600
                const p = shot(Assets.potion, boss.x, boss.y + 8, 0, 20)
                p.ay = 220
                p.setFlag(SpriteFlag.DestroyOnWall, true)
            }
        } else if (type === DRAGON) {
            // Marche lentement dans la moitié droite de l'arène
            patrol(arenaW / 2 + 10, arenaW - 24, 15)
            const im = dir < 0 ? Assets.dragonL : Assets.dragonR
            if (boss.image !== im) boss.setImage(im)

            // Crache une boule de feu vers Lila
            if (now >= nextShotAt && player) {
                nextShotAt = now + 2100
                const toward = player.x < boss.x ? -1 : 1
                const f = shot(
                    Assets.fireball[0],
                    boss.x + toward * 14,
                    boss.y - 5,
                    toward * 82,
                    0,
                )
                if (toward > 0) {
                    const im0 = Assets.fireball[0].clone()
                    im0.flipX()
                    f.setImage(im0)
                }
                f.setFlag(SpriteFlag.DestroyOnWall, true)
                music.pewPew.play()
            }
            // Petit saut de temps en temps
            if (
                now >= nextSpecialAt &&
                boss.isHittingTile(CollisionDirection.Bottom)
            ) {
                nextSpecialAt = now + 4500
                boss.vy = -140
            }
        } else if (type === SHADOW_KING) {
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
            // Lance une boule d'ombre vers Lila
            if (now >= nextShotAt && player) {
                nextShotAt = now + 2300
                const dx = player.x - boss.x
                const dy = player.y - boss.y
                const len = Math.max(1, Math.sqrt(dx * dx + dy * dy))
                const sp = 50
                const b = shot(
                    Assets.shadowBall,
                    boss.x,
                    boss.y,
                    (dx / len) * sp,
                    (dy / len) * sp,
                )
                b.setFlag(SpriteFlag.GhostThroughWalls, true)
                b.lifespan = 3500
                music.sonar.play()
            }
        } else if (type === PIRATE_CRAB) {
            if (now < specialUntil) {
                if (now < chargeAt) {
                    // Il s'arrête et prévient... puis fonce !
                    boss.vx = 0
                } else {
                    // Fonce sur Lila d'un bord à l'autre : il faut sauter par-dessus
                    if (boss.vx === 0 && player)
                        boss.vx = player.x < boss.x ? -75 : 75
                    dir = boss.vx < 0 ? -1 : 1
                    if (boss.x < 24 || boss.x > arenaW - 24) specialUntil = 0
                }
            } else {
                patrol(arenaW / 2, arenaW - 26, 22)
                if (now >= nextSpecialAt && player) {
                    nextSpecialAt = now + 6500
                    chargeAt = now + 900
                    specialUntil = now + 3500
                    dir = player.x < boss.x ? -1 : 1
                    say("Yo ho ho !", 900)
                    music.knock.play()
                }
            }
            const im = dir < 0 ? Assets.pirateCrabL : Assets.pirateCrabR
            if (boss.image !== im) boss.setImage(im)

            // Lance une noix de coco en cloche
            if (now >= nextShotAt && player && now >= specialUntil) {
                nextShotAt = now + 2200
                lob(Assets.coconut, boss.y - 10, player, 150)
                music.pewPew.play()
            }
        } else if (type === YETI) {
            const onFloor = boss.isHittingTile(CollisionDirection.Bottom)
            patrol(arenaW / 2, arenaW - 26, 14)

            // Boule de neige tout droit vers Lila
            if (now >= nextShotAt && player) {
                nextShotAt = now + 2000
                const toward = player.x < boss.x ? -1 : 1
                const s = shot(
                    Assets.snowball,
                    boss.x + toward * 14,
                    boss.y - 6,
                    toward * 85,
                    0,
                )
                s.setFlag(SpriteFlag.DestroyOnWall, true)
                music.pewPew.play()
            }
            // Gros saut : en retombant, des éclats de glace glissent sur le sol
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
                        Assets.iceShard,
                        boss.x + d * 16,
                        floorY - 3,
                        d * 60,
                        0,
                    )
                    s.setFlag(SpriteFlag.DestroyOnWall, true)
                    s.lifespan = 3000
                }
            }
        } else {
            // Le golem avance lentement vers Lila dans la moitié droite
            if (player) {
                const minX = arenaW * 0.45
                let target = Math.max(minX, Math.min(arenaW - 20, player.x))
                if (Math.abs(target - boss.x) < 6) target = boss.x
                boss.vx = target > boss.x ? 10 : target < boss.x ? -10 : 0
            }
            // Deux rochers en cloche : un vers Lila, un plus haut
            if (now >= nextShotAt && player) {
                nextShotAt = now + 2600
                lob(Assets.lavaRock, boss.y - 12, player, 130)
                lob(Assets.lavaRock, boss.y - 12, player, 190)
                music.pewPew.play()
            }
            // Appelle une boule de lave
            if (now >= nextSpecialAt) {
                nextSpecialAt = now + 8000
                if (Enemies.count() < 2) {
                    say("GRRR !", 800)
                    scene.cameraShake(3, 300)
                    Enemies.spawnWalker(
                        boss.x - 24,
                        floorY,
                        Assets.THEME_VOLCANO,
                    )
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

    // Une étincelle magique touche le boss
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
        screen.printCenter(name, 11, 1, image.font8)
    }
}
