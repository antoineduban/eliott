// ============================================
// GAME 2: SPACE SHOOTER
// Shoot asteroids and aliens!
// ============================================

// biome-ignore lint/correctness/noUnusedVariables: used in main.ts
namespace SpaceShooter {
    // Sprite kinds
    export const ShipKind = SpriteKind.create()
    export const LaserKind = SpriteKind.create()
    export const AsteroidKind = SpriteKind.create()
    export const AlienKind = SpriteKind.create()
    export const CucumberKind = SpriteKind.create()
    export const BossKind = SpriteKind.create()
    export const BombKind = SpriteKind.create()

    // Player ship
    let ship: Sprite

    // Boss state
    let boss: Sprite | null = null
    let bossHealth = 0
    export let bossActive = false
    let bossLevel = 0 // Which boss we're on (0 = none yet, 1 = first, 2 = second, etc.)
    let nextBossScore = 20 // Score needed for next boss
    let bossMessageUntil = 0

    // Boss colors for each level (body color, cockpit color)
    const bossColors: number[][] = [
        [12, 2], // Purple body, red cockpit (boss 1)
        [8, 5], // Blue body, yellow cockpit (boss 2)
        [7, 4], // Green body, orange cockpit (boss 3)
        [2, 5], // Red body, yellow cockpit (boss 4)
        [10, 9], // Purple body, light blue cockpit (boss 5+)
    ]

    // Sprite images
    const shipImg = img`
        . . . . . . . 2 2 . . . . . . .
        . . . . . . 2 3 3 2 . . . . . .
        . . . . . . 2 3 3 2 . . . . . .
        . . . . . 2 2 3 3 2 2 . . . . .
        . . . . . 2 1 1 1 1 2 . . . . .
        . . . . 2 2 1 1 1 1 2 2 . . . .
        . . . . 2 1 1 1 1 1 1 2 . . . .
        . . . 2 2 1 1 1 1 1 1 2 2 . . .
        . . . 2 1 1 1 1 1 1 1 1 2 . . .
        . . 2 2 1 1 1 1 1 1 1 1 2 2 . .
        . . 2 1 1 1 1 1 1 1 1 1 1 2 . .
        . 2 2 2 2 1 1 1 1 1 1 2 2 2 2 .
        . 2 4 4 2 2 2 2 2 2 2 2 4 4 2 .
        2 2 4 4 4 2 . . . . 2 4 4 4 2 2
        2 4 4 4 2 . . . . . . 2 4 4 4 2
        . 2 2 2 . . . . . . . . 2 2 2 .
    `

    const laserImg = img`
        4
        4
        5
        5
        4
        4
    `

    const asteroidImg = img`
        . . . . c c c c c . . . .
        . . . c c b b b c c . . .
        . . c c b b b b b c c . .
        . c c b b c b b b b c c .
        c c b b b b b b c b b c c
        c b b c b b b b b b b b c
        c b b b b b c b b b b b c
        c b b b b b b b b c b b c
        c b b b c b b b b b b b c
        c c b b b b b b b b b c c
        . c c b b b b c b b c c .
        . . c c b b b b b c c . .
        . . . c c c c c c c . . .
    `

    const alienImg = img`
        . . . . . 7 7 7 7 7 . . . . .
        . . . 7 7 7 7 7 7 7 7 7 . . .
        . . 7 7 7 7 7 7 7 7 7 7 7 . .
        . 7 7 7 f f 7 7 7 f f 7 7 7 .
        . 7 7 7 f f 7 7 7 f f 7 7 7 .
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
        7 7 7 7 2 7 7 7 7 7 2 7 7 7 7
        7 7 7 7 7 2 2 2 2 2 7 7 7 7 7
        . 7 7 7 7 7 7 7 7 7 7 7 7 7 .
        . . 7 7 7 7 7 7 7 7 7 7 7 . .
        . . . 7 7 . . . . . 7 7 . . .
        . . 7 7 . . . . . . . 7 7 . .
    `

    // Cucumber - health pickup!
    const cucumberImg = img`
        . . . . . . . . . . . . . . . .
        . . . . . . . e e . . . . . . .
        . . . . . . 7 7 . . . . . . . .
        . . . . . 7 7 7 . . . . . . . .
        . . . . 7 7 7 7 . . . . . . . .
        . . . 7 7 7 7 . . . . . . . . .
        . . . 7 7 7 7 . . . . . . . . .
        . . . 7 7 7 7 . . . . . . . . .
        . . . 7 7 7 7 . . . . . . . . .
        . . . 7 7 7 7 . . . . . . . . .
        . . . 7 7 7 7 . . . . . . . . .
        . . . . 7 7 7 7 . . . . . . . .
        . . . . . 7 7 7 7 . . . . . . .
        . . . . . . 7 7 7 . . . . . . .
        . . . . . . . 7 e . . . . . . .
        . . . . . . . . . . . . . . . .
    `

