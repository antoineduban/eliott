// ============================================
// IMAGES DU JEU (pixel art)
// ============================================

// biome-ignore lint/correctness/noUnusedVariables: utilisé par les autres fichiers
namespace Assets {
    function flipAll(frames: Image[]): Image[] {
        const out: Image[] = []
        for (const f of frames) {
            const c = f.clone()
            c.flipX()
            out.push(c)
        }
        return out
    }

    function flipped(im: Image): Image {
        const c = im.clone()
        c.flipX()
        return c
    }

    // ---------- Lila la fée (regarde à droite) ----------
    export const fairyR: Image[] = [
        img`
            . . . . . 5 5 5 5 5 . . . . . .
            . . . . 5 5 5 5 5 5 5 . . . . .
            . 9 9 . 5 5 d d d d 5 5 . . . .
            9 9 9 9 5 5 d f d f d 5 . . . .
            9 1 9 9 9 . d d d d d . . . 5 .
            9 1 9 9 9 . d 2 2 d . . . 5 1 5
            9 9 9 9 9 3 3 3 3 3 3 . . . 5 .
            . 9 9 9 3 3 3 3 3 3 3 d d e . .
            . 9 9 9 9 3 3 1 3 3 3 . . . . .
            9 9 9 9 9 . 3 3 3 3 . . . . . .
            9 1 9 9 . 3 3 3 3 3 3 . . . . .
            9 9 9 9 3 3 3 3 3 3 3 3 . . . .
            . 9 9 . 3 3 3 3 3 3 3 3 . . . .
            . . . . . d d . . d d . . . . .
            . . . . . a a . . a a . . . . .
            . . . . . . . . . . . . . . . .
        `,
        img`
            . . . . . 5 5 5 5 5 . . . . . .
            . 9 9 . 5 5 5 5 5 5 5 . . . . .
            9 9 9 9 5 5 d d d d 5 5 . . . .
            9 1 9 9 5 5 d f d f d 5 . . . .
            9 1 9 9 9 . d d d d d . . . 5 .
            9 9 9 9 9 . d 2 2 d . . . 5 1 5
            . 9 9 9 9 3 3 3 3 3 3 . . . 5 .
            . 9 9 9 3 3 3 3 3 3 3 d d e . .
            . 9 9 9 . 3 3 1 3 3 3 . . . . .
            9 9 9 9 . . 3 3 3 3 . . . . . .
            9 1 9 9 . 3 3 3 3 3 3 . . . . .
            . 9 9 . 3 3 3 3 3 3 3 3 . . . .
            . . . . 3 3 3 3 3 3 3 3 . . . .
            . . . . . d d . . d d . . . . .
            . . . . . a a . . a a . . . . .
            . . . . . . . . . . . . . . . .
        `,
    ]
    export const fairyL: Image[] = flipAll(fairyR)

    // ---------- Étincelle magique ----------
    export const sparkle: Image[] = [
        img`
            . . . 1 . . .
            . . 5 1 5 . .
            . 5 1 1 1 5 .
            1 1 1 9 1 1 1
            . 5 1 1 1 5 .
            . . 5 1 5 . .
            . . . 1 . . .
        `,
        img`
            5 . . . . . 5
            . 1 . . . 1 .
            . . 1 5 1 . .
            . . 5 9 5 . .
            . . 1 5 1 . .
            . 1 . . . 1 .
            5 . . . . . 5
        `,
    ]

    // ---------- Objets ----------
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

    export const heart = img`
        . 2 2 . . 2 2 .
        2 2 2 2 2 2 2 2
        2 2 1 2 2 2 2 2
        2 2 2 2 2 2 2 2
        . 2 2 2 2 2 2 .
        . . 2 2 2 2 . .
        . . . 2 2 . . .
    `

    export const portal = img`
        . . . . . a a a a a a . . . . .
        . . . a a 9 9 9 9 9 9 a a . . .
        . . a 9 9 1 9 9 9 9 1 9 9 a . .
        . a 9 9 1 9 9 5 5 9 9 1 9 9 a .
        . a 9 1 9 9 5 1 1 5 9 9 1 9 a .
        a 9 9 1 9 9 5 1 1 5 9 9 1 9 9 a
        a 9 9 9 1 9 9 5 5 9 9 1 9 9 9 a
        a 9 9 9 9 1 9 9 9 9 1 9 9 9 9 a
        a 9 9 9 9 9 1 1 1 1 9 9 9 9 9 a
        a 9 9 1 9 9 9 9 9 9 9 9 1 9 9 a
        a 9 9 9 1 1 9 9 9 9 1 1 9 9 9 a
        a 9 9 9 9 9 1 1 1 1 9 9 9 9 9 a
        a 9 9 9 9 9 9 9 9 9 9 9 9 9 9 a
        a 9 9 9 9 9 9 9 9 9 9 9 9 9 9 a
        a 9 9 9 9 9 9 9 9 9 9 9 9 9 9 a
        a 9 9 9 9 9 9 9 9 9 9 9 9 9 9 a
        a 9 9 9 9 9 9 9 9 9 9 9 9 9 9 a
        a 9 9 9 9 9 9 9 9 9 9 9 9 9 9 a
        a a a a a a a a a a a a a a a a
    `

    // ---------- Ennemis (regardent à gauche) ----------
    export const toad = img`
        . . 7 7 . . . . . . . 7 7 . . .
        . 7 1 f 7 . . . . . 7 1 f 7 . .
        . 7 7 7 7 7 7 7 7 7 7 7 7 7 . .
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 .
        7 7 6 7 7 7 7 6 7 7 7 7 6 7 7 7
        7 f 7 7 7 7 7 7 7 7 7 7 7 7 7 7
        7 7 f f f f 7 7 7 7 7 7 7 7 7 7
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
        . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 .
        . 7 7 7 . 7 7 . . . 7 7 . 7 7 .
        7 7 7 . . . . . . . . . . 7 7 7
    `

    export const mushroom = img`
        . . . . . 2 2 2 2 2 2 . . . . .
        . . . 2 2 2 1 2 2 2 2 2 2 . . .
        . . 2 2 2 2 1 1 2 2 2 1 2 2 . .
        . 2 2 1 2 2 2 2 2 2 2 1 1 2 2 .
        . 2 2 1 1 2 2 2 2 2 2 2 2 2 2 .
        2 2 2 2 2 2 2 2 2 1 2 2 2 2 2 2
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
        . . . . d d d d d d d d . . . .
        . . . . d f d d d d f d . . . .
        . . . . d d d d d d d d . . . .
        . . . . d d f d d f d d . . . .
        . . . . d d d f f d d d . . . .
        . . . . d d d d d d d d . . . .
        . . . . d d d d d d d d . . . .
    `

    export const gargoyle = img`
        . . . c c . . . . . . c c . . .
        . . c b c . . . . . . c b c . .
        . . c b b c c c c c c b b c . .
        . . c b b b b b b b b b b c . .
        . c b b 2 b b b b b b 2 b b c .
        . c b b b b b b b b b b b b c .
        . c b b b c b b b b c b b b c .
        . c b b b b c c c c b b b b c .
        . . c b b b b b b b b b b c . .
        . . c b b b b b b b b b b c . .
        . . . c b b c c c c b b c . . .
        . . . c b b c . . c b b c . . .
        . . . c c c c . . c c c c . . .
    `

