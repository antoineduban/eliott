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

    // Player ship
    let ship: Sprite

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

    export function start() {
        // Dark space background
        scene.setBackgroundColor(15)

        // Add some stars
        effects.starField.startScreenEffect()

        // Reset score
        info.setScore(0)

        // Create ship at bottom center
        ship = sprites.create(shipImg, ShipKind)
        ship.x = 80
        ship.bottom = 115
        ship.setFlag(SpriteFlag.StayInScreen, true)
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
        asteroid.vy = randint(30, 60)
        asteroid.setFlag(SpriteFlag.AutoDestroy, true)
    }

    export function spawnAlien() {
        const alien = sprites.create(alienImg, AlienKind)
        alien.x = randint(20, 140)
        alien.top = 0
        alien.vy = randint(20, 40)
        alien.vx = randint(-20, 20)
        alien.setFlag(SpriteFlag.AutoDestroy, true)
        alien.setFlag(SpriteFlag.BounceOnWall, true)
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

    // Ship hits asteroid = GAME OVER
    sprites.onOverlap(ShipKind, AsteroidKind, (_ship, asteroid) => {
        asteroid.destroy()
        game.over(false, effects.dissolve)
    })

    // Ship hits alien = GAME OVER
    sprites.onOverlap(ShipKind, AlienKind, (_ship, alien) => {
        alien.destroy()
        game.over(false, effects.dissolve)
    })
}