    // Boss spaceship - big and menacing!
    const bossImg = img`
        . . . . . . . . . . . . f f f f f f . . . . . . . . . . . . . .
        . . . . . . . . . . . f f 2 2 2 2 f f . . . . . . . . . . . . .
        . . . . . . . . . . f f 2 2 2 2 2 2 f f . . . . . . . . . . . .
        . . . . . . . . . f f 2 2 2 2 2 2 2 2 f f . . . . . . . . . . .
        . . . . . . . . f f 2 2 2 2 2 2 2 2 2 2 f f . . . . . . . . . .
        . . . . . . . f f c c c c c c c c c c c c f f . . . . . . . . .
        . . . . . . f f c c c c c c c c c c c c c c f f . . . . . . . .
        . . . . . f f c c c c c c c c c c c c c c c c f f . . . . . . .
        . . . . f f c c c f f c c c c c c c c f f c c c f f . . . . . .
        . . . f f c c c c f f c c c c c c c c f f c c c c f f . . . . .
        . . f f c c c c c c c c c c c c c c c c c c c c c c f f . . . .
        . f f c c c c c c c c c c c c c c c c c c c c c c c c f f . . .
        f f c c c c c c c c c c c c c c c c c c c c c c c c c c f f . .
        f c c c c c c c c c c c c c c c c c c c c c c c c c c c c f . .
        f f f f f f f f f c c c c c c c c c c c c f f f f f f f f f . .
        . . . . . . . . f f 4 4 4 4 4 4 4 4 4 4 f f . . . . . . . . . .
    `

    // Bomb dropped by boss
    const bombImg = img`
        . . . f f . . .
        . . f 2 2 f . .
        . f 2 2 2 2 f .
        f 2 2 2 2 2 2 f
        f 2 2 2 2 2 2 f
        . f 2 2 2 2 f .
        . . f 4 4 f . .
        . . . f f . . .
    `

    export function start() {
        // Dark space background
        scene.setBackgroundColor(15)

        // Add some stars
        effects.starField.startScreenEffect()

        // Reset score
        info.setScore(0)

        // Set starting lives to 3
        info.setLife(3)

        // Reset boss state
        boss = null
        bossHealth = 0
        bossActive = false
        bossLevel = 0
        nextBossScore = 20

        // Create ship at bottom center
        ship = sprites.create(shipImg, ShipKind)
        ship.x = 80
        ship.bottom = 115
        ship.setFlag(SpriteFlag.StayInScreen, true)
    }

    export function spawnBoss() {
        if (bossActive) return

        bossLevel += 1
        bossActive = true
        bossHealth = 15

        // Clear existing enemies
        sprites.destroyAllSpritesOfKind(AsteroidKind)
        sprites.destroyAllSpritesOfKind(AlienKind)
        sprites.destroyAllSpritesOfKind(CucumberKind)

        // Create boss sprite and recolor it based on level
        const bossImage = bossImg.clone()
        const colorIndex = Math.min(bossLevel - 1, bossColors.length - 1)
        const bodyColor = bossColors[colorIndex][0]
        const cockpitColor = bossColors[colorIndex][1]

        // Replace colors: c (dark purple) -> body color, 2 (red) -> cockpit color
        bossImage.replace(12, bodyColor)
        bossImage.replace(2, cockpitColor)

        // Create boss at top
        boss = sprites.create(bossImage, BossKind)
        boss.x = 80
        boss.top = 5
        boss.vx = 15 + bossLevel * 3 // Each boss is a bit faster
        boss.setFlag(SpriteFlag.BounceOnWall, true)

        // Show warning message for 5 seconds
        bossMessageUntil = game.runtime() + 5000
    }

    export function dropBomb() {
        if (!boss || !bossActive) return

        const bomb = sprites.create(bombImg, BombKind)
        bomb.x = boss.x
        bomb.top = boss.bottom
        bomb.vy = 30
        bomb.setFlag(SpriteFlag.AutoDestroy, true)
    }

    export function checkBossSpawn() {
        if (!bossActive && info.score() >= nextBossScore) {
            spawnBoss()
        }
    }

