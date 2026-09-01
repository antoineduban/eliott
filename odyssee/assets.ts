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

    // ---------- Ulysse (regarde à droite, arc à la main) ----------
    export const ulysseR: Image[] = [
        img`
            . . . 2 2 2 . . . . . . . . . .
            . . 2 2 2 2 . . . . . . . . . .
            . . 4 4 4 4 4 . . . . . . . . .
            . 4 4 4 4 4 4 4 . . . . . . . .
            . 4 4 d d d d 4 . . . . e e . .
            . . d d f d f d . . . e e 1 . .
            . . d d d d d d . . e e . 1 . .
            . . . e e e e . . . e e . 1 . .
            . . 8 1 1 1 1 8 . . e e . 1 . .
            . 8 1 1 1 1 1 1 8 . e e . 1 . .
            . d 1 1 1 1 1 1 d d e e . 1 . .
            . . 1 1 1 1 1 1 . . e e . 1 . .
            . . 8 1 1 1 1 8 . . e e . 1 . .
            . . d d . . d d . . . e e 1 . .
            . . e e . . e e . . . . e e . .
            . . . . . . . . . . . . . . . .
        `,
        img`
            . . . 2 2 2 . . . . . . . . . .
            . . 2 2 2 2 . . . . . . . . . .
            . . 4 4 4 4 4 . . . . . . . . .
            . 4 4 4 4 4 4 4 . . . . . . . .
            . 4 4 d d d d 4 . . . . e e . .
            . . d d f d f d . . . e e 1 . .
            . . d d d d d d . . e e . 1 . .
            . . . e e e e . . . e e . 1 . .
            . . 8 1 1 1 1 8 . . e e . 1 . .
            . 8 1 1 1 1 1 1 8 . e e . 1 . .
            . d 1 1 1 1 1 1 d d e e . 1 . .
            . . 1 1 1 1 1 1 . . e e . 1 . .
            . . 8 1 1 1 1 8 . . e e . 1 . .
            . . . d d d d . . . . e e 1 . .
            . . e e . . e e . . . . e e . .
            . . . . . . . . . . . . . . . .
        `,
    ]
    export const ulysseL: Image[] = flipAll(ulysseR)

    // ---------- Flèche d'Ulysse ----------
    export const arrowR = img`
        . . . . . . . . . 1 .
        2 . . . . . . . 1 1 1
        2 2 e e e e e e e 1 1
        2 . . . . . . . 1 1 1
        . . . . . . . . . 1 .
    `
    export const arrowL = flipped(arrowR)

    // ---------- Objets ----------
    // Pièce d'or (le trésor à ramasser)
    export const coin = img`
        . . 5 5 5 5 . .
        . 5 5 5 5 5 5 .
        5 5 1 5 5 5 5 5
        5 1 5 5 5 5 4 5
        5 5 5 5 5 5 4 5
        5 5 5 5 5 4 4 5
        . 5 5 4 4 4 5 .
        . . 5 5 5 5 . .
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

    // Le navire d'Ulysse (la fin du niveau : on embarque !)
    export const ship = img`
        . . . . . . . . . . . . e 8 8 8 . . . . . . . . . .
        . . . . . . . . . . . . e 8 8 . . . . . . . . . . .
        . . . . . . . . . . . . e . . . . . . . . . . . . .
        . . . 1 1 1 1 1 1 1 1 1 e 1 1 1 1 1 1 1 1 1 . . . .
        . . . 1 1 1 1 1 1 1 1 1 e 1 1 1 1 1 1 1 1 1 . . . .
        . . . 1 1 1 1 1 1 1 1 1 e 1 1 1 1 1 1 1 1 1 . . . .
        . . . 1 1 1 1 1 1 1 1 1 e 1 1 1 1 1 1 1 1 1 . . . .
        . . . 2 2 2 2 2 2 2 2 2 e 2 2 2 2 2 2 2 2 2 . . . .
        . . . 2 2 2 2 2 2 2 2 2 e 2 2 2 2 2 2 2 2 2 . . . .
        . . . 1 1 1 1 1 1 1 1 1 e 1 1 1 1 1 1 1 1 1 . . . .
        . . . 1 1 1 1 1 1 1 1 1 e 1 1 1 1 1 1 1 1 1 . . . .
        . . . 1 1 1 1 1 1 1 1 1 e 1 1 1 1 1 1 1 1 1 . . . .
        . . . 1 1 1 1 1 1 1 1 1 e 1 1 1 1 1 1 1 1 1 . . . .
        . . . . . . . . . . . . e . . . . . . . . . . . . .
        . . . . . . . . . . . . e . . . . . . . . . . . . .
        . e e e e e e e e e e e e e e e e e e e e e e e e .
        e e d d e e d d e e d d e e d d e e d d e e d d e e
        e e e e e e e e e e e e e e e e e e e e 1 1 e e e .
        . e e e e e e e e e e e e e e e e e e e 1 f 1 e e .
        . . e e e e e e e e e e e e e e e e e e e e e e . .
        . . . e e e e e e e e e e e e e e e e e e e . . . .
        . . . . e e e e e e e e e e e e e e e e . . . . . .
    `

    // Amphore magique (effet surprise des dieux)
    export const potionItem = img`
        . . . 4 4 4 4 . . .
        . . . . 4 4 . . . .
        . e 4 4 4 4 4 4 e .
        . e . 4 4 4 4 . e .
        . e 4 4 4 4 4 4 e .
        . 4 4 f 4 4 f 4 4 .
        . 4 4 4 f f 4 4 4 .
        . 4 4 f 4 4 f 4 4 .
        . 4 4 4 4 4 4 4 4 .
        . . 4 4 4 4 4 4 . .
        . . . 4 4 4 4 . . .
        . . . . 4 4 . . . .
        . . . 4 4 4 4 . . .
    `

    // Fleur de lotus (transforme Ulysse)
    export const lotusFlower = img`
        . . 3 . . 3 3 . . 3 . .
        . 3 3 3 . 3 3 . 3 3 3 .
        . 3 3 3 3 3 3 3 3 3 3 .
        . . 3 3 1 5 5 1 3 3 . .
        . . 3 3 5 5 5 5 3 3 . .
        . . . 3 3 3 3 3 3 . . .
        . . 7 7 7 7 7 7 7 7 . .
        . 7 7 7 7 7 7 7 7 7 7 .
        . 7 7 7 7 7 7 7 7 7 7 .
        . . 7 7 . . . . 7 7 . .
    `

    // Bouclier d'Athéna (la bulle dorée qui protège d'un coup)
    export function shieldBubble(): Image {
        const im = image.create(22, 22)
        im.drawCircle(11, 11, 10, 4)
        im.drawCircle(11, 11, 9, 5)
        im.setPixel(6, 5, 1)
        im.setPixel(7, 4, 1)
        im.setPixel(5, 7, 1)
        return im
    }

    // ---------- Les transformations d'Ulysse ----------
    // Tout petit (amphore)
    export const tinyUlysseR: Image[] = [
        img`
            . . 2 2 . . . .
            . 4 4 4 4 . . .
            . 4 d d 4 . e .
            . d f d f e e 1
            . . e e e . e 1
            . 8 1 1 8 . e 1
            . . 1 1 1 e e 1
            . . 8 1 8 . e .
            . . d . d . . .
            . . e . e . . .
        `,
        img`
            . . 2 2 . . . .
            . 4 4 4 4 . . .
            . 4 d d 4 . e .
            . d f d f e e 1
            . . e e e . e 1
            . 8 1 1 8 . e 1
            . . 1 1 1 e e 1
            . . 8 1 8 . e .
            . . d d d . . .
            . . e . e . . .
        `,
    ]
    export const tinyUlysseL: Image[] = flipAll(tinyUlysseR)

    // Aigle de Zeus (lotus) : Ulysse vole !
    export const eagleR: Image[] = [
        img`
            . . e e . . . . . . e e . . . .
            . e e e e . . . . e e e e . . .
            . e e e e e . . e e e e . . . .
            . . e e e e e e e e e e . . . .
            . . . e e e e e e e e 1 1 . . .
            . . . . e e e e e e 1 1 4 4 . .
            . . . . . e e e e e 1 f 1 . . .
            . . . . . . e e e e 1 1 . . . .
            . . . . . e e . e e . . . . . .
            . . . . . 4 . . . 4 . . . . . .
        `,
        img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . 1 1 . . .
            . . . e e e e e e e 1 1 4 4 . .
            . . e e e e e e e e 1 f 1 . . .
            . e e e e e e e e e 1 1 . . . .
            . e e . . e e e e e . . . . . .
            . e . . e e . e e e . . . . . .
            . . . e e . . . e e . . . . . .
            . . e e . . . . 4 4 . . . . . .
            . . . . . . . . . . . . . . . .
        `,
    ]
    export const eagleL: Image[] = flipAll(eagleR)

    // Satyre (lotus) : saute très haut
    export const satyrR: Image[] = [
        img`
            . . e . . . e . . . . . . .
            . e e . . . e e . . . . . .
            . . e e e e e . . . . . . .
            . . e d d d e . . . . . . .
            . . d f d f d . . . . . . .
            . . d d d d d . . . . . . .
            . . . d d d . . . . . . . .
            . . d d d d d d . . . . . .
            . d d d d d d d d . . . . .
            . . . e e e e . . . . . . .
            . . e e e e e e . . . . . .
            . . e e . . e e . . . . . .
            . . e e . . e e . . . . . .
            . . f f . . f f . . . . . .
        `,
        img`
            . . e . . . e . . . . . . .
            . e e . . . e e . . . . . .
            . . e e e e e . . . . . . .
            . . e d d d e . . . . . . .
            . . d f d f d . . . . . . .
            . . d d d d d . . . . . . .
            . . . d d d . . . . . . . .
            . . d d d d d d . . . . . .
            . d d d d d d d d . . . . .
            . . . e e e e . . . . . . .
            . . e e e e e e . . . . . .
            . . e e e e e e . . . . . .
            . . . e e e e . . . . . . .
            . . . f f f f . . . . . . .
        `,
    ]
    export const satyrL: Image[] = flipAll(satyrR)

    // Centaure (lotus) : court très vite
    export const centaurR: Image[] = [
        img`
            . . . . . . . . . . e e e . . .
            . . . . . . . . . e d d d . . .
            . . . . . . . . . d f d f . . .
            . . . . . . . . . d d d d . . .
            . . . . . . . . 1 1 1 1 . . . .
            . . . . . . . . 1 1 1 d d . . .
            . e e e e e e e 1 1 1 . . . . .
            e e e e e e e e e e . . . . . .
            e e e e e e e e e e . . . . . .
            e e e e e e e e e e . . . . . .
            . e e . . e e . e e . . . . . .
            . e e . . e e . e e . . . . . .
            . f f . . f f . f f . . . . . .
            . . . . . . . . . . . . . . . .
        `,
        img`
            . . . . . . . . . . e e e . . .
            . . . . . . . . . e d d d . . .
            . . . . . . . . . d f d f . . .
            . . . . . . . . . d d d d . . .
            . . . . . . . . 1 1 1 1 . . . .
            . . . . . . . . 1 1 1 d d . . .
            . e e e e e e e 1 1 1 . . . . .
            e e e e e e e e e e . . . . . .
            e e e e e e e e e e . . . . . .
            e e e e e e e e e e . . . . . .
            . . e e . e e . . e e . . . . .
            . e e . . . e e . . e e . . . .
            . f f . . . f f . . f f . . . .
            . . . . . . . . . . . . . . . .
        `,
    ]
    export const centaurL: Image[] = flipAll(centaurR)

    // ---------- Ennemis qui marchent (regardent à gauche) ----------
    // Sanglier (île du Cyclope)
    export const boar: Image[] = [
        img`
            . . . . . . . . f f f . . . .
            . . . . . f f f e e e f f . .
            . f f f f e e e e e e e f . .
            f e e e e e e e e e e e e f .
            f f e e e e e e e e e e e e f
            1 f e e f e e e e e e e e e f
            . f e e e e e e e e e e e e f
            . . f e e e e e e e e e e f .
            . . . e e . e e . e e . e e .
            . . . f f . f f . f f . f f .
        `,
        img`
            . . . . . . . . f f f . . . .
            . . . . . f f f e e e f f . .
            . f f f f e e e e e e e f . .
            f e e e e e e e e e e e e f .
            f f e e e e e e e e e e e e f
            1 f e e f e e e e e e e e e f
            . f e e e e e e e e e e e e f
            . . f e e e e e e e e e e f .
            . . e e . e e . e e . e e . .
            . . f f . f f . f f . f f . .
        `,
    ]

    // Mouton-nuage (île d'Éole)
    export const cloudSheep: Image[] = [
        img`
            . . . 1 1 1 . 1 1 1 . . .
            . f f 1 1 1 1 1 1 1 1 1 .
            f f f f 1 1 1 1 1 1 1 1 1
            f f f f 1 1 1 1 1 1 1 1 1
            . f f 1 1 1 1 1 1 1 1 1 1
            . . 1 1 1 1 1 1 1 1 1 1 .
            . . . 1 1 1 1 1 1 1 1 . .
            . . . d d . . . d d . . .
            . . . d d . . . d d . . .
            . . . f f . . . f f . . .
        `,
        img`
            . . . 1 1 1 . 1 1 1 . . .
            . f f 1 1 1 1 1 1 1 1 1 .
            f f f f 1 1 1 1 1 1 1 1 1
            f f f f 1 1 1 1 1 1 1 1 1
            . f f 1 1 1 1 1 1 1 1 1 1
            . . 1 1 1 1 1 1 1 1 1 1 .
            . . . 1 1 1 1 1 1 1 1 . .
            . . d d . . . . . d d . .
            . . d d . . . . . d d . .
            . . f f . . . . . f f . .
        `,
    ]

    // Cochon ensorcelé (île de Circé : c'est un marin transformé !)
    export const pig: Image[] = [
        img`
            . . . 3 . . . . . . 3 . . .
            . . 3 3 . . . . . . 3 3 . .
            . . 3 3 3 3 3 3 3 3 3 3 . .
            . 3 3 3 3 3 3 3 3 3 3 3 3 .
            3 3 f 3 3 3 3 3 3 3 f 3 3 3
            3 3 3 3 3 3 3 3 3 3 3 3 3 2
            3 2 3 3 3 3 3 3 3 3 3 3 2 .
            3 2 3 3 3 3 3 3 3 3 3 3 . .
            . 3 3 3 3 3 3 3 3 3 3 3 . .
            . . 3 3 . 3 3 . 3 3 . 3 3 .
        `,
        img`
            . . . 3 . . . . . . 3 . . .
            . . 3 3 . . . . . . 3 3 . .
            . . 3 3 3 3 3 3 3 3 3 3 . .
            . 3 3 3 3 3 3 3 3 3 3 3 3 .
            3 3 f 3 3 3 3 3 3 3 f 3 3 3
            3 3 3 3 3 3 3 3 3 3 3 3 3 2
            3 2 3 3 3 3 3 3 3 3 3 3 2 .
            3 2 3 3 3 3 3 3 3 3 3 3 . .
            . 3 3 3 3 3 3 3 3 3 3 3 . .
            . 3 3 . 3 3 . 3 3 . 3 3 . .
        `,
    ]

    // Crabe géant (la mer des Sirènes)
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

    // Statue vivante (la montagne des Titans)
    export const livingStatue: Image[] = [
        img`
            . . . b b b b b b . . . .
            . . b b b b b b b b . . .
            . . b 5 5 b b 5 5 b . . .
            . . b b b b b b b b . . .
            . . b b c c c c b b . . .
            . . . b b b b b b . . . .
            . b b b b b b b b b b . .
            b b b b b b b b b b b b .
            b b . b b b b b b . b b .
            c c . b b b b b b . c c .
            . . . b b b b b b . . . .
            . . . b b b . b b b . . .
            . . . b b b . b b b . . .
            . . c c c c . c c c c . .
        `,
    ]

    // Serpent de mer (la tempête de Poséidon)
    export const seaSerpent: Image[] = [
        img`
            . . 7 7 7 . . . . . . . . . . .
            . 7 7 7 7 7 . . 7 7 7 . . . . .
            2 7 f 7 7 7 7 7 7 7 7 7 . 7 7 .
            2 . 7 7 6 7 7 7 7 6 7 7 7 7 7 7
            . . 7 7 6 6 7 7 6 6 7 7 7 7 7 7
            . . 7 7 7 7 7 7 7 7 7 7 6 7 7 .
            . . . 7 7 7 . . . 7 7 7 7 7 . .
            . . . . . . . . . . 7 7 7 . . .
        `,
        img`
            . . 7 7 7 . . . . . . . . . . .
            . 7 7 7 7 7 . 7 7 7 7 . . . . .
            2 7 f 7 7 7 7 7 7 7 7 7 7 . . .
            2 . 7 7 6 7 7 7 6 7 7 7 7 7 7 .
            . . 7 7 6 6 7 6 6 7 7 7 7 7 7 7
            . . 7 7 7 7 7 7 7 7 7 6 7 7 7 7
            . . . 7 7 7 . . 7 7 7 7 7 7 7 .
            . . . . . . . . . 7 7 7 7 . . .
        `,
    ]

    // ---------- Ennemis qui volent (regardent à gauche) ----------
    // Mouette (île du Cyclope)
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

    // Harpie (île d'Éole)
    export const harpy: Image[] = [
        img`
            4 4 . . . . . . . . . . . . 4 4
            4 4 4 . . . . f f . . . . 4 4 4
            . 4 4 4 . . f f f f . . 4 4 4 .
            . 4 4 4 4 4 d f f d 4 4 4 4 4 .
            . . 4 4 4 4 d d d d 4 4 4 4 . .
            . . . 4 4 4 e e e e 4 4 4 . . .
            . . . . . e e e e e e . . . . .
            . . . . . . e e e e . . . . . .
            . . . . . . 4 . . 4 . . . . . .
        `,
        img`
            . . . . . . . f f . . . . . . .
            . . . . . . f f f f . . . . . .
            . . . 4 4 4 d f f d 4 4 4 . . .
            . . 4 4 4 4 d d d d 4 4 4 4 . .
            . 4 4 4 4 4 e e e e 4 4 4 4 4 .
            4 4 4 . . e e e e e e . . 4 4 4
            4 4 . . . . e e e e . . . . 4 4
            . . . . . . 4 . . 4 . . . . . .
            . . . . . . . . . . . . . . . .
        `,
    ]

    // Corbeau (île de Circé)
    export const crow: Image[] = [
        img`
            c c . . . . . . . . . . c c
            c c c . . . . c c . . c c c
            . c c c . . c c c c c c c .
            . . c c c c c 1 c c c c . .
            . . . 4 c c c c c c c . . .
            . . . . c c c c c c . . . .
            . . . . . c c c c . . . . .
            . . . . . . c c . . . . . .
        `,
        img`
            . . . . . . c c . . . . . .
            . . . . . c c c c . . . . .
            . . c c c c 1 c c c c . . .
            . 4 c c c c c c c c c c . .
            c c c . c c c c c c . c c c
            c c . . . c c c c . . . c c
            . . . . . . c c . . . . . .
            . . . . . . . . . . . . . .
        `,
    ]

    // Poisson volant (la mer des Sirènes)
    export const flyingFish: Image[] = [
        img`
            . . . . 6 6 . . . . . . . .
            . . . . 6 6 6 . . . . . . .
            9 9 9 9 6 6 6 9 9 9 . . 9 .
            9 f 9 9 9 9 9 9 9 9 9 9 9 .
            9 9 9 9 9 9 9 9 9 9 9 9 9 9
            . 9 9 9 9 9 9 9 9 9 . . 9 .
            . . . 6 6 6 . . . . . . . .
            . . . . 6 6 . . . . . . . .
        `,
        img`
            . . . . . . . . . . . . . .
            . . . 6 6 6 . . . . . . . .
            9 9 9 9 6 6 9 9 9 9 . . 9 .
            9 f 9 9 9 9 9 9 9 9 9 9 9 .
            9 9 9 9 9 9 9 9 9 9 9 9 9 9
            . 9 9 9 6 6 6 9 9 9 . . 9 .
            . . . . 6 6 6 . . . . . . .
            . . . . . 6 . . . . . . . .
        `,
    ]

    // Aigle noir (la montagne des Titans)
    export const blackEagle: Image[] = [
        img`
            c c . . . . . . . . . . . . c c
            c c c c . . . . . . . . c c c c
            . c c c c . . c c . . c c c c .
            . . c c c c c c c c c c c c . .
            . . . . c c c c c c c c . . . .
            . . . 4 c c 5 c c c c . . . . .
            . . . . c c c c c c . . . . . .
            . . . . . . c c c . . . . . . .
        `,
        img`
            . . . . . . . c c . . . . . . .
            . . . . . c c c c c . . . . . .
            . . . c c c c c c c c c . . . .
            . . 4 c c 5 c c c c c c c c . .
            . c c c c c c c c c c c c c c .
            c c c c . . c c c c . . c c c c
            c c . . . . . c c . . . . . c c
            . . . . . . . . . . . . . . . .
        `,
    ]

    // Nuage d'orage (la tempête de Poséidon)
    export const stormCloud: Image[] = [
        img`
            . . . c c c c . c c c . . .
            . c c c c c c c c c c c c .
            c c c c c c c c c c c c c c
            c c 5 c c c c c c c 5 c c c
            c c c c c c c c c c c c c c
            . c c c c c c c c c c c c .
            . . . c c 5 5 c c c . . . .
            . . . . 5 5 . . . . . . . .
            . . . 5 5 . . . . . . . . .
            . . . 5 . . . . . . . . . .
        `,
        img`
            . . . c c c c . c c c . . .
            . c c c c c c c c c c c c .
            c c c c c c c c c c c c c c
            c c 5 c c c c c c c 5 c c c
            c c c c c c c c c c c c c c
            . c c c c c c c c c c c c .
            . . . c c c c c c c . . . .
            . . . . . 5 5 . . . . . . .
            . . . . . . 5 5 . . . . . .
            . . . . . . . . . . . . . .
        `,
    ]

    // ---------- Boss 1 : Polyphème le Cyclope (regarde à gauche) ----------
    export const cyclopsL = img`
        . . . . . . . . e e e e e e e e . . . . . . . . . .
        . . . . . . e e d d d d d d d d e e . . . . . . . .
        . . . . . e d d d d d d d d d d d d e . . . . . . .
        . . . . . d d d d f f f f f f d d d d . . . . . . .
        . . . . . d d d 1 1 1 1 1 1 1 1 d d d . . . . . . .
        . . . . . d d 1 1 9 9 8 8 9 9 1 1 d d . . . . . . .
        . . . . . d d 1 1 9 8 f f 8 9 1 1 d d . . . . . . .
        . . . . . d d 1 1 1 1 1 1 1 1 1 1 d d . . . e e . .
        . . . . . d d d 1 1 1 1 1 1 1 1 d d d . . e e e e .
        . . . . . . d d d d d d d d d d d d . . . e e e e .
        . . . . . . d d f f f f f f f f d d . . . e e e e .
        . . . . . . d d f 1 f f f f 1 f d d . . . e e e e .
        . . . . . . . d d d d d d d d d d . . . . e e e e .
        . . . . . d d d d d d d d d d d d d d . . e e e e .
        . . . d d d d d d d d d d d d d d d d d . e e e e .
        . . d d d d d d d d d d d d d d d d d d d e e e e .
        . . d d d . d d d d d d d d d d d . d d d e e e e .
        . . d d . . d d d d d d d d d d d . . d d d e e . .
        . . d d . . e e e e e e e e e e e . . d d d d . . .
        . . d d . . e e e e e e e e e e e . . . d d . . . .
        . . . . . . e e e e e e e e e e e . . . . . . . . .
        . . . . . . e e e e e e e e e e e . . . . . . . . .
        . . . . . . d d d d d . d d d d d . . . . . . . . .
        . . . . . . d d d d d . d d d d d . . . . . . . . .
        . . . . . . d d d d d . d d d d d . . . . . . . . .
        . . . . . . d d d d d . d d d d d . . . . . . . . .
        . . . . . e e e d d d . d d d e e e . . . . . . . .
        . . . . . e e e e e e . e e e e e e . . . . . . . .
    `
    export const cyclopsR = flipped(cyclopsL)

    // Rocher du Cyclope
    export const rock = img`
        . . b b b b b . .
        . b b b b b b b .
        b b 1 b b b b b b
        b b b b b b c b b
        b b b b b c c b b
        b b b b b b b b b
        . b c b b b b b .
        . . b b b b b . .
    `

    // ---------- Boss 2 : la Reine des Harpies ----------
    export const harpyQueenL = img`
        4 4 4 . . . . . . . . . . . . . . . . . . . 4 4 4 .
        4 4 4 4 4 . . . . . . 5 . 5 . 5 . . . . 4 4 4 4 4 .
        4 4 4 4 4 4 4 . . . . 5 5 5 5 5 . . 4 4 4 4 4 4 4 .
        . 4 4 4 4 4 4 4 . . f f f f f f f . 4 4 4 4 4 4 . .
        . . 4 4 4 4 4 4 4 f f d d d d f f 4 4 4 4 4 4 . . .
        . . . 4 4 4 4 4 4 f d f d d f d f 4 4 4 4 4 . . . .
        . . . . 4 4 4 4 4 f d d d d d d f 4 4 4 4 . . . . .
        . . . . . 4 4 4 4 f f d 2 2 d f f 4 4 4 . . . . . .
        . . . . . . 4 4 4 4 f f f f f f 4 4 4 . . . . . . .
        . . . . . . . 4 4 e e e e e e e e 4 4 . . . . . . .
        . . . . . . . . e e e e e e e e e e . . . . . . . .
        . . . . . . . . e e e e e e e e e e . . . . . . . .
        . . . . . . . . . e e e e e e e e . . . . . . . . .
        . . . . . . . . . . e e e e e e . . . . . . . . . .
        . . . . . . . . . . e e . . e e . . . . . . . . . .
        . . . . . . . . . 4 4 . . . . 4 4 . . . . . . . . .
        . . . . . . . . . 4 . . . . . . 4 . . . . . . . . .
    `
    export const harpyQueenR = flipped(harpyQueenL)

    // Plume pointue de la harpie
    export const feather = img`
        . . . . . 4 4 .
        . . . . 4 4 4 4
        . . . 4 4 4 4 4
        . . 4 4 4 4 4 .
        . 4 4 4 4 4 . .
        4 4 4 4 4 . . .
        2 4 4 4 . . . .
        2 2 . . . . . .
    `

    // ---------- Boss 3 : Circé la magicienne ----------
    export const circeL = img`
        . . . . 4 4 4 4 4 4 4 4 . . . . . .
        . . . 4 4 4 4 4 4 4 4 4 4 . . . . .
        . . 4 4 4 d d d d d d 4 4 4 . . . .
        . . 4 4 d d f d d f d d 4 4 . . . .
        . . 4 4 d d d d d d d d 4 4 . . . .
        . . 4 4 d d d 2 2 d d d 4 4 . . . .
        . . 4 4 4 d d d d d d 4 4 4 . . 3 .
        . . 4 4 4 a a a a a a 4 4 4 . 3 1 3
        . . 4 4 a a a a a a a a 4 4 . . 3 .
        . . 4 4 a a a a a a a a 4 4 . . e .
        . . 4 . a a a a a a a a . 4 . . e .
        . . 4 . 5 5 5 5 5 5 5 5 . 4 . . e .
        . . . . a a a a a a a a d d d e e .
        . . . . a a a a a a a a . . . . . .
        . . . . a a a a a a a a . . . . . .
        . . . a a a a a a a a a a . . . . .
        . . . a a a a a a a a a a . . . . .
        . . a a a a a a a a a a a a . . . .
        . . a a a a a a a a a a a a . . . .
        . a a a a a a a a a a a a a a . . .
        . a a a a a a a a a a a a a a . . .
    `
    export const circeR = flipped(circeL)

    // Sortilège de Circé
    export const magicBolt = img`
        . . . a . . . .
        . a . 3 . a . .
        . . 3 a 3 . . .
        a 3 a 1 a 3 a .
        . . 3 a 3 . . .
        . a . 3 . a . .
        . . . a . . . .
        . . . . . . . .
    `

    // ---------- Boss 4 : la Reine des Sirènes ----------
    export const sirenQueenL = img`
        . . . . . 5 . 5 . 5 . . . . . . . . . . . . . .
        . . . . . 5 5 5 5 5 . . . . . . . . . . . . . .
        . . . . 4 4 4 4 4 4 4 . . . . . . . . . . . . .
        . . . 4 4 d d d d d 4 4 . . . . . . . . . . . .
        . . . 4 d f d d f d d 4 4 . . . . . . . . . . .
        . . . 4 d d d d d d d 4 4 . . . . . . . . . . .
        . . . 4 d d 2 2 d d 4 4 4 . . . . . . . . . . .
        . . . . 4 d d d d 4 4 4 . . . . . . . . . . . .
        . . . . . 6 6 6 6 4 4 . . . . . . . . . . . . .
        . . . . 6 6 6 6 6 6 4 . . . . . . . . 9 . . . .
        . . . 6 6 6 6 6 6 6 6 . . . . . . . . . . 9 . .
        . . . d 6 6 6 6 6 6 6 6 . . . . . . . . . . . .
        . . . . . 6 6 6 6 6 6 6 6 6 . . . . . . 9 . . .
        . . 9 . . . 6 6 6 6 6 6 6 6 6 6 . . . . . . . .
        . . . . . . . . 6 6 6 6 6 6 6 6 6 6 . . . . . .
        . . . . . . . . . . . 6 6 6 6 6 6 6 6 . 7 7 . .
        . . . . 9 . . . . . . . . . 6 6 6 6 6 7 7 7 7 .
        . . . . . . . . . . . . . . . 6 6 6 7 7 7 7 7 7
        . . . . . . . . 9 . . . . . . . 6 6 . 7 7 7 7 .
        . . . . . . . . . . . . . . . . . . . . 7 7 . .
    `
    export const sirenQueenR = flipped(sirenQueenL)

    // Note de musique de la sirène
    export const musicNote = img`
        . . . . . 2 2 .
        . . . . . 2 2 2
        . . . . . 2 . 2
        . . . . . 2 . 2
        . . . . . 2 . .
        . . 2 2 2 2 . .
        . 2 2 2 2 2 . .
        . 2 2 2 2 . . .
    `

    // ---------- Boss 5 : Atlas le Titan (porte le ciel sur ses épaules) ----------
    export const atlas = img`
        . . . . . . . 9 9 9 9 9 9 9 9 9 9 9 9 . . . . . . .
        . . . . . 9 9 9 9 1 1 9 9 9 9 9 9 9 9 9 9 . . . . .
        . . . . 9 9 9 9 9 9 9 9 9 9 1 1 1 9 9 9 9 9 . . . .
        . . . . 9 9 1 1 9 9 9 9 9 9 9 9 9 9 9 9 9 9 . . . .
        . . . . 9 9 9 9 9 9 9 1 1 9 9 9 9 1 9 9 9 9 . . . .
        . . . . . 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 . . . . .
        . . . . . . 9 9 9 9 9 9 9 9 9 9 9 9 9 9 . . . . . .
        . . . . b b . . . . . . . . . . . . . . b b . . . .
        . . . b b b . . . . . . . . . . . . . . b b b . . .
        . . . b b b . . . b b b b b b b . . . . b b b . . .
        . . . b b b . . b b b b b b b b b . . . b b b . . .
        . . . b b b . . b 5 5 b b b 5 5 b . . . b b b . . .
        . . . b b b . . b b b b b b b b b . . . b b b . . .
        . . . b b b . . b b c c c c c b b . . . b b b . . .
        . . . b b b b . . b b b b b b b . . b b b b b . . .
        . . . b b b b b b b b b b b b b b b b b b b b . . .
        . . b b b b b b b b b b b b b b b b b b b b b b . .
        . . b b b b b b b b b b b b b b b b b b b b b b . .
        . . b b b c c b b b b b b b b b b b b c c b b b . .
        . . b b b c c b b b b b b b b b b b b c c b b b . .
        . . b b b c c b b b b b b b b b b b b c c b b b . .
        . . . b b b b b b b b b b b b b b b b b b b b . . .
        . . . . . . b b b b b b b b b b b b b . . . . . . .
        . . . . . . b b b b b b . b b b b b b . . . . . . .
        . . . . . . b b b b b b . b b b b b b . . . . . . .
        . . . . . . b b b b b b . b b b b b b . . . . . . .
        . . . . . b b b b b b b . b b b b b b b . . . . . .
        . . . . c c c c c c c c . c c c c c c c c . . . . .
    `

    // ---------- Boss 6 : Poséidon, le dieu de la mer ----------
    export const poseidonL = img`
        . . . . . . . . . . . . . . . . . . . . 5 . 5 . 5 .
        . . . . . . . . . . . . . . . . . . . . 5 5 5 5 5 .
        . . . . . 5 5 5 5 5 5 5 . . . . . . . . 5 5 5 5 5 .
        . . . . 1 1 1 1 1 1 1 1 1 . . . . . . . . . 5 . . .
        . . . 1 1 1 d d d d d 1 1 1 . . . . . . . . 5 . . .
        . . . 1 1 d d f d d f d 1 1 . . . . . . . . 5 . . .
        . . . 1 1 d d d d d d d 1 1 . . . . . . . . 5 . . .
        . . . 1 1 1 d d d d d 1 1 1 . . . . . . . . 5 . . .
        . . . 1 1 1 1 1 1 1 1 1 1 1 . . . . . . . . 5 . . .
        . . . . 1 1 1 1 1 1 1 1 1 . . . . . . . . . 5 . . .
        . . . . . 1 1 1 1 1 1 1 . . . . . . . . . . 5 . . .
        . . . . d d d d d d d d d d . . . . . . . . 5 . . .
        . . . d d d d d d d d d d d d . . . . . . . 5 . . .
        . . d d d d d d d d d d d d d d . . . . . . 5 . . .
        . . d d d d d d d d d d d d d d d d d d 5 5 5 . . .
        . . d d d 6 6 6 6 6 6 6 6 6 d d . . . . . . . . . .
        . . . . . 6 6 6 6 6 6 6 6 6 . . . . . . . . . . . .
        . . . . 8 8 8 8 8 8 8 8 8 8 8 . . . . . . . . . . .
        . . . 8 8 8 9 8 8 8 8 8 9 8 8 8 . . . . . . . . . .
        . . . 8 8 8 8 8 8 8 8 8 8 8 8 8 8 . . . . . . . . .
        . . 8 8 8 8 8 9 8 8 8 9 8 8 8 8 8 8 . . . . . . . .
        . . 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 . . . . . . .
        . 9 8 8 8 9 8 8 8 9 8 8 8 8 9 8 8 8 8 9 . . . . . .
        9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 . . . . .
    `
    export const poseidonR = flipped(poseidonL)

    // Éclair du trident
    export const lightning = img`
        . . 5 5 5 5
        . 5 5 5 5 .
        5 5 5 5 . .
        . 5 5 5 5 .
        . . 5 5 5 5
        . . 5 5 5 .
        . 5 5 5 . .
        . 5 5 . . .
    `

    // ---------- La chouette d'Athéna (les énigmes) ----------
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

    // ---------- Tuiles (16x16) ----------
    // Forêt enchantée de Circé
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

    // Pont du navire (la mer des Sirènes) : grandes planches de bois
    const deckTop = img`
        d d d d d d d d d d d d d d d d
        e e e e e e e e e e e e e e e e
        e e d d d e e e e e e e d d e e
        e e e e e e e e f e e e e e e e
        e e e e e e e e f e e e e e e e
        f f f f f f f f f f f f f f f f
        e e e e e e e e e e e e e e e e
        e d d e e e e e e e e d d d e e
        e e e e f e e e e e e e e e e e
        e e e e f e e e e e e e e e e e
        f f f f f f f f f f f f f f f f
        e e e e e e e e e e e e e e e e
        e e e e e e d d e e e e e e d d
        e e e e e e e e e e e f e e e e
        e e e e e e e e e e e f e e e e
        e e e e e e e e e e e e e e e e
    `
    const deckFill = img`
        e e e e e e e e e e e e e e e e
        e e d d e e e e e e e d d e e e
        e e e e e e f e e e e e e e e e
        e e e e e e f e e e e e e e e e
        f f f f f f f f f f f f f f f f
        e e e e e e e e e e e e e e e e
        e e e e e e e e e d d e e e e e
        e f e e e e e e e e e e e f e e
        e f e e e e e e e e e e e f e e
        f f f f f f f f f f f f f f f f
        e e e e e e e e e e e e e e e e
        e d d d e e e e e e e e d d e e
        e e e e e e e e f e e e e e e e
        e e e e e e e e f e e e e e e e
        f f f f f f f f f f f f f f f f
        e e e e e e e e e e e e e e e e
    `

    // Dangers au fond des trous : la mer, la lave, l'orage, la tempête
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
    // Mer déchaînée de la tempête finale
    const stormSea = img`
        1 1 8 8 8 1 1 8 8 8 8 1 1 8 8 8
        8 8 8 8 8 8 8 8 1 8 8 8 8 8 8 1
        8 8 8 c c 8 8 8 8 8 8 c c 8 8 8
        c c 8 8 8 8 c c 8 8 8 8 8 8 c c
        c c c c 8 c c c c c 8 c c c c c
        c c c c c c c c 5 c c c c c c c
        c c c c c c c c 5 5 c c c c c c
        c c 8 c c c c c c c c c 8 c c c
        c c c c c c c c c c c c c c c c
        c c c c c 8 c c c c c c c c c c
        c c c c c c c c c c 8 c c c c c
        c 8 c c c c c c c c c c c c 8 c
        c c c c c c c 8 c c c c c c c c
        c c c c c c c c c c c c c c c c
        c c c 8 c c c c c c c 8 c c c c
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

    // Tuiles générées : sol (dessus / dessous) et plateformes
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

    // Île du Cyclope : sable et dalles de pierre
    const sandTop = groundTile(5, 1, 13, 14, true)
    const sandFill = groundTile(5, 1, 13, 14, false)
    const stonePlatform = platformTile(11, 12, 1)
    // Île d'Éole : nuages et bronze
    const cloudTop = groundTile(9, 1, 1, 9, true)
    const cloudFill = groundTile(9, 1, 1, 9, false)
    const bronzePlatform = platformTile(4, 14, 5)
    // La mer : plateforme de cordages et planches
    const riggingPlatform = platformTile(14, 12, 13)
    // Montagne des Titans : roche noire (plus sombre que le fond violet)
    const rockTop = groundTile(11, 1, 15, 11, true)
    const rockFill = groundTile(11, 1, 15, 11, false)
    const titanPlatform = platformTile(12, 15, 5)
    // Tempête : pont mouillé et sombre
    const wetDeckTop = groundTile(11, 1, 12, 9, true)
    const wetDeckFill = groundTile(11, 1, 12, 9, false)
    const wetPlatform = platformTile(12, 15, 11)

    export const THEME_CYCLOPS = 0
    export const THEME_AEOLUS = 1
    export const THEME_CIRCE = 2
    export const THEME_SEA = 3
    export const THEME_TITAN = 4
    export const THEME_STORM = 5

    // Index des tuiles : 0 vide, 1 sol (dessus), 2 sol (dessous),
    // 3 plateforme, 4 danger (mer / orage / lave / tempête), 5 piques
    export function tileset(theme: number): Image[] {
        const empty = image.create(16, 16)
        if (theme === THEME_AEOLUS)
            return [empty, cloudTop, cloudFill, bronzePlatform, storm, spikes]
        if (theme === THEME_CIRCE)
            return [empty, forestTop, forestFill, forestPlatform, water, spikes]
        if (theme === THEME_SEA)
            return [empty, deckTop, deckFill, riggingPlatform, water, spikes]
        if (theme === THEME_TITAN)
            return [empty, rockTop, rockFill, titanPlatform, lava, spikes]
        if (theme === THEME_STORM)
            return [
                empty,
                wetDeckTop,
                wetDeckFill,
                wetPlatform,
                stormSea,
                spikes,
            ]
        return [empty, sandTop, sandFill, stonePlatform, water, spikes]
    }

    // ---------- Décors de fond (160x120) ----------
    function cyclopsBackground(): Image {
        const bg = image.create(160, 120)
        bg.fill(9)
        // soleil
        bg.fillCircle(30, 22, 11, 5)
        bg.fillCircle(30, 22, 8, 1)
        // nuages
        bg.fillCircle(100, 26, 6, 1)
        bg.fillCircle(110, 23, 8, 1)
        bg.fillCircle(120, 27, 5, 1)
        // la mer
        bg.fillRect(0, 70, 160, 50, 8)
        bg.fillRect(0, 70, 160, 2, 9)
        for (let i = 0; i < 16; i++) {
            const x = (i * 43 + 5) % 160
            const y = 76 + ((i * 29) % 40)
            bg.fillRect(x, y, 5, 1, 9)
        }
        // l'île rocheuse du Cyclope avec sa grotte, au loin
        bg.fillCircle(130, 102, 28, 14)
        bg.fillCircle(106, 112, 18, 14)
        bg.fillCircle(130, 106, 8, 15)
        bg.fillRect(122, 106, 16, 14, 15)
        // moutons du Cyclope sur l'île
        bg.fillRect(104, 92, 4, 3, 1)
        bg.setPixel(103, 93, 15)
        bg.fillRect(144, 90, 4, 3, 1)
        bg.setPixel(148, 91, 15)
        // colonne grecque en ruine à gauche
        bg.fillRect(14, 50, 4, 20, 1)
        bg.fillRect(12, 48, 8, 3, 1)
        bg.fillRect(12, 68, 8, 3, 1)
        return bg
    }

    function aeolusBackground(): Image {
        const bg = image.create(160, 120)
        bg.fill(9)
        // grands nuages blancs
        for (let i = 0; i < 6; i++) {
            const x = (i * 47 + 20) % 160
            const y = 15 + ((i * 31) % 70)
            bg.fillCircle(x, y, 7, 1)
            bg.fillCircle(x + 10, y - 3, 9, 1)
            bg.fillCircle(x + 20, y + 1, 6, 1)
        }
        // l'île flottante d'Éole avec son palais de bronze
        bg.fillCircle(80, 100, 34, 14)
        bg.fillRect(46, 100, 68, 20, 14)
        bg.fillRect(62, 74, 8, 20, 4)
        bg.fillRect(88, 78, 8, 16, 4)
        bg.fillRect(58, 90, 44, 8, 4)
        bg.fillTriangle(66, 74, 58, 74, 66, 64, 5)
        bg.fillTriangle(92, 78, 84, 78, 92, 68, 5)
        // tourbillons de vent
        for (let i = 0; i < 5; i++) {
            const x = (i * 61 + 10) % 140
            const y = 20 + ((i * 43) % 50)
            bg.drawLine(x, y, x + 12, y, 1)
            bg.drawLine(x + 4, y + 2, x + 16, y + 2, 1)
            bg.setPixel(x + 17, y + 1, 1)
        }
        return bg
    }

    function circeBackground(): Image {
        const bg = image.create(160, 120)
        bg.fill(9)
        // nuages
        bg.fillCircle(30, 25, 7, 1)
        bg.fillCircle(40, 22, 9, 1)
        bg.fillCircle(50, 26, 6, 1)
        // collines lointaines
        bg.fillCircle(20, 135, 55, 6)
        bg.fillCircle(85, 145, 65, 6)
        bg.fillCircle(150, 132, 50, 6)
        bg.fillRect(0, 100, 160, 20, 6)
        // le palais de marbre de Circé
        bg.fillRect(96, 52, 48, 30, 1)
        bg.fillTriangle(92, 52, 148, 52, 120, 38, 13)
        for (let x = 100; x < 144; x += 10) {
            bg.fillRect(x, 56, 4, 24, 13)
        }
        // sapins de la forêt enchantée
        for (let x = 6; x < 90; x += 20) {
            const top = 70 + ((x * 7) % 16)
            bg.fillTriangle(x, top, x - 7, 102, x + 7, 102, 7)
            bg.fillTriangle(x, top - 10, x - 5, top + 6, x + 5, top + 6, 7)
        }
        // étincelles de magie violette
        for (let i = 0; i < 14; i++) {
            const x = (i * 37 + 11) % 160
            const y = 15 + ((i * 53 + 7) % 60)
            bg.setPixel(x, y, 10)
        }
        return bg
    }

    function seaBackground(): Image {
        const bg = image.create(160, 120)
        bg.fill(9)
        // soleil voilé
        bg.fillCircle(130, 20, 10, 5)
        bg.fillCircle(130, 20, 7, 1)
        // la mer à perte de vue
        bg.fillRect(0, 60, 160, 60, 8)
        bg.fillRect(0, 60, 160, 2, 9)
        for (let i = 0; i < 22; i++) {
            const x = (i * 43 + 5) % 160
            const y = 66 + ((i * 29) % 50)
            bg.fillRect(x, y, 5, 1, 9)
        }
        // le rocher des sirènes
        bg.fillTriangle(20, 90, 45, 50, 70, 90, 12)
        bg.fillTriangle(50, 90, 68, 62, 86, 90, 12)
        // deux petites sirènes posées dessus
        bg.fillCircle(45, 47, 2, 3)
        bg.fillRect(44, 49, 3, 4, 6)
        bg.fillCircle(68, 59, 2, 3)
        bg.fillRect(67, 61, 3, 4, 6)
        return bg
    }

    function titanBackground(): Image {
        const bg = image.create(160, 120)
        bg.fill(12)
        // étoiles (la montagne touche le ciel)
        for (let i = 0; i < 20; i++) {
            const x = (i * 53 + 7) % 160
            const y = (i * 37 + 3) % 60
            bg.setPixel(x, y, 1)
        }
        // la montagne géante
        bg.fillTriangle(0, 115, 55, 25, 110, 115, 11)
        bg.fillTriangle(70, 115, 120, 40, 170, 115, 11)
        bg.fillTriangle(0, 115, 55, 25, 30, 115, 12)
        bg.fillRect(0, 112, 160, 8, 11)
        // au loin, Atlas porte le ciel
        bg.fillCircle(126, 30, 12, 9)
        bg.fillCircle(126, 30, 10, 9)
        bg.fillRect(120, 42, 12, 3, 11)
        bg.fillRect(122, 45, 8, 10, 11)
        bg.fillRect(120, 55, 4, 8, 11)
        bg.fillRect(128, 55, 4, 8, 11)
        return bg
    }

    function stormBackground(): Image {
        const bg = image.create(160, 120)
        bg.fill(8)
        // nuages noirs
        for (let i = 0; i < 5; i++) {
            const x = (i * 47 + 15) % 160
            const y = 10 + ((i * 23) % 25)
            bg.fillCircle(x, y, 9, 12)
            bg.fillCircle(x + 12, y + 2, 11, 12)
            bg.fillCircle(x + 24, y - 1, 8, 12)
        }
        // éclairs
        bg.drawLine(40, 24, 34, 40, 5)
        bg.drawLine(34, 40, 40, 42, 5)
        bg.drawLine(40, 42, 32, 58, 5)
        bg.drawLine(120, 18, 114, 34, 5)
        bg.drawLine(114, 34, 120, 36, 5)
        bg.drawLine(120, 36, 112, 52, 5)
        // pluie
        for (let i = 0; i < 26; i++) {
            const x = (i * 41 + 9) % 160
            const y = 30 + ((i * 29) % 60)
            bg.drawLine(x, y, x - 1, y + 3, 9)
        }
        // les grandes vagues
        bg.fillRect(0, 90, 160, 30, 8)
        for (let x = 0; x < 160; x += 20) {
            bg.fillCircle(x + 10, 92, 8, 8)
            bg.fillCircle(x, 96, 6, 8)
        }
        for (let x = 0; x < 160; x += 20) {
            bg.fillRect(x + 4, 86, 10, 2, 1)
        }
        // tout au fond, la lumière d'Ithaque
        bg.fillRect(148, 70, 3, 10, 14)
        bg.setPixel(149, 68, 5)
        bg.fillCircle(149, 68, 1, 5)
        return bg
    }

    export function background(theme: number): Image {
        if (theme === THEME_AEOLUS) return aeolusBackground()
        if (theme === THEME_CIRCE) return circeBackground()
        if (theme === THEME_SEA) return seaBackground()
        if (theme === THEME_TITAN) return titanBackground()
        if (theme === THEME_STORM) return stormBackground()
        return cyclopsBackground()
    }

    // Ennemis selon le thème
    export function walkerFrames(theme: number): Image[] {
        if (theme === THEME_AEOLUS) return cloudSheep
        if (theme === THEME_CIRCE) return pig
        if (theme === THEME_SEA) return crab
        if (theme === THEME_TITAN) return livingStatue
        if (theme === THEME_STORM) return seaSerpent
        return boar
    }

    export function flyerFrames(theme: number): Image[] {
        if (theme === THEME_AEOLUS) return harpy
        if (theme === THEME_CIRCE) return crow
        if (theme === THEME_SEA) return flyingFish
        if (theme === THEME_TITAN) return blackEagle
        if (theme === THEME_STORM) return stormCloud
        return seagull
    }
}