    export const bat: Image[] = [
        img`
            a a . . . . . . . . . . . . a a
            a a a . . . . a a . . . . a a a
            . a a a . . a a a a . . a a a .
            . a a a a a a 2 a 2 a a a a a .
            . . a a a a a a a a a a a a . .
            . . . a a a a a a a a a a . . .
            . . . . . a a 1 a 1 a . . . . .
            . . . . . . a a a a . . . . . .
            . . . . . . . a a . . . . . . .
        `,
        img`
            . . . . . . . a a . . . . . . .
            . . . . . . a a a a . . . . . .
            . . . a a a a 2 a 2 a a a a . .
            . . a a a a a a a a a a a a a .
            . a a a a a a a a a a a a a a a
            a a a . a a a 1 a 1 a a . a a a
            a a . . . a a a a a a . . . a a
            . . . . . . a a a a . . . . . .
            . . . . . . . a a . . . . . . .
        `,
    ]

    export const ghost: Image[] = [
        img`
            . . . . . 1 1 1 1 1 1 . . . . .
            . . . 1 1 1 1 1 1 1 1 1 1 . . .
            . . 1 1 1 1 1 1 1 1 1 1 1 1 . .
            . 1 1 1 1 f f 1 1 1 f f 1 1 1 .
            . 1 1 1 1 f f 1 1 1 f f 1 1 1 .
            . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 .
            . 1 1 1 1 1 1 f f f 1 1 1 1 1 .
            . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 .
            . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 .
            . 1 1 9 1 1 1 1 1 1 1 1 9 1 1 .
            . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 .
            . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 .
            . 1 1 . 1 1 1 . . 1 1 1 . 1 1 .
            . 1 . . . 1 1 . . 1 1 . . . 1 .
        `,
        img`
            . . . . . 1 1 1 1 1 1 . . . . .
            . . . 1 1 1 1 1 1 1 1 1 1 . . .
            . . 1 1 1 1 1 1 1 1 1 1 1 1 . .
            . 1 1 1 1 f f 1 1 1 f f 1 1 1 .
            . 1 1 1 1 f f 1 1 1 f f 1 1 1 .
            . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 .
            . 1 1 1 1 1 1 f f f 1 1 1 1 1 .
            . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 .
            . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 .
            . 1 1 9 1 1 1 1 1 1 1 1 9 1 1 .
            . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 .
            . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 .
            . 1 1 1 . 1 1 1 . 1 1 1 . 1 1 .
            . . 1 . . . 1 . . . 1 . . 1 . .
        `,
    ]

    // ---------- Boss 1 : la sorcière (regarde à gauche) ----------
    export const witchL = img`
        . . . . . . . . f . . . . . . . . . . . . . . .
        . . . . . . . f f f . . . . . . . . . . . . . .
        . . . . . . . f f f . . . . . . . . . . . . . .
        . . . . . . f f f f f . . . . . . . . . . . . .
        . . . . . . f f a f f . . . . . . . . . . . . .
        . . . . . f f f a f f f . . . . . . . . . . . .
        . . . f f f f f f f f f f f f . . . . . . . . .
        . . . . . 7 7 7 7 7 7 7 . . . . . . . . . . . .
        . . . . 7 7 f 7 7 7 f 7 7 . . . . . . . . . . .
        . . . . 7 7 7 7 7 7 7 7 7 . . . . . . . . . . .
        . . . . . 7 7 2 2 2 7 7 . . . . . . . . . . . .
        . . . . . . f f f f . . . . . f . . . . . . . .
        . . . . . f f f f f f . . . f f . . . . . . . .
        . . . . f f f f f f f f . f f . . . . . . . . .
        . . . . f f f f f f f f f f . . . . . . . . . .
        . . . f f f f f f f f f f . . . . . . . . . . .
        . . . f f f f f f f f f f f . . . . . . . . . .
        . . e e e e e e e e e e e e e e e e e . . . . .
        . . . f f . . . . . . . . . . . e 5 5 5 5 5 . .
        . . . f f . . . . . . . . . . . 5 5 5 5 5 5 5 .
        . . . . . . . . . . . . . . . . . 5 5 5 5 5 . .
    `
    export const witchR = flipped(witchL)

    export const potion = img`
        . . . e e . . .
        . . . e e . . .
        . . 7 7 7 7 . .
        . 7 7 1 7 7 7 .
        7 7 7 1 7 7 7 7
        7 7 7 7 7 7 7 7
        7 7 7 7 7 7 7 7
        . 7 7 7 7 7 7 .
        . . 7 7 7 7 . .
    `

    // ---------- Boss 2 : le dragon (regarde à gauche) ----------
    export const dragonL = img`
        . . . 7 7 7 7 . . . . . . . . . . . . . . . . . . . . . . . . .
        . . 7 7 7 7 7 7 7 . . . . . . . . . . . . . 6 . . . . . . . . .
        . 7 7 2 2 7 7 7 7 7 . . . . . . . . . . . 6 6 6 . . . . . . . .
        . 7 7 2 2 7 7 7 7 7 7 . . . . . . . . . 6 6 6 6 6 . . . . . . .
        7 7 7 7 7 7 7 7 7 7 7 7 . . . . . . . 6 6 6 6 6 6 6 . . . . . .
        7 1 7 1 7 7 7 7 7 7 7 7 7 . . . . . 6 6 6 6 6 6 6 6 6 . . . . .
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . . . .
        . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . . .
        . . . . . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . .
        . . . . . 7 4 4 4 4 4 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 .
        . . . . . 7 4 4 4 4 4 4 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
        . . . . . 7 4 4 4 4 4 4 4 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
        . . . . . 7 4 4 4 4 4 4 4 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
        . . . . . 7 7 4 4 4 4 4 4 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 .
        . . . . . . 7 7 4 4 4 4 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . .
        . . . . . . . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . . .
        . . . . . . . . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . . . . .
        . . . . . . . . . 7 7 7 7 . . . 7 7 7 7 . . . 7 7 7 7 . . . . .
        . . . . . . . . . 7 7 7 7 . . . 7 7 7 7 . . . 7 7 7 7 . . . . .
        . . . . . . . . 7 7 7 7 7 . . 7 7 7 7 7 . . 7 7 7 7 7 . . . . .
    `
    export const dragonR = flipped(dragonL)

    export const fireball: Image[] = [
        img`
            . . 2 2 2 . . .
            . 2 4 4 4 2 . .
            2 4 5 5 4 4 2 .
            2 4 5 1 5 4 2 2
            2 4 5 5 4 4 2 .
            . 2 4 4 4 2 . .
            . . 2 2 2 . . .
        `,
        img`
            . . 2 2 2 . . .
            . 2 4 4 4 2 2 .
            2 4 5 5 4 4 2 2
            2 4 5 1 5 4 4 2
            2 4 5 5 4 4 2 2
            . 2 4 4 4 2 2 .
            . . 2 2 2 . . .
        `,
    ]