    export function handleLeft(pressed: boolean) {
        if (ship) {
            ship.vx = pressed ? -100 : 0
        }
    }

    export function handleRight(pressed: boolean) {
        if (ship) {
            ship.vx = pressed ? 100 : 0
        }
    }

    export function handleShoot() {
        if (ship) {
            const laser = sprites.create(laserImg, LaserKind)
            laser.x = ship.x
            laser.bottom = ship.top
            laser.vy = -150
            laser.setFlag(SpriteFlag.AutoDestroy, true)
            music.pewPew.play()
        }
    }

    export function spawnAsteroid() {
        const asteroid = sprites.create(asteroidImg, AsteroidKind)
        asteroid.x = randint(10, 150)
        asteroid.top = 0
        asteroid.vy = randint(15, 30)
        asteroid.setFlag(SpriteFlag.AutoDestroy, true)
    }

    export function spawnAlien() {
        const alien = sprites.create(alienImg, AlienKind)
        alien.x = randint(20, 140)
        alien.top = 0
        alien.vy = randint(10, 20)
        alien.vx = randint(-15, 15)
        alien.setFlag(SpriteFlag.AutoDestroy, true)
        alien.setFlag(SpriteFlag.BounceOnWall, true)
    }

    export function spawnCucumber() {
        const cucumber = sprites.create(cucumberImg, CucumberKind)
        cucumber.x = randint(20, 140)
        cucumber.top = 0
        cucumber.vy = randint(25, 45)
        cucumber.setFlag(SpriteFlag.AutoDestroy, true)
    }

    // Laser hits asteroid
    sprites.onOverlap(LaserKind, AsteroidKind, (laser, asteroid) => {
        laser.destroy()
        asteroid.destroy(effects.fire, 200)
        info.changeScoreBy(1)
    })

    // Laser hits alien
    sprites.onOverlap(LaserKind, AlienKind, (laser, alien) => {
        laser.destroy()
        alien.destroy(effects.disintegrate, 200)
        info.changeScoreBy(3)
        music.powerUp.play()
    })

    // Ship hits asteroid = lose a life
    sprites.onOverlap(ShipKind, AsteroidKind, (_ship, asteroid) => {
        asteroid.destroy()
        info.changeLifeBy(-1)
        if (info.life() <= 0) {
            game.over(false, effects.dissolve)
        } else {
            music.wawawawaa.play()
        }
    })

    // Ship hits alien = lose a life
    sprites.onOverlap(ShipKind, AlienKind, (_ship, alien) => {
        alien.destroy()
        info.changeLifeBy(-1)
        if (info.life() <= 0) {
            game.over(false, effects.dissolve)
        } else {
            music.wawawawaa.play()
        }
    })

    // Ship picks up cucumber = gain a life (max 3)
    sprites.onOverlap(ShipKind, CucumberKind, (_ship, cucumber) => {
        cucumber.destroy(effects.spray, 100)
        if (info.life() < 3) {
            info.changeLifeBy(1)
        }
        music.powerUp.play()
        info.changeScoreBy(5)
    })

    // Laser hits boss
    sprites.onOverlap(LaserKind, BossKind, (laser, _boss) => {
        laser.destroy()
        bossHealth -= 1
        music.pewPew.play()

        if (boss && bossHealth <= 0) {
            // Boss defeated!
            boss.destroy(effects.fire, 500)
            boss = null
            bossActive = false
            info.changeScoreBy(50)
            // Set next boss threshold to current score + 20
            nextBossScore = info.score() + 20
            music.powerUp.play()
            game.splash("BRAVO !", "")
        }
    })

    // Ship hits bomb = lose a life
    sprites.onOverlap(ShipKind, BombKind, (_ship, bomb) => {
        bomb.destroy(effects.fire, 100)
        info.changeLifeBy(-1)
        if (info.life() <= 0) {
            game.over(false, effects.dissolve)
        } else {
            music.wawawawaa.play()
        }
    })

    // Ship hits boss = lose a life
    sprites.onOverlap(ShipKind, BossKind, (_ship, _boss) => {
        info.changeLifeBy(-1)
        if (info.life() <= 0) {
            game.over(false, effects.dissolve)
        } else {
            music.wawawawaa.play()
        }
    })

    // Draw boss warning message
    game.onPaint(() => {
        if (bossMessageUntil > game.runtime()) {
            image.screenImage().printCenter("BOSS !!!", 55, 2, image.font8)
        }
    })
}
