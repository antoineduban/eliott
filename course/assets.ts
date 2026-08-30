// ============================================
// IMAGES DU JEU DE COURSE (pixel art + formes dessinées en code)
// ============================================

// biome-ignore lint/correctness/noUnusedVariables: utilisé par les autres fichiers
namespace Assets {
    // ---------- La voiture de Vroum (vue de dessus, l'avant en haut) ----------
    export const car = img`
        . f f . . . . . . f f .
        . f f 2 2 2 2 2 2 f f .
        . . 2 2 2 2 2 2 2 2 . .
        . . 2 2 2 2 2 2 2 2 . .
        . . 2 9 9 9 9 9 9 2 . .
        . . 2 9 9 1 9 9 9 2 . .
        . . 2 2 2 2 2 2 2 2 . .
        . . 2 2 2 2 2 2 2 2 . .
        . . 2 2 2 2 2 2 2 2 . .
        . . 2 9 9 9 9 9 9 2 . .
        . . 2 2 2 2 2 2 2 2 . .
        . f f 2 2 2 2 2 2 f f .
        . f f 2 4 2 2 4 2 f f .
        . . 2 2 2 2 2 2 2 2 . .
        . . . 2 2 2 2 2 2 . . .
        . . . . . . . . . . . .
    `

    // Une autre voiture, d'une autre couleur (elle roule moins vite que nous)
    export function otherCar(color: number): Image {
        const im = car.clone()
        im.replace(2, color)
        return im
    }

    export const star = img`
        . . . . 5 . . . .
        . . . . 5 . . . .
        . . . 5 5 5 . . .
        5 5 5 5 1 5 5 5 5
        . 5 5 5 1 5 5 5 .
        . . 5 5 5 5 5 . .
        . . 5 5 . 5 5 . .
        . 5 5 . . . 5 5 .
        . 5 . . . . . 5 .
    `

    // ---------- Obstacles ----------
    export const hayBale = img`
        . . 5 5 5 5 5 5 . .
        . 5 5 4 5 5 4 5 5 .
        5 5 4 5 5 5 5 4 5 5
        5 4 5 5 5 5 5 5 4 5
        5 4 5 5 5 5 5 5 4 5
        5 5 4 5 5 5 5 4 5 5
        . 5 5 4 5 5 4 5 5 .
        . . 5 5 5 5 5 5 . .
    `

    export const cow = img`
        . . . . . . . . . . . f f .
        . 1 1 1 1 1 1 1 1 1 1 1 1 .
        1 1 f f 1 1 1 1 1 f f 1 1 1
        1 1 f f 1 1 1 1 1 f f 1 3 3
        1 1 1 1 1 1 f 1 1 1 1 1 3 3
        1 1 1 1 1 1 1 1 1 1 1 1 1 .
        . 1 1 . . 1 1 . . 1 1 . . .
        . 1 1 . . 1 1 . . 1 1 . . .
    `

    export const crab = img`
        . 2 2 . . . . . . . . . . 2 2 .
        2 2 2 2 . . . . . . . . 2 2 2 2
        . 2 2 . . 2 2 2 2 2 2 . . 2 2 .
        . . 2 . 2 2 1 f 2 2 f 1 2 . 2 .
        . . 2 2 2 2 2 2 2 2 2 2 2 2 2 .
        . . . 2 2 2 2 2 2 2 2 2 2 2 . .
        . . 2 . 2 . 2 . . 2 . 2 . 2 . .
        . 2 . 2 . . . . . . . . 2 . 2 .
    `

    export const beachBall = img`
        . . . 2 2 1 1 . . .
        . . 2 2 2 1 1 1 . .
        . 2 2 2 2 1 1 1 1 .
        2 2 2 2 2 1 1 1 1 1
        8 8 8 8 8 5 5 5 5 5
        8 8 8 8 8 5 5 5 5 5
        . 8 8 8 8 5 5 5 5 .
        . . 8 8 8 5 5 5 . .
        . . . 8 8 5 5 . . .
    `

    export const sandcastle = img`
        . . . . . 2 2 . . . . .
        . . . . . e . . . . . .
        . d . d . d . d . d . d
        . d d d d d d d d d d d
        . d d d d d d d d d d d
        . d d d f d d d f d d d
        d d d d d d d d d d d d
        d d d d d d d d d d d d
    `

    export const log = img`
        e e e e e e e e e e e e e c
        e d d e e d e e e e d e e c
        e e e e e e e e d e e e e c
        e d e e e d e e e e e d e c
        e e e e e e e e e e e e e c
    `

    export const hedgehog = img`
        . . c . c . c . c . . .
        . c b c b c b c b c . .
        c b b b b b b b b b c .
        c b b b b b b b b b e e
        . b b b b b b b b e f e
        . . b b b b b b e e e .
        . . e . e . e . e . . .
    `

    export const mushroom = img`
        . . . 2 2 2 2 2 2 . . .
        . 2 2 2 1 2 2 2 2 2 2 .
        2 2 1 2 2 2 2 2 1 2 2 2
        2 2 2 2 2 2 1 2 2 2 2 2
        . . . d d d d d d . . .
        . . . d 1 d d 1 d . . .
        . . . d d d d d d . . .
        . . . d d d d d d . . .
    `