    // ---------- Boss 3 : le Roi des Ombres ----------
    export const shadowKing = img`
        . . . . 5 . . . 5 . . . 5 . . . . .
        . . . . 5 5 . 5 5 5 . 5 5 . . . . .
        . . . . 5 5 5 5 5 5 5 5 5 . . . . .
        . . . . 5 5 5 5 5 5 5 5 5 . . . . .
        . . . c c c c c c c c c c c . . . .
        . . c c c c c c c c c c c c c . . .
        . . c c 2 2 c c c c c 2 2 c c . . .
        . . c c 2 2 c c c c c 2 2 c c . . .
        . . c c c c c c c c c c c c c . . .
        . . . c c c c 1 1 1 c c c c . . . .
        . . . . c c c c c c c c c . . . . .
        . . . c c c c c c c c c c c . . . .
        . . c c c c a a a a a a c c c c . .
        . c c c c c a c c c c a c c c c c .
        . c c c c c a c c c c a c c c c c .
        c c c c c c a a a a a a c c c c c c
        c c c c c c c c c c c c c c c c c c
        c c . c c c c c c c c c c c c . c c
        . . . c c c c c c c c c c c c . . .
        . . . c c c c c c c c c c c c . . .
        . . . . c c c c c c c c c c . . . .
        . . . . c c c c c c c c c . . . . .
        . . . . . c c c c c c c . . . . . .
        . . . . . c c . c c . c c . . . . .
        . . . . . c . . . c . . c . . . . .
    `

    export const shadowBall = img`
        . . c c c c . .
        . c a a a a c .
        c a a c c a a c
        c a c a a c a c
        c a c a a c a c
        c a a c c a a c
        . c a a a a c .
        . . c c c c . .
    `

    // ---------- Objets magiques ----------
    // Potion à effet surprise
    export const potionItem = img`
        . . . . e e . . . .
        . . . . e e . . . .
        . . . e e e e . . .
        . . a a a a a a . .
        . a a 5 5 5 a a a .
        a a a 5 a a 5 a a a
        a a a a a 5 5 a a a
        a a a a a 5 a a a a
        a a a a a a a a a a
        a a a a a 5 a a a a
        . a a a a a a a a .
        . . a a a a a a . .
    `

    // Champignon magique (transforme Lila)
    export const magicMushroom = img`
        . . . . 8 8 8 8 . . . .
        . . 8 8 8 1 8 8 8 8 . .
        . 8 8 1 8 8 8 8 1 8 8 .
        8 8 8 8 8 8 1 8 8 8 8 8
        8 8 1 8 8 8 8 8 8 1 8 8
        8 8 8 8 8 8 8 8 8 8 8 8
        . . . d d d d d d . . .
        . . . d 1 d d 1 d . . .
        . . . d d d d d d . . .
        . . . d d d d d d . . .
        . . . d d d d d d . . .
        . . . d d d d d d . . .
    `

    // Bulle du bouclier (suit Lila)
    export function shieldBubble(): Image {
        const im = image.create(22, 22)
        im.drawCircle(11, 11, 10, 9)
        im.drawCircle(11, 11, 9, 1)
        im.setPixel(6, 5, 1)
        im.setPixel(7, 4, 1)
        im.setPixel(5, 7, 1)
        return im
    }

    // ---------- Les transformations de Lila ----------
    // Toute petite (potion)
    export const tinyFairyR: Image[] = [
        img`
            . . . 5 5 5 . . . .
            . 9 . 5 d d 5 . . .
            9 9 9 d f d f . 5 .
            9 1 9 9 3 3 3 5 1 5
            9 9 9 3 3 3 3 . 5 .
            . 9 9 3 3 1 3 . . .
            9 9 9 . 3 3 3 . . .
            9 1 9 3 3 3 3 3 . .
            . 9 . 3 3 3 3 3 . .
            . . . d d . d d . .
        `,
        img`
            . 9 . 5 5 5 . . . .
            9 9 9 5 d d 5 . . .
            9 1 9 d f d f . 5 .
            9 9 9 9 3 3 3 5 1 5
            . 9 9 3 3 3 3 . 5 .
            . 9 9 3 3 1 3 . . .
            9 9 9 . 3 3 3 . . .
            9 1 9 3 3 3 3 3 . .
            9 9 . 3 3 3 3 3 . .
            . . . d d . d d . .
        `,
    ]
    export const tinyFairyL: Image[] = flipAll(tinyFairyR)

    // Papillon (champignon) : Lila vole !
    export const butterflyR: Image[] = [
        img`
            . . a a a . . . . . . a a a . .
            . a 3 3 3 a . 5 5 . a 3 3 3 a .
            a 3 3 1 3 3 a 5 5 a 3 3 1 3 3 a
            a 3 3 3 3 3 a d d a 3 3 3 3 3 a
            a 3 3 3 3 3 3 f f 3 3 3 3 3 3 a
            . a 3 3 3 3 3 3 3 3 3 3 3 3 a .
            . . a 3 3 3 3 c c 3 3 3 3 a . .
            . . a a 3 3 3 c c 3 3 3 a a . .
            . . a 3 3 3 3 c c 3 3 3 3 a . .
            . a 3 3 3 3 3 c c 3 3 3 3 3 a .
            a 3 3 1 3 3 3 c c 3 3 3 1 3 3 a
            a 3 3 3 3 3 a c c a 3 3 3 3 3 a
            a 3 3 3 3 a . c c . a 3 3 3 3 a
            . a 3 3 a . . c c . . a 3 3 a .
            . . a a . . . . . . . . a a . .
            . . . . . . . . . . . . . . . .
        `,
        img`
            . . . a a a . . . . a a a . . .
            . . a 3 3 3 a 5 5 a 3 3 3 a . .
            . . a 3 1 3 a 5 5 a 3 1 3 a . .
            . . a 3 3 3 a d d a 3 3 3 a . .
            . . a 3 3 3 3 f f 3 3 3 3 a . .
            . . . a 3 3 3 3 3 3 3 3 a . . .
            . . . . a 3 3 c c 3 3 a . . . .
            . . . . a 3 3 c c 3 3 a . . . .
            . . . . a 3 3 c c 3 3 a . . . .
            . . . a 3 3 3 c c 3 3 3 a . . .
            . . a 3 1 3 3 c c 3 3 1 3 a . .
            . . a 3 3 3 a c c a 3 3 3 a . .
            . . a 3 3 a . c c . a 3 3 a . .
            . . . a a . . c c . . a a . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `,
    ]
    export const butterflyL: Image[] = flipAll(butterflyR)

    // Grenouille (champignon) : saute très haut
    export const frogL: Image[] = [
        img`
            . . 7 7 . . . . . . . . 7 7 . .
            . 7 1 f 7 . 5 5 5 5 . 7 1 f 7 .
            . 7 7 7 7 5 5 5 5 5 5 7 7 7 7 .
            . . 7 7 7 7 7 7 7 7 7 7 7 7 . .
            . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 .
            7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
            7 7 f 7 7 7 7 7 7 7 7 7 7 f 7 7
            7 7 7 f f f f f f f f f f 7 7 7
            7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
            . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 .
            . . 7 7 7 7 7 7 7 7 7 7 7 7 . .
            . 7 7 7 7 . 7 7 7 7 . 7 7 7 7 .
            7 7 7 . . . . . . . . . . 7 7 7
            . . . . . . . . . . . . . . . .
        `,
    ]
    export const frogR: Image[] = flipAll(frogL)

