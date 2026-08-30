// ============================================
// LES COURSES : décor, vitesse, obstacles
// Chaque course est plus rapide et plus chargée que la précédente.
// ============================================

// biome-ignore lint/correctness/noUnusedVariables: utilisé par race.ts
namespace Tracks {
    // Sortes d'obstacles
    export const STATIC = 0 // ne bouge pas (botte de foin, cône...)
    export const SLOW_CAR = 1 // roule dans notre sens, moins vite que nous
    export const CROSSING = 2 // traverse la route de gauche à droite

    export class Obstacle {
        image: Image
        kind: number
        constructor(image: Image, kind: number) {
            this.image = image
            this.kind = kind
        }
    }

    export class Track {
        name: string
        intro: string
        ground: number // couleur des bas-côtés
        groundStripe: number // couleur des bandes qui défilent sur les bas-côtés
        road: number
        speed: number // pixels par seconde
        length: number // longueur de la course en pixels
        gap: number // distance entre deux vagues d'obstacles (garder gap / speed >= 1,2 s)
        doubleChance: number // proportion de vagues avec deux obstacles
        obstacles: Obstacle[]
        decor: Image[]
        constructor(
            name: string,
            intro: string,
            ground: number,
            groundStripe: number,
            road: number,
            speed: number,
            length: number,
            gap: number,
            doubleChance: number,
            obstacles: Obstacle[],
            decor: Image[],
        ) {
            this.name = name
            this.intro = intro
            this.ground = ground
            this.groundStripe = groundStripe
            this.road = road
            this.speed = speed
            this.length = length
            this.gap = gap
            this.doubleChance = doubleChance
            this.obstacles = obstacles
            this.decor = decor
        }
    }

    export function all(): Track[] {
        return [
            new Track(
                "La Campagne",
                "Course 1 : la campagne !\n\nÉvite les bottes de foin et les vaches.\n\nFlèches : tourner. A : turbo !",
                7,
                6,
                12,
                55,
                2200,
                100,
                0,
                [
                    new Obstacle(Assets.hayBale, STATIC),
                    new Obstacle(Assets.hayBale, STATIC),
                    new Obstacle(Assets.cow, STATIC),
                    new Obstacle(Assets.otherCar(7), SLOW_CAR),
                ],
                [
                    Assets.roundTree(7, 14),
                    Assets.roundTree(6, 14),
                    Assets.flower(2),
                    Assets.flower(3),
                ],
            ),
            new Track(
                "La Plage",
                "Course 2 : la plage !\n\nAttention aux crabes et aux ballons.\n\nÇa va un peu plus vite...",
                5,
                4,
                12,
                70,
                2700,
                98,
                0.15,
                [
                    new Obstacle(Assets.crab, STATIC),
                    new Obstacle(Assets.beachBall, STATIC),
                    new Obstacle(Assets.sandcastle, STATIC),
                    new Obstacle(Assets.otherCar(8), SLOW_CAR),
                ],
                [Assets.palmTree(), Assets.parasol(2), Assets.parasol(8)],
            ),
            new Track(
                "La Forêt",
                "Course 3 : la forêt !\n\nDes hérissons traversent la route.\n\nEncore plus vite !",
                6,
                7,
                12,
                85,
                3200,
                110,
                0.25,
                [
                    new Obstacle(Assets.log, STATIC),
                    new Obstacle(Assets.mushroom, STATIC),
                    new Obstacle(Assets.hedgehog, CROSSING),
                    new Obstacle(Assets.otherCar(10), SLOW_CAR),
                ],
                [
                    Assets.pineTree(7, 7),
                    Assets.pineTree(6, 6),
                    Assets.rock(),
                    Assets.mushroom,
                ],
            ),
            new Track(
                "La Neige",
                "Course 4 : la neige !\n\nDes pingouins glissent partout.\n\nTiens bien le volant !",
                1,
                9,
                12,
                100,
                3800,
                125,
                0.35,
                [
                    new Obstacle(Assets.snowman, STATIC),
                    new Obstacle(Assets.puddle(9, 1), STATIC),
                    new Obstacle(Assets.penguin, CROSSING),
                    new Obstacle(Assets.otherCar(8), SLOW_CAR),
                ],
                [Assets.pineTree(6, 1), Assets.pineTree(7, 1), Assets.snowman],
            ),
            new Track(
                "La Ville la nuit",
                "Course 5 : la ville, la nuit !\n\nCônes, taxis et poules qui traversent.\n\nC'est la dernière course : à fond !",
                15,
                12,
                11,
                115,
                4400,
                138,
                0.45,
                [
                    new Obstacle(Assets.cone, STATIC),
                    new Obstacle(Assets.puddle(15, 11), STATIC),
                    new Obstacle(Assets.chicken, CROSSING),
                    new Obstacle(Assets.otherCar(5), SLOW_CAR),
                ],
                [
                    Assets.building(24, 12),
                    Assets.building(18, 8),
                    Assets.streetlight(),
                ],
            ),
        ]
    }
}