    export const snowman = img`
        . . . f f f f . . .
        . . f f f f f f . .
        . . . 1 1 1 1 . . .
        . . 1 f 1 1 f 1 . .
        . . 1 1 4 4 1 1 . .
        . . . 2 2 2 2 . . .
        . 1 1 1 1 1 1 1 1 .
        1 1 1 1 f 1 1 1 1 1
        1 1 1 1 1 1 1 1 1 1
        . 1 1 1 f 1 1 1 1 .
        . . 1 1 1 1 1 1 . .
    `

    export const penguin = img`
        . . . f f f f . . .
        . . f f f f f f . .
        . f f 1 f f 1 f f .
        . f f f 4 4 f f f .
        f f 1 1 1 1 1 1 f f
        f f 1 1 1 1 1 1 f f
        f f 1 1 1 1 1 1 f f
        . f 1 1 1 1 1 1 f .
        . . f 1 1 1 1 f . .
        . . 4 4 . . 4 4 . .
    `

    export const cone = img`
        . . . 4 4 . . .
        . . . 4 4 . . .
        . . 4 4 4 4 . .
        . . 1 1 1 1 . .
        . . 4 4 4 4 . .
        . 4 4 4 4 4 4 .
        . 1 1 1 1 1 1 .
        4 4 4 4 4 4 4 4
        f f f f f f f f
    `

    export const chicken = img`
        . . . . . . 2 . .
        . . . . . 1 1 1 .
        . . . . 1 1 1 4 4
        . 1 1 1 1 1 1 1 .
        1 1 1 1 1 1 1 . .
        . 1 1 1 1 1 1 . .
        . . 1 1 1 1 . . .
        . . . 4 . 4 . . .
        . . . 4 . 4 . . .
    `

    // Flaque (glace ou huile) : une ellipse dessinée en code
    export function puddle(color: number, shine: number): Image {
        const im = image.create(18, 9)
        im.fillCircle(6, 4, 4, color)
        im.fillCircle(11, 4, 4, color)
        im.fillRect(6, 0, 6, 9, color)
        im.setPixel(5, 2, shine)
        im.setPixel(6, 2, shine)
        return im
    }

    // ---------- Décors sur les bords (dessinés en code) ----------
    export function roundTree(leaf: number, trunk: number): Image {
        const im = image.create(16, 20)
        im.fillRect(7, 12, 3, 8, trunk)
        im.fillCircle(8, 8, 7, leaf)
        im.fillCircle(5, 6, 3, leaf + 0)
        im.setPixel(5, 5, 1)
        return im
    }

    export function pineTree(leaf: number, top: number): Image {
        const im = image.create(16, 22)
        im.fillRect(7, 17, 3, 5, 14)
        im.fillTriangle(8, 8, 1, 21, 15, 21, leaf)
        im.fillTriangle(8, 3, 3, 14, 13, 14, leaf)
        im.fillTriangle(8, 0, 5, 8, 11, 8, top)
        return im
    }

    export function palmTree(): Image {
        const im = image.create(20, 22)
        im.fillRect(9, 6, 3, 16, 14)
        im.fillCircle(5, 6, 4, 7)
        im.fillCircle(15, 6, 4, 7)
        im.fillCircle(10, 3, 4, 7)
        im.setPixel(9, 12, 12)
        return im
    }

    export function parasol(color: number): Image {
        const im = image.create(16, 16)
        im.fillRect(7, 7, 2, 9, 1)
        im.fillCircle(8, 7, 7, color)
        im.fillRect(0, 8, 16, 8, 0)
        im.fillRect(7, 7, 2, 9, 1)
        im.fillRect(3, 4, 2, 4, 1)
        im.fillRect(11, 4, 2, 4, 1)
        return im
    }

    export function flower(color: number): Image {
        const im = image.create(7, 9)
        im.fillRect(3, 4, 1, 5, 7)
        im.fillCircle(3, 3, 3, color)
        im.setPixel(3, 3, 5)
        return im
    }

    export function rock(): Image {
        const im = image.create(12, 8)
        im.fillCircle(4, 4, 3, 11)
        im.fillCircle(8, 4, 3, 11)
        im.setPixel(4, 2, 1)
        return im
    }

    export function building(h: number, color: number): Image {
        const im = image.create(20, h)
        im.fill(color)
        for (let y = 3; y < h - 3; y += 5) {
            for (let x = 3; x < 20; x += 5) {
                im.fillRect(x, y, 2, 2, (x + y) % 3 === 0 ? 15 : 5)
            }
        }
        im.fillRect(0, 0, 20, 1, 15)
        return im
    }

    export function streetlight(): Image {
        const im = image.create(10, 22)
        im.fillRect(4, 3, 2, 19, 11)
        im.fillRect(4, 3, 6, 2, 11)
        im.fillCircle(8, 2, 2, 5)
        return im
    }

    // Ligne d'arrivée à damier (toute la largeur de la route)
    export function finishLine(width: number): Image {
        const im = image.create(width, 8)
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < width; x++) {
                const dark = ((x >> 2) + (y >> 2)) % 2 === 0
                im.setPixel(x, y, dark ? 15 : 1)
            }
        }
        return im
    }

    // Un joli drapeau pour la barre de progression
    export const flag = img`
        1 5 5 1 1 5 5
        1 1 1 5 5 1 1
        1 5 5 1 1 5 5
        1 . . . . . .
        1 . . . . . .
    `
}