    // Lapin (champignon) : court vite
    export const rabbitL: Image[] = [
        img`
            . . 1 1 . . . . . 1 1 . . . . .
            . 1 3 3 1 . . . 1 3 3 1 . . . .
            . 1 3 3 1 . . . 1 3 3 1 . . . .
            . 1 3 3 1 . . . 1 3 3 1 . . . .
            . . 1 1 1 5 5 5 1 1 1 . . . . .
            . . 1 1 1 1 1 1 1 1 1 1 . . . .
            . 1 1 f 1 1 1 1 f 1 1 1 1 . . .
            . 1 1 1 1 1 3 1 1 1 1 1 1 . . .
            . . 1 1 1 1 1 1 1 1 1 1 1 . . .
            . . 1 1 1 1 1 1 1 1 1 1 1 1 . .
            . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 .
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
            . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 .
            . . 1 1 1 . . 1 1 1 . . 1 1 1 .
            . . . . . . . . . . . . . . . .
        `,
        img`
            . 1 1 . . . . . . 1 1 . . . . .
            1 3 3 1 . . . . 1 3 3 1 . . . .
            1 3 3 1 . . . . 1 3 3 1 . . . .
            . 1 1 1 . . . . 1 3 3 1 . . . .
            . . 1 1 1 5 5 5 1 1 1 . . . . .
            . . 1 1 1 1 1 1 1 1 1 1 . . . .
            . 1 1 f 1 1 1 1 f 1 1 1 1 . . .
            . 1 1 1 1 1 3 1 1 1 1 1 1 . . .
            . . 1 1 1 1 1 1 1 1 1 1 1 . . .
            . . 1 1 1 1 1 1 1 1 1 1 1 1 . .
            . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 .
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
            . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 .
            . 1 1 1 . . 1 1 1 . . . 1 1 1 .
            . . . . . . . . . . . . . . . .
        `,
    ]
    export const rabbitR: Image[] = flipAll(rabbitL)

    // ---------- Ennemis des nouveaux mondes (regardent à gauche) ----------
    export const crab: Image[] = [
        img`
            . 2 2 . . . . . . . . . . 2 2 .
            2 2 2 2 . . . . . . . . 2 2 2 2
            . 2 2 . . 2 2 2 2 2 2 . . 2 2 .
            . . 2 . 2 2 1 f 2 2 f 1 2 . 2 .
            . . 2 2 2 2 2 2 2 2 2 2 2 2 2 .
            . . . 2 2 2 2 2 2 2 2 2 2 2 . .
            . . . 2 2 2 2 2 2 2 2 2 2 2 . .
            . . 2 . 2 . 2 . . 2 . 2 . 2 . .
            . 2 . 2 . . . . . . . . 2 . 2 .
            . . . . . . . . . . . . . . . .
        `,
        img`
            . . . . . . . . . . . . . . . .
            . 2 2 . . . . . . . . . . 2 2 .
            2 2 2 2 . 2 2 2 2 2 2 . 2 2 2 2
            . 2 2 . 2 2 1 f 2 2 f 1 2 . 2 .
            . . 2 2 2 2 2 2 2 2 2 2 2 2 2 .
            . . . 2 2 2 2 2 2 2 2 2 2 2 . .
            . . . 2 2 2 2 2 2 2 2 2 2 2 . .
            . . . 2 . 2 . 2 . 2 . 2 . 2 . .
            . . 2 . 2 . . . . . . . 2 . 2 .
            . . . . . . . . . . . . . . . .
        `,
    ]

