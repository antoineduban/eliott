// ============================================
// BOSS : la Sorcière Cracra, le Dragon Ronchon, le Roi des Ombres
// ============================================

// biome-ignore lint/correctness/noUnusedVariables: utilisé par main.ts
namespace Bosses {
    export const Kind = SpriteKind.create()
    export const ShotKind = SpriteKind.create()

    export const WITCH = 0
    export const DRAGON = 1
    export const SHADOW_KING = 2

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

    export function start(which: number, arenaWidth: number, floor: number) {
        clear()
        type = which
        arenaW = arenaWidth
        floorY = floor
        t = 0
        active = true
        dir = -1
        const now = game.runtime()
        nextShotAt = now + 2000
        nextSpecialAt = now + 4000
        specialUntil = 0
        hitFlashUntil = 0

        if (type === WITCH) {
            name = "Sorcière Cracra"
            maxHp = 6
            boss = sprites.create(Assets.witchL, Kind)
            boss.setPosition(arenaW - 40, 58)
            boss.vx = -35
            boss.setFlag(SpriteFlag.GhostThroughWalls, true)
        } else if (type === DRAGON) {
            name = "Dragon Ronchon"
            maxHp = 8
            boss = sprites.create(Assets.dragonL, Kind)
            boss.x = arenaW - 40
            boss.bottom = floorY
            boss.ay = 350
            boss.vx = -15
        } else {
            name = "Roi des Ombres"
            maxHp = 8
            boss = sprites.create(Assets.shadowKing, Kind)
            boss.setPosition(arenaW - 50, 70)
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
                nextShotAt = now + 1800
                const p = shot(Assets.potion, boss.x, boss.y + 8, 0, 20)
                p.ay = 220
                p.setFlag(SpriteFlag.DestroyOnWall, true)
            }
        } else if (type === DRAGON) {
            // Marche lentement dans la moitié droite de l'arène
            const minX = arenaW / 2 + 10
            const maxX = arenaW - 24
            if (boss.x < minX) boss.vx = 15
            else if (boss.x > maxX) boss.vx = -15
            dir = boss.vx < 0 ? -1 : 1
            const im = dir < 0 ? Assets.dragonL : Assets.dragonR
            if (boss.image !== im) boss.setImage(im)

            // Crache une boule de feu vers Lila
            if (now >= nextShotAt && player) {
                nextShotAt = now + 2300
                const toward = player.x < boss.x ? -1 : 1
                const f = shot(
                    Assets.fireball[0],
                    boss.x + toward * 14,
                    boss.y - 5,
                    toward * 75,
                    0,
                )
                if (toward > 0) {
                    const im0 = Assets.fireball[0].clone()
                    im0.flipX()
                    f.setImage(im0)
                }
                f.setFlag(SpriteFlag.DestroyOnWall, true)
                f.setFlag(SpriteFlag.GhostThroughWalls, false)
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
        } else {
            // Flotte en ondulant
            boss.y += Math.sin(t * 3) * 0.4
            // Se téléporte ailleurs
            if (now >= nextSpecialAt) {
                nextSpecialAt = now + 3600
                boss.startEffect(effects.disintegrate, 300)
                let nx = randint(40, arenaW - 40)
                if (player && Math.abs(nx - player.x) < 40) {
                    nx = player.x < arenaW / 2 ? arenaW - 45 : 45
                }
                boss.setPosition(nx, randint(60, floorY - 18))
            }
            // Lance une boule d'ombre vers Lila
            if (now >= nextShotAt && player) {
                nextShotAt = now + 2600
                const dx = player.x - boss.x
                const dy = player.y - boss.y
                const len = Math.max(1, Math.sqrt(dx * dx + dy * dy))
                const sp = 45
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
            boss.sayText("Aïe !", 500)
        }
    }

    // Barre de vie du boss (dessinée par-dessus le jeu)
    export function drawHud() {
        if (!active) return
        const barW = 60
        const x = (screen.width - barW) / 2
        screen.fillRect(x - 1, 2, barW + 2, 7, 15)
        screen.fillRect(x, 3, Math.idiv(barW * hp, maxHp), 5, 2)
        screen.printCenter(name, 11, 1, image.font8)
    }
}
