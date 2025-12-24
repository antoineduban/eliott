// ============================================
// GAME 1: FRUIT CATCHER
// Catch fruits, avoid smelly cheese!
// ============================================

// biome-ignore lint/correctness/noUnusedVariables: used in main.ts
namespace FruitCatcher {
    // Sprite kinds
    export const PlayerKind = SpriteKind.create()
    export const FruitKind = SpriteKind.create()
    export const CheeseKind = SpriteKind.create()

    // Player sprite
    let player: Sprite

    // Sprite images
    const playerImage = img`
        . . . . 5 5 5 5 5 5 5 5 . . . .
        . . . 5 5 5 5 5 5 5 5 5 5 . . .
        . . 5 5 5 5 5 5 5 5 5 5 5 5 . .
        . 5 5 5 5 5 5 5 5 5 5 5 5 5 5 .
        . 5 5 1 1 1 1 1 1 1 1 1 1 5 5 .
        . 5 1 1 1 1 1 1 1 1 1 1 1 1 5 .
        . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 .
        . 1 1 1 9 1 1 1 1 1 1 9 1 1 1 .
        . 1 1 1 f 1 1 1 1 1 1 f 1 1 1 .
        . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 .
        . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 .
        . 1 1 1 1 1 2 1 1 2 1 1 1 1 1 .
        . 1 1 1 1 1 1 2 2 1 1 1 1 1 1 .
        . . 1 1 1 1 1 1 1 1 1 1 1 1 . .
        . . . 1 1 1 1 1 1 1 1 1 1 . . .
        . . . . . 1 1 1 1 1 1 . . . . .
    `

    const appleImg = img`
        . . . . . 7 7 . . .
        . . . . . 7 7 7 . .
        . . . . 2 2 . . . .
        . . . 2 2 2 2 . . .
        . . 2 1 2 2 2 2 . .
        . 2 1 2 2 2 2 2 2 .
        . 2 2 2 2 2 2 2 2 .
        . 2 2 2 2 2 2 2 2 .
        . . 2 2 2 2 2 2 . .
        . . . 2 2 2 2 . . .
    `

    const pineappleImg = img`
        . . . . 7 7 . . . .
        . . 7 7 7 7 7 7 . .
        . . . 7 7 7 7 . . .
        . . . . 5 5 . . . .
        . . . 5 5 5 5 . . .
        . . 4 5 5 5 5 4 . .
        . . 5 5 5 5 5 5 . .
        . . 5 5 4 4 5 5 . .
        . . 5 5 5 5 5 5 . .
        . . 4 5 5 5 5 4 . .
        . . 5 5 5 5 5 5 . .
        . . . 5 5 5 5 . . .
        . . . . 5 5 . . . .
    `

    const coconutImg = img`
        . . . . e e e e . . . .
        . . . e e e e e e . . .
        . . e e e e e e e e . .
        . e e e f e e f e e e .
        . e e e e e e e e e e .
        . e e e e e e e e e e .
        . e e e e e e e e e e .
        . e e e e f f e e e e .
        . . e e e e e e e e . .
        . . . e e e e e e . . .
        . . . . e e e e . . . .
    `

    const watermelonImg = img`
        . . . . . . 2 2 . . . . . .
        . . . . . 2 2 2 2 . . . . .
        . . . . 2 2 2 2 2 2 . . . .
        . . . 2 2 f 2 2 f 2 2 . . .
        . . 2 2 2 2 2 f 2 2 2 2 . .
        . 2 2 2 f 2 2 2 2 f 2 2 2 .
        2 2 2 2 2 2 2 2 2 2 2 2 2 2
        1 1 1 1 1 1 1 1 1 1 1 1 1 1
        7 7 7 7 7 7 7 7 7 7 7 7 7 7
        6 6 6 6 6 6 6 6 6 6 6 6 6 6
    `

    const cheeseImg = img`
        . . . . 5 5 5 5 5 5 . . . .
        . . . 5 5 8 5 5 9 5 5 . . .
        . . 5 5 5 5 5 5 5 5 5 5 . .
        . 5 5 9 8 9 5 5 5 8 5 5 5 .
        . 5 5 8 9 5 5 5 5 5 5 5 5 .
        5 5 5 5 5 5 5 8 9 5 5 9 5 5
        5 5 5 5 5 5 5 9 8 5 5 8 5 5
        5 5 8 9 5 5 5 5 5 5 5 5 5 5
        5 5 9 8 5 5 5 5 5 8 5 5 5 5
        . 5 5 5 5 5 8 9 5 9 5 5 5 .
        . . 5 5 5 5 9 8 5 5 5 5 . .
        . . . 5 5 5 5 5 5 5 5 . . .
        . . . . 5 5 5 5 5 5 . . . .
    `

    export function start() {
        // Sky blue background
        scene.setBackgroundColor(9)

        // Reset score
        info.setScore(0)

        // Create player
        player = sprites.create(playerImage, PlayerKind)
        player.left = 10
        player.y = 60
        player.setFlag(SpriteFlag.StayInScreen, true)
    }

    // Set up collisions (registered once at load time)
    sprites.onOverlap(PlayerKind, FruitKind, (_sprite, fruit) => {
        fruit.destroy(effects.spray, 100)
        info.changeScoreBy(1)
        music.baDing.play()
    })

    sprites.onOverlap(PlayerKind, CheeseKind, (_sprite, cheese) => {
        cheese.destroy()
        game.over(false)
    })

    export function handleUp(pressed: boolean) {
        if (player) {
            player.vy = pressed ? -80 : 0
        }
    }

    export function handleDown(pressed: boolean) {
        if (player) {
            player.vy = pressed ? 80 : 0
        }
    }

    export function spawnFruit() {
        const fruitType = randint(1, 4)
        let fruitImg: Image

        if (fruitType === 1) {
            fruitImg = appleImg
        } else if (fruitType === 2) {
            fruitImg = pineappleImg
        } else if (fruitType === 3) {
            fruitImg = coconutImg
        } else {
            fruitImg = watermelonImg
        }

        const fruit = sprites.create(fruitImg, FruitKind)
        fruit.x = 155
        fruit.y = randint(15, 105)
        fruit.vx = -50
        fruit.setFlag(SpriteFlag.AutoDestroy, true)
    }

    export function spawnCheese() {
        const cheese = sprites.create(cheeseImg, CheeseKind)
        cheese.x = 155
        cheese.y = randint(15, 105)
        cheese.vx = -60
        cheese.setFlag(SpriteFlag.AutoDestroy, true)
    }
}