    export const seagull: Image[] = [
        img`
            1 1 . . . . . . . . . . . . 1 1
            . 1 1 . . . . . . . . . . 1 1 .
            . . 1 1 . . . . . . . . 1 1 . .
            . . . 1 1 1 . 1 1 . 1 1 1 . . .
            . . . . . 1 1 1 1 1 1 . . . . .
            . . . . 4 1 1 f 1 1 1 . . . . .
            . . . . . 1 1 1 1 1 . . . . . .
            . . . . . . . . . . . . . . . .
        `,
        img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . 1 1 1 1 1 1 . . . . .
            . . . . 4 1 1 f 1 1 1 . . . . .
            . . . 1 1 1 1 1 1 1 1 1 1 . . .
            . . 1 1 . . . . . . . . 1 1 . .
            . 1 1 . . . . . . . . . . 1 1 .
            1 1 . . . . . . . . . . . . 1 1
        `,
    ]

    export const snowman: Image[] = [
        img`
            . . . f f f f f f . . .
            . . . f f f f f f . . .
            . f f f f f f f f f f .
            . . . 1 1 1 1 1 1 . . .
            . . 1 1 f 1 1 f 1 1 . .
            . . 1 1 1 1 1 1 1 1 . .
            . . 4 4 4 1 1 1 1 1 . .
            . . . 1 1 1 1 1 1 . . .
            . . . . 2 2 2 2 . . . .
            . . 1 1 1 1 1 1 1 1 . .
            . 1 1 1 1 f 1 1 1 1 1 .
            . 1 1 1 1 1 1 1 1 1 1 .
            1 1 1 1 1 f 1 1 1 1 1 1
            1 1 1 1 1 1 1 1 1 1 1 1
            . 1 1 1 1 f 1 1 1 1 1 .
            . . 1 1 1 1 1 1 1 1 . .
        `,
    ]

    export const owl: Image[] = [
        img`
            1 1 . . . . . . . . . . 1 1
            1 1 1 . . 1 . . 1 . . 1 1 1
            . 1 1 1 1 1 1 1 1 1 1 1 1 .
            . . 1 1 5 f 1 1 f 5 1 1 . .
            . . . 1 1 1 4 1 1 1 1 . . .
            . . . 1 1 1 1 1 1 1 1 . . .
            . . . 1 b 1 1 1 b 1 1 . . .
            . . . 1 1 1 b 1 1 1 1 . . .
            . . . . 1 1 1 1 1 1 . . . .
            . . . . . 1 1 1 1 . . . . .
            . . . . . 4 . . 4 . . . . .
            . . . . . . . . . . . . . .
        `,
        img`
            . . . . . . . . . . . . . .
            . . . . . 1 . . 1 . . . . .
            . . . 1 1 1 1 1 1 1 1 . . .
            . . . 1 5 f 1 1 f 5 1 . . .
            . . . 1 1 1 4 1 1 1 1 . . .
            . 1 1 1 1 1 1 1 1 1 1 1 1 .
            1 1 1 1 b 1 1 1 b 1 1 1 1 1
            1 1 . 1 1 1 b 1 1 1 1 . 1 1
            . . . . 1 1 1 1 1 1 . . . .
            . . . . . 1 1 1 1 . . . . .
            . . . . . 4 . . 4 . . . . .
            . . . . . . . . . . . . . .
        `,
    ]

    export const lavaBlob: Image[] = [
        img`
            . . . . 4 4 4 4 4 . . . . .
            . . 4 4 5 5 4 4 4 4 4 . . .
            . 4 4 5 f 5 4 4 f 4 4 4 . .
            . 4 4 4 4 4 4 4 4 4 4 4 4 .
            4 4 4 4 2 2 4 4 4 4 4 4 4 4
            4 4 4 4 4 4 4 4 4 4 2 4 4 4
            2 4 4 4 4 4 4 4 2 4 4 4 4 2
            2 2 4 4 4 4 4 4 4 4 4 4 2 2
            . 2 2 2 4 4 4 4 4 4 2 2 2 .
            . . 2 2 2 2 2 2 2 2 2 2 . .
        `,
        img`
            . . . . . . . . . . . . . .
            . . . . 4 4 4 4 4 4 . . . .
            . . 4 4 5 5 4 4 4 4 4 4 . .
            . 4 4 5 f 5 4 4 f 4 4 4 4 .
            4 4 4 4 4 4 4 4 4 4 4 4 4 4
            4 4 4 4 2 2 4 4 4 4 2 4 4 4
            2 4 4 4 4 4 4 4 2 4 4 4 4 2
            2 2 4 4 4 4 4 4 4 4 4 4 2 2
            2 2 2 2 4 4 4 4 4 4 2 2 2 2
            . 2 2 2 2 2 2 2 2 2 2 2 2 .
        `,
    ]

    export const fireBird: Image[] = [
        img`
            . . . . . 2 2 . . . . . . . . .
            . . . . 2 4 4 2 . . . . . . 2 2
            . . . 4 4 f 4 4 . . . . 2 2 2 .
            . 5 4 4 4 4 4 4 4 . 2 4 4 2 . .
            . . 4 4 4 4 4 4 4 4 4 4 2 . . .
            . . . 4 4 4 4 4 4 4 4 4 . . . .
            . . 2 2 4 4 4 4 4 4 4 . . . . .
            . 2 2 . 2 2 2 2 2 2 . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `,
        img`
            . . . . . 2 2 . . . . . . . . .
            . . . . 2 4 4 2 . . . . . . . .
            . . . 4 4 f 4 4 . . . . . . . .
            . 5 4 4 4 4 4 4 4 . . . . . . .
            . . 4 4 4 4 4 4 4 4 4 4 2 . . .
            . . . 4 4 4 4 4 4 4 4 4 2 2 . .
            . . 2 2 4 4 4 4 4 4 4 . 2 2 2 .
            . 2 2 . 2 2 2 2 2 2 . . . 2 2 .
            . . . . . . . . . . . . . . 2 2
            . . . . . . . . . . . . . . . .
        `,
    ]

    // ---------- Boss 4 : le Crabe Pirate ----------
    export const pirateCrabL = img`
        . . . . . . . . . f f f f f f f f f f . . . . . . . . .
        . . . . . . . . f f f f f f f f f f f f . . . . . . . .
        . . . . . . . f f f f f f 1 1 f f f f f f . . . . . . .
        . . . . . . f f f f f f 1 f f 1 f f f f f f . . . . . .
        . . . . . f f f f f f f f 1 1 f f f f f f f f . . . . .
        . . . . . f f f f f f f f f f f f f f f f f f . . . . .
        . 2 2 . . . . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 . . . . 2 2 .
        2 2 2 2 . . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 . . 2 2 2 2
        2 2 2 2 2 . 2 2 1 1 f 2 2 2 2 2 2 f 1 1 2 2 . 2 2 2 2 2
        . 2 2 2 2 2 2 2 1 f f 2 2 2 2 2 2 f f 1 2 2 2 2 2 2 2 .
        . . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 . .
        . . . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 . . .
        . . . . 2 2 2 2 2 2 2 f f f f f f 2 2 2 2 2 2 2 . . . .
        . . . . 2 2 2 2 2 2 f f 2 2 2 2 f f 2 2 2 2 2 2 . . . .
        . . . . . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 . . . . .
        . . . . . . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 . . . . . .
        . . . . . 2 2 . 2 2 . 2 2 . . . . 2 2 . 2 2 . 2 2 . . .
        . . . . 2 2 . 2 2 . 2 2 . . . . . . 2 2 . 2 2 . 2 2 . .
        . . . 2 2 . 2 2 . . . . . . . . . . . . 2 2 . . 2 2 . .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . .
    `
    export const pirateCrabR = flipped(pirateCrabL)

    export const coconut = img`
        . . e e e e . .
        . e e e e e e .
        e e f e e e e e
        e e e e e f e e
        e e e f e e e e
        e e e e e e d e
        . e e e e e e .
        . . e e e e . .
    `

    // ---------- Boss 5 : le Yéti Frileux ----------
    export const yeti = img`
        . . . . . . . 1 1 1 1 1 1 1 1 1 1 . . . . . . .
        . . . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . . . .
        . . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . . .
        . . . 1 1 1 1 1 9 9 9 9 9 9 9 9 1 1 1 1 1 . . .
        . . . 1 1 1 9 9 9 9 9 9 9 9 9 9 9 9 1 1 1 . . .
        . . 1 1 1 1 9 9 f f 9 9 9 9 f f 9 9 1 1 1 1 . .
        . . 1 1 1 1 9 9 f f 9 9 9 9 f f 9 9 1 1 1 1 . .
        . . 1 1 1 1 9 9 9 9 9 9 9 9 9 9 9 9 1 1 1 1 . .
        . . 1 1 1 1 9 9 9 9 9 8 8 9 9 9 9 9 1 1 1 1 . .
        . . 1 1 1 1 1 9 9 9 f f f f 9 9 9 1 1 1 1 1 . .
        . . 1 1 1 1 1 1 9 9 9 9 9 9 9 9 1 1 1 1 1 1 . .
        . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 .
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        1 1 1 . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 1 1 1
        1 1 1 . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 1 1 1
        1 1 1 . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 1 1 1
        9 9 9 . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 9 9 9
        9 9 9 . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 9 9 9
        . . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . . .
        . . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . . .
        . . . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . . . .
        . . . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . . . .
        . . . . . 1 1 1 1 1 . . . . 1 1 1 1 1 . . . . .
        . . . . 1 1 1 1 1 1 . . . . 1 1 1 1 1 1 . . . .
        . . . 9 9 9 9 9 9 9 . . . . 9 9 9 9 9 9 9 . . .
        . . . 9 9 9 9 9 9 9 . . . . 9 9 9 9 9 9 9 . . .
    `

    export const snowball = img`
        . . 1 1 1 1 . .
        . 1 1 1 1 1 1 .
        1 1 1 1 1 1 9 1
        1 1 1 1 1 9 1 1
        1 1 1 1 1 1 9 1
        1 9 1 1 1 1 1 1
        . 1 1 9 1 1 1 .
        . . 1 1 1 1 . .
    `

    export const iceShard = img`
        . . . 1 9 9 1 . . .
        . . 1 9 9 9 9 1 . .
        . 1 9 9 9 9 9 9 1 .
        1 9 9 9 9 9 9 9 9 1
        9 9 9 9 9 9 9 9 9 9
        9 9 9 9 9 9 9 9 9 9
    `

    // ---------- Boss 6 : Magma le Golem ----------
    export const golem = img`
        . . . . . . . . . . b b b b b b b b . . . . . . . . . .
        . . . . . . . . . b b b b b b b b b b . . . . . . . . .
        . . . . . . . . b b b c b b b b c b b b . . . . . . . .
        . . . . . . . . b b 5 5 b b b b 5 5 b b . . . . . . . .
        . . . . . . . . b b 5 5 b b b b 5 5 b b . . . . . . . .
        . . . . . . . . b b b b b 4 4 b b b b b . . . . . . . .
        . . . . . . . . . b b b b b b b b b b . . . . . . . . .
        . . . . b b b b b b b b b b b b b b b b b b b b . . . .
        . . b b b b b b b b b b b b b b b b b b b b b b b b . .
        . b b b b b b b b b b 4 b b b b b 4 b b b b b b b b b .
        b b b b c b b b b b 4 4 4 b b b 4 4 4 b b b b b c b b b
        b b b c c b b b b b b 4 b b b b b 4 b b b b b b c c b b
        b b b c c b b b b b b b b b b b b b b b b b b b c c b b
        b b b c c b b b b b b b b b b b b b b b b b b b c c b b
        b b b c c b b b b b b b b b 4 b b b b b b b b b c c b b
        b b b c c b b b b b b b b 4 4 4 b b b b b b b b c c b b
        b b b c c b b b b b b b b b 4 b b b b b b b b b c c b b
        b b b c c b b b b b b b b b b b b b b b b b b b c c b b
        b b b c c b b b b b b b b b b b b b b b b b b b c c b b
        b b b b c b b b b b b b b b b b b b b b b b b b c b b b
        b b b b . b b b b b b b b b b b b b b b b b b b . b b b
        b b b b . b b b b b b b b b b b b b b b b b b b . b b b
        b b b b . . b b b b b b b b b b b b b b b b b . . b b b
        . b b . . . b b b b b b b b b b b b b b b b b . . . b .
        . . . . . . b b b b b b b b b b b b b b b b b . . . . .
        . . . . . . b b b b b b b b . b b b b b b b b . . . . .
        . . . . . . b b b b b b b b . b b b b b b b b . . . . .
        . . . . . b b b b b b b b b . b b b b b b b b b . . . .
        . . . . . b b b b b b b b b . b b b b b b b b b . . . .
        . . . . c c c c c c c c c c . c c c c c c c c c c . . .
    `

    export const lavaRock = img`
        . . . 2 2 2 . . .
        . . 2 4 4 2 2 . .
        . 2 4 5 5 4 2 2 .
        2 4 5 5 4 4 2 2 2
        2 4 5 4 4 4 2 2 2
        2 4 4 4 4 2 2 2 2
        . 2 2 4 2 2 2 2 .
        . . 2 2 2 2 2 . .
        . . . 2 2 2 . . .
    `

    // ---------- Tuiles (16x16) ----------
    const forestTop = img`
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
        7 5 7 7 7 7 5 7 7 7 7 7 5 7 7 7
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
        e e 7 e e e e e 7 e e e e e 7 e
        e e e e e e e e e e e e e e e e
        e e c e e e e e c e e e e e c e
        e e e e e e e e e e e e e e e e
        e c e e e e c e e e e e e c e e
        e e e e e e e e e e e e e e e e
        e e e e c e e e e e c e e e e e
        e e e e e e e e e e e e e e e e
        e e c e e e e e c e e e e e c e
        e e e e e e e e e e e e e e e e
        e c e e e e c e e e e e e c e e
        e e e e e e e e e e e e e e e e
        e e e e c e e e e e c e e e e e
    `
    const forestFill = img`
        e e e e e e e e e e e e e e e e
        e e c e e e e e c e e e e e c e
        e e e e e e e e e e e e e e e e
        e c e e e e c e e e e e e c e e
        e e e e e e e e e e e e e e e e
        e e e e c e e e e e c e e e e e
        e e e e e e e e e e e e e e e e
        e e c e e e e e c e e e e e c e
        e e e e e e e e e e e e e e e e
        e c e e e e c e e e e e e c e e
        e e e e e e e e e e e e e e e e
        e e e e c e e e e e c e e e e e
        e e e e e e e e e e e e e e e e
        e e c e e e e e c e e e e e c e
        e e e e e e e e e e e e e e e e
        e c e e e e c e e e e e e c e e
    `
    const forestPlatform = img`
        . 7 7 . 7 7 7 . . 7 7 7 . 7 7 .
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
        e e e e e e e e e e e e e e e e
        e d e e e e d e e e e d e e e e
        e e e e e e e e e e e e e e e e
        c e e e c e e e c e e e c e e e
        e e e e e e e e e e e e e e e e
        e e e d e e e e e d e e e e d e
        e e e e e e e e e e e e e e e e
        e c e e e c e e e e c e e e e c
        e e e e e e e e e e e e e e e e
        e e e e e e e d e e e e e d e e
        c e e e c e e e e c e e e e e e
        e e e e e e e e e e e e e e e e
        7 e e 7 7 e e 7 7 e e 7 7 e e 7
        . 7 7 . . 7 7 . . 7 7 . . 7 7 .
    `

    const caveTop = img`
        b b b b b b b b b b b b b b b b
        b c c c c b c c c c c b c c c c
        c c c c c c c c c c c c c c c c
        c c b c c c c c b c c c c c b c
        c c c c c c c c c c c c c c c c
        c f c c c c f c c c c c c f c c
        c c c c c c c c c c c c c c c c
        c c c c f c c c c c f c c c c c
        c c c c c c c c c c c c c c c c
        c c b c c c c c b c c c c c b c
        c c c c c c c c c c c c c c c c
        c f c c c c f c c c c c c f c c
        c c c c c c c c c c c c c c c c
        c c c c f c c c c c f c c c c c
        c c c c c c c c c c c c c c c c
        c c c c c c c c c c c c c c c c
    `
    const caveFill = img`
        c c c c c c c c c c c c c c c c
        c c b c c c c c b c c c c c b c
        c c c c c c c c c c c c c c c c
        c f c c c c f c c c c c c f c c
        c c c c c c c c c c c c c c c c
        c c c c f c c c c c f c c c c c
        c c c c c c c c c c c c c c c c
        c c b c c c c c b c c c c c b c
        c c c c c c c c c c c c c c c c
        c f c c c c f c c c c c c f c c
        c c c c c c c c c c c c c c c c
        c c c c f c c c c c f c c c c c
        c c c c c c c c c c c c c c c c
        c c b c c c c c b c c c c c b c
        c c c c c c c c c c c c c c c c
        c f c c c c f c c c c c c f c c
    `
    const cavePlatform = img`
        9 1 9 9 9 1 9 9 9 9 1 9 9 9 1 9
        b b b b b b b b b b b b b b b b
        b c c c c b c c c c c b c c c c
        c c c c c c c c c c c c c c c c
        c c 9 c c c c c 9 c c c c c 9 c
        c c c c c c c c c c c c c c c c
        c 9 c c c c 9 c c c c c c 9 c c
        c c c c c c c c c c c c c c c c
        c c c c 9 c c c c c 9 c c c c c
        c c c c c c c c c c c c c c c c
        c c 9 c c c c c 9 c c c c c 9 c
        c c c c c c c c c c c c c c c c
        c 9 c c c c 9 c c c c c c 9 c c
        c c c c c c c c c c c c c c c c
        b b b b b b b b b b b b b b b b
        9 1 9 9 9 1 9 9 9 9 1 9 9 9 1 9
    `

    const skyTop = img`
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        1 1 9 1 1 1 1 1 9 1 1 1 1 1 9 1
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        9 1 1 1 1 9 1 1 1 1 1 9 1 1 1 1
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        1 1 1 9 1 1 1 1 9 1 1 1 1 1 9 1
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        1 9 1 1 1 1 9 1 1 1 1 9 1 1 1 1
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        1 1 1 1 9 1 1 1 1 9 1 1 1 1 9 1
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        9 1 1 1 1 1 9 1 1 1 1 1 9 1 1 1
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        1 1 9 1 1 1 1 1 9 1 1 1 1 9 1 1
        9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9
    `
    const skyFill = img`
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        1 1 9 1 1 1 1 1 9 1 1 1 1 1 9 1
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        9 1 1 1 1 9 1 1 1 1 1 9 1 1 1 1
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        1 1 1 9 1 1 1 1 9 1 1 1 1 1 9 1
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        1 9 1 1 1 1 9 1 1 1 1 9 1 1 1 1
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        1 1 1 1 9 1 1 1 1 9 1 1 1 1 9 1
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        9 1 1 1 1 1 9 1 1 1 1 1 9 1 1 1
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        1 1 9 1 1 1 1 1 9 1 1 1 1 9 1 1
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        9 1 1 1 1 9 1 1 1 1 9 1 1 1 1 9
    `
    const skyPlatform = img`
        b b b b b b b b b b b b b b b b
        b d d d d d d b d d d d d d d b
        b d d d d d d b d d d d d d d b
        b d d d d d d b d d d d d d d b
        b b b b b b b b b b b b b b b b
        b d d b d d d d d d b d d d d b
        b d d b d d d d d d b d d d d b
        b d d b d d d d d d b d d d d b
        b b b b b b b b b b b b b b b b
        b d d d d d d b d d d d d d d b
        b d d d d d d b d d d d d d d b
        b d d d d d d b d d d d d d d b
        b b b b b b b b b b b b b b b b
        b d d b d d d d d d b d d d d b
        b d d b d d d d d d b d d d d b
        b b b b b b b b b b b b b b b b
    `

    // Dangers au fond des trous : eau, lave, nuage d'orage
    const water = img`
        9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9
        9 1 1 9 9 9 9 9 1 1 9 9 9 9 1 1
        9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9
        8 8 8 9 8 8 8 8 8 8 8 9 8 8 8 8
        8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8
        8 8 8 8 8 8 9 8 8 8 8 8 8 8 8 8
        8 8 8 8 8 8 8 8 8 8 8 8 8 8 9 8
        8 9 8 8 8 8 8 8 8 8 8 8 8 8 8 8
        8 8 8 8 8 8 8 8 8 9 8 8 8 8 8 8
        8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8
        8 8 8 8 9 8 8 8 8 8 8 8 8 8 8 8
        8 8 8 8 8 8 8 8 8 8 8 8 9 8 8 8
        8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8
        8 8 9 8 8 8 8 8 8 8 8 8 8 8 8 8
        8 8 8 8 8 8 8 8 9 8 8 8 8 8 8 8
        8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8
    `
    const lava = img`
        5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
        5 4 4 5 5 5 5 5 4 4 5 5 5 5 4 4
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4
        2 2 2 4 2 2 2 2 2 2 2 4 2 2 2 2
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
        2 2 2 2 2 2 4 2 2 2 2 2 2 2 2 2
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 4 2
        2 4 2 2 2 2 2 2 2 2 2 2 2 2 2 2
        2 2 2 2 2 2 2 2 2 4 2 2 2 2 2 2
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
        2 2 2 2 4 2 2 2 2 2 2 2 2 2 2 2
        2 2 2 2 2 2 2 2 2 2 2 2 4 2 2 2
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
        2 2 4 2 2 2 2 2 2 2 2 2 2 2 2 2
        2 2 2 2 2 2 2 2 4 2 2 2 2 2 2 2
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
    `
    const storm = img`
        c c c c c c c c c c c c c c c c
        c c f c c c c c c f c c c c c c
        c c c c c c 5 c c c c c c f c c
        c c c c c 5 5 c c c c c c c c c
        c f c c c 5 c c c c c c c c c c
        c c c c 5 5 c c c c c f c c c c
        c c c c 5 c c c c c c c c c c c
        c c c 5 5 c c c c c c c c c c c
        c c c c c c c c c c c c f c c c
        c c c c c c c c c c 5 c c c c c
        c f c c c c c c c 5 5 c c c c c
        c c c c c c c c c 5 c c c c c c
        c c c c c c c c 5 5 c c c c c c
        c c c c f c c c 5 c c c c f c c
        c c c c c c c 5 5 c c c c c c c
        c c c c c c c c c c c c c c c c
    `

    // Piques (même dessin pour tous les mondes) : posés sur le sol,
    // le fond reste visible au-dessus
    function makeSpikes(): Image {
        const im = image.create(16, 16)
        for (let i = 0; i < 3; i++) {
            const x0 = i * 5
            // contour noir pour rester visible sur tous les fonds
            im.fillTriangle(x0, 15, x0 + 6, 15, x0 + 3, 4, 15)
            im.fillTriangle(x0 + 1, 15, x0 + 5, 15, x0 + 3, 6, 11)
            im.fillTriangle(x0 + 2, 15, x0 + 4, 15, x0 + 3, 8, 1)
        }
        im.fillRect(0, 14, 16, 2, 15)
        return im
    }
    const spikes = makeSpikes()

    // Tuiles générées : sol (dessus / dessous) et plateforme des nouveaux mondes
    function groundTile(
        top: number,
        topAccent: number,
        fill: number,
        dot: number,
        withTop: boolean,
    ): Image {
        const im = image.create(16, 16)
        im.fill(fill)
        for (let y = 0; y < 16; y++) {
            for (let x = 0; x < 16; x++) {
                if ((x * 7 + y * 5) % 13 === 0) im.setPixel(x, y, dot)
            }
        }
        if (withTop) {
            im.fillRect(0, 0, 16, 3, top)
            for (let x = 0; x < 16; x += 4) im.setPixel(x, 3, top)
            for (let x = 2; x < 16; x += 6) im.setPixel(x, 1, topAccent)
        }
        return im
    }

    function platformTile(main: number, edge: number, accent: number): Image {
        const im = image.create(16, 16)
        im.fill(main)
        for (let y = 0; y < 16; y++) {
            for (let x = 0; x < 16; x++) {
                if ((x * 3 + y * 7) % 11 === 0) im.setPixel(x, y, accent)
            }
        }
        im.fillRect(0, 0, 16, 2, accent)
        im.fillRect(0, 14, 16, 2, edge)
        im.fillRect(0, 0, 1, 16, edge)
        im.fillRect(15, 0, 1, 16, edge)
        return im
    }

    // Plage : sable et planches de bois
    const sandTop = groundTile(5, 1, 13, 14, true)
    const sandFill = groundTile(5, 1, 13, 14, false)
    const plankPlatform = platformTile(14, 12, 13)
    // Glace : glace bleue et neige
    const iceTop = groundTile(1, 9, 9, 1, true)
    const iceFill = groundTile(1, 9, 9, 1, false)
    const snowPlatform = platformTile(1, 9, 9)
    // Volcan : roche noire veinée de lave, obsidienne
    const rockTop = groundTile(11, 12, 15, 4, true)
    const rockFill = groundTile(11, 12, 15, 4, false)
    const obsidianPlatform = platformTile(15, 11, 4)

    export const THEME_FOREST = 0
    export const THEME_CAVE = 1
    export const THEME_SKY = 2
    export const THEME_BEACH = 3
    export const THEME_ICE = 4
    export const THEME_VOLCANO = 5

    // Index des tuiles : 0 vide, 1 sol (dessus), 2 sol (dessous),
    // 3 plateforme, 4 danger (eau / lave / orage), 5 piques
    export function tileset(theme: number): Image[] {
        const empty = image.create(16, 16)
        if (theme === THEME_CAVE)
            return [empty, caveTop, caveFill, cavePlatform, lava, spikes]
        if (theme === THEME_SKY)
            return [empty, skyTop, skyFill, skyPlatform, storm, spikes]
        if (theme === THEME_BEACH)
            return [empty, sandTop, sandFill, plankPlatform, water, spikes]
        if (theme === THEME_ICE)
            return [empty, iceTop, iceFill, snowPlatform, water, spikes]
        if (theme === THEME_VOLCANO)
            return [empty, rockTop, rockFill, obsidianPlatform, lava, spikes]
        return [empty, forestTop, forestFill, forestPlatform, water, spikes]
    }

    // ---------- Décors de fond (160x120) ----------
    function forestBackground(): Image {
        const bg = image.create(160, 120)
        bg.fill(9)
        // soleil
        bg.fillCircle(132, 22, 11, 5)
        bg.fillCircle(132, 22, 8, 1)
        // nuages
        bg.fillCircle(30, 30, 7, 1)
        bg.fillCircle(40, 27, 9, 1)
        bg.fillCircle(50, 31, 6, 1)
        bg.fillCircle(92, 50, 5, 1)
        bg.fillCircle(100, 47, 7, 1)
        bg.fillCircle(108, 51, 4, 1)
        // collines lointaines
        bg.fillCircle(20, 135, 55, 6)
        bg.fillCircle(85, 145, 65, 6)
        bg.fillCircle(150, 132, 50, 6)
        bg.fillRect(0, 100, 160, 20, 6)
        // sapins
        for (let x = 6; x < 160; x += 20) {
            const top = 70 + ((x * 7) % 16)
            bg.fillTriangle(x, top, x - 7, 102, x + 7, 102, 7)
            bg.fillTriangle(x, top - 10, x - 5, top + 6, x + 5, top + 6, 7)
        }
        return bg
    }

    function caveBackground(): Image {
        const bg = image.create(160, 120)
        bg.fill(15)
        // stalactites
        for (let x = 4; x < 160; x += 18) {
            const h = 8 + ((x * 5) % 12)
            bg.fillTriangle(x, 0, x + 8, 0, x + 4, h, 12)
        }
        // petits cristaux qui brillent
        for (let i = 0; i < 18; i++) {
            const x = (i * 37 + 11) % 160
            const y = 20 + ((i * 53 + 7) % 90)
            bg.setPixel(x, y, 9)
            bg.setPixel(x + 1, y, 1)
        }
        // rochers au fond
        bg.fillCircle(30, 125, 30, 12)
        bg.fillCircle(120, 130, 40, 12)
        return bg
    }

    function nightBackground(): Image {
        const bg = image.create(160, 120)
        bg.fill(8)
        // lune
        bg.fillCircle(128, 26, 13, 13)
        bg.fillCircle(128, 26, 11, 1)
        bg.fillCircle(134, 22, 9, 8)
        // nuages sombres
        bg.fillCircle(25, 60, 8, 12)
        bg.fillCircle(36, 57, 10, 12)
        bg.fillCircle(48, 61, 7, 12)
        bg.fillCircle(90, 85, 7, 12)
        bg.fillCircle(100, 82, 9, 12)
        bg.fillCircle(110, 86, 6, 12)
        // château lointain
        bg.fillRect(60, 40, 6, 30, 12)
        bg.fillRect(74, 34, 8, 36, 12)
        bg.fillRect(90, 42, 6, 28, 12)
        bg.fillRect(60, 60, 36, 12, 12)
        bg.fillTriangle(63, 40, 57, 40, 63, 32, 12)
        bg.fillTriangle(78, 34, 70, 34, 78, 24, 12)
        bg.fillTriangle(93, 42, 87, 42, 93, 34, 12)
        return bg
    }

    function beachBackground(): Image {
        const bg = image.create(160, 120)
        bg.fill(9)
        // soleil
        bg.fillCircle(30, 24, 12, 5)
        bg.fillCircle(30, 24, 9, 1)
        // nuages
        bg.fillCircle(100, 28, 6, 1)
        bg.fillCircle(110, 25, 8, 1)
        bg.fillCircle(120, 29, 5, 1)
        // la mer
        bg.fillRect(0, 66, 160, 54, 8)
        bg.fillRect(0, 66, 160, 2, 9)
        for (let i = 0; i < 20; i++) {
            const x = (i * 43 + 5) % 160
            const y = 72 + ((i * 29) % 44)
            bg.fillRect(x, y, 5, 1, 9)
        }
        // bateau pirate au loin
        bg.fillRect(122, 60, 26, 7, 14)
        bg.fillRect(134, 44, 1, 16, 15)
        bg.fillTriangle(135, 45, 145, 52, 135, 58, 1)
        bg.fillRect(130, 42, 6, 3, 15)
        // palmiers
        for (let x = 20; x < 100; x += 36) {
            bg.fillRect(x, 40, 3, 28, 14)
            bg.fillCircle(x - 6, 40, 5, 7)
            bg.fillCircle(x + 8, 40, 5, 7)
            bg.fillCircle(x + 1, 35, 5, 7)
        }
        return bg
    }

    function iceBackground(): Image {
        const bg = image.create(160, 120)
        bg.fill(11)
        // montagnes enneigées
        bg.fillTriangle(0, 110, 40, 30, 80, 110, 1)
        bg.fillTriangle(50, 110, 105, 20, 160, 110, 1)
        bg.fillTriangle(120, 110, 150, 55, 180, 110, 1)
        bg.fillTriangle(0, 110, 40, 30, 20, 110, 13)
        bg.fillTriangle(50, 110, 105, 20, 80, 110, 13)
        bg.fillRect(0, 108, 160, 12, 1)
        // sapins givrés
        for (let x = 12; x < 160; x += 30) {
            bg.fillTriangle(x, 86, x - 6, 108, x + 6, 108, 6)
            bg.fillTriangle(x, 78, x - 4, 94, x + 4, 94, 6)
        }
        // flocons
        for (let i = 0; i < 30; i++) {
            const x = (i * 53 + 7) % 160
            const y = (i * 37 + 3) % 100
            bg.setPixel(x, y, 1)
        }
        return bg
    }

    function volcanoBackground(): Image {
        const bg = image.create(160, 120)
        bg.fill(12)
        // lueur de la lave
        bg.fillRect(0, 84, 160, 36, 2)
        bg.fillRect(0, 100, 160, 20, 4)
        // le volcan (brun) et sa coulée de lave
        bg.fillTriangle(30, 100, 80, 20, 130, 100, 14)
        bg.fillRect(70, 14, 20, 8, 14)
        bg.fillRect(74, 12, 12, 4, 2)
        bg.fillRect(78, 8, 4, 5, 4)
        bg.fillRect(78, 22, 4, 40, 2)
        bg.fillRect(76, 40, 3, 30, 4)
        // fumée
        bg.fillCircle(84, 6, 5, 11)
        bg.fillCircle(94, 4, 4, 11)
        // étincelles et cendres
        for (let i = 0; i < 24; i++) {
            const x = (i * 47 + 13) % 160
            const y = (i * 31 + 5) % 78
            bg.setPixel(x, y, i % 3 === 0 ? 5 : 4)
        }
        return bg
    }

    export function background(theme: number): Image {
        if (theme === THEME_CAVE) return caveBackground()
        if (theme === THEME_SKY) return nightBackground()
        if (theme === THEME_BEACH) return beachBackground()
        if (theme === THEME_ICE) return iceBackground()
        if (theme === THEME_VOLCANO) return volcanoBackground()
        return forestBackground()
    }

    // Ennemis selon le thème
    export function walkerFrames(theme: number): Image[] {
        if (theme === THEME_CAVE) return [mushroom]
        if (theme === THEME_SKY) return [gargoyle]
        if (theme === THEME_BEACH) return crab
        if (theme === THEME_ICE) return snowman
        if (theme === THEME_VOLCANO) return lavaBlob
        return [toad]
    }

    export function flyerFrames(theme: number): Image[] {
        if (theme === THEME_SKY) return ghost
        if (theme === THEME_BEACH) return seagull
        if (theme === THEME_ICE) return owl
        if (theme === THEME_VOLCANO) return fireBird
        return bat
    }
}
