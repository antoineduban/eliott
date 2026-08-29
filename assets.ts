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

    export const THEME_FOREST = 0
    export const THEME_CAVE = 1
    export const THEME_SKY = 2

    // Index des tuiles : 0 vide, 1 sol (dessus), 2 sol (dessous),
    // 3 plateforme, 4 danger (eau / lave / orage)
    export function tileset(theme: number): Image[] {
        const empty = image.create(16, 16)
        if (theme === THEME_CAVE)
            return [empty, caveTop, caveFill, cavePlatform, lava]
        if (theme === THEME_SKY)
            return [empty, skyTop, skyFill, skyPlatform, storm]
        return [empty, forestTop, forestFill, forestPlatform, water]
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

    export function background(theme: number): Image {
        if (theme === THEME_CAVE) return caveBackground()
        if (theme === THEME_SKY) return nightBackground()
        return forestBackground()
    }

    // Ennemis selon le thème
    export function walkerFrames(theme: number): Image[] {
        if (theme === THEME_CAVE) return [mushroom]
        if (theme === THEME_SKY) return [gargoyle]
        return [toad]
    }

    export function flyerFrames(theme: number): Image[] {
        if (theme === THEME_SKY) return ghost
        return bat
    }
}
