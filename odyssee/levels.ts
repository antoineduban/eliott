// ============================================
// NIVEAUX
// Chaque niveau est dessiné avec des caractères :
//   #  sol        =  plateforme     .  vide     ~  danger (mer, orage, lave)
//   ^  piques (ça pique : un coeur en moins, il faut sauter par-dessus)
//   P  départ     F  le navire (fin du niveau)
//   *  pièce d'or     h  coeur
//   p  amphore (effet surprise)     m  fleur de lotus (transformation)
//   ?  porte de la chouette d'Athéna (une énigme à résoudre pour passer)
//   e  ennemi qui marche     b  ennemi qui vole
//
// Règles de conception (`tools/checklevels.mjs` les vérifie) :
// - jamais de plateforme au-dessus d'un trou ou de piques, ni des DEUX cases
//   qui les précèdent (on y prend son élan : on se cognerait la tête) ; et pas
//   de plateforme haute (lignes 0 à 4) sur la case qui les suit (on s'y cogne
//   au sommet du saut et on retombe dans le trou / sur les piques) ;
// - un ennemi volant au-dessus ou à côté (2 cases) d'un trou ou de piques va en
//   ligne 3 (trou de 2 cases) ou en ligne 2 (trou de 3 cases, piques) : le
//   sommet du saut est en ligne 3, sinon on le percute à coup sûr en sautant.
// ============================================

// biome-ignore lint/correctness/noUnusedVariables: utilisé par main.ts
namespace Levels {
    export const TILE = 16
    export const HAZARD = 4
    export const SPIKES = 5

    export class LevelDef {
        name: string
        theme: number
        rows: string[]
        constructor(name: string, theme: number, rows: string[]) {
            this.name = name
            this.theme = theme
            this.rows = rows
        }
    }

    export const levels: LevelDef[] = [
        new LevelDef("L'île du Cyclope", Assets.THEME_CYCLOPS, [
            "................................................................",
            "................................................................",
            ".................*......................b.............*.........",
            ".............*..===...b.........*.................*..===........",
            ".........*..===.............*..===............*..===............",
            "........===................===...............===................",
            ".P....*....e....p...*....e....*...m...*....e..*..?..*.h.e.....F.",
            "#####################..##############...###################..###",
            "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~",
        ]),
        new LevelDef("L'île d'Éole", Assets.THEME_AEOLUS, [
            "................................................................",
            "................................................................",
            "........b.............*...................b.....................",
            "..................*..===............*...h............*......b...",
            "..............*..===............*..===...........*..===.........",
            ".............===...............===..............===.............",
            ".P..*.e.......*..e..*.p........*.e..m...^*......*.e..?.*e.....F.",
            "##########...#############...###############...###########..####",
            "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~",
        ]),
        new LevelDef("L'île de Circé", Assets.THEME_CIRCE, [
            "................................................................",
            "................................................................",
            "................*.......................b.......................",
            "............*..===....b............*...............*....b.......",
            "........*..===............h....*..===..........*..===...........",
            ".......===....................===.............===...............",
            ".P..*..e....*.m..*......*.e...e..*.....^*.....p.e..*.?.e......F.",
            "####################..####################...#############..####",
            "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~",
        ]),
        new LevelDef("La Mer des Sirènes", Assets.THEME_SEA, [
            "....................................................................",
            "....................................................................",
            "...............*....b.............p....b............m.......b.......",
            "...........*..===.............*..===............*..===..............",
            ".......*..===.............*..===............*..===..................",
            "......===................===...............===......................",
            ".P..*....e...*...*....^.*..e...p...*.......e..*.?.m...*....*.^.eh.F.",
            "###################..#################...###############..##########",
            "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~",
        ]),
        new LevelDef("La Montagne des Titans", Assets.THEME_TITAN, [
            "......................................................................",
            "......................................................................",
            ".............*....................b...........*....b..................",
            ".........*..===...b..........p...............===..............b.......",
            ".....*..===..............*..===...........*............h..............",
            "....===.................===..............===..........===.............",
            ".P..*...e...*..m....*.^...e..*..*....e..*..p.?.*.....*...e.^.....*e.F.",
            "#################..##############...##############...#########..######",
            "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~",
        ]),
        new LevelDef("La Tempête de Poséidon", Assets.THEME_STORM, [
            "........................................................................",
            "........................................................................",
            "...............b.........................b..............b...............",
            "............................b.....................................b.....",
            ".....*............m............p............*......h....................",
            "....===..........===..........===..........===....===...................",
            ".P.*...e.^..*.....*.e.^..*....*.e..^.*?.....*...^.*.e......*.^.e*...*hF.",
            "##############...##########..###########...############...########..####",
            "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~",
        ]),
    ]

    // Arène des boss (même forme pour tous, tuiles du thème)
    export const arena: string[] = [
        "..............",
        "..............",
        "..............",
        "..............",
        "...===....===.",
        "..............",
        ".P............",
        "##############",
    ]

    export class Spawn {
        kind: string
        col: number
        row: number
        constructor(kind: string, col: number, row: number) {
            this.kind = kind
            this.col = col
            this.row = row
        }
    }

    export let spawns: Spawn[] = []
    export let widthPx = 0
    export let heightPx = 0
    export let theme = 0
    // Dans la tempête, le pont du navire est mouillé : Ulysse glisse
    export let slippery = false

    export function load(rows: string[], levelTheme: number) {
        const h = rows.length
        const w = rows[0].length
        const data = control.createBuffer(4 + w * h)
        data.setNumber(NumberFormat.UInt16LE, 0, w)
        data.setNumber(NumberFormat.UInt16LE, 2, h)
        const layer = image.create(w, h)
        spawns = []
        theme = levelTheme
        slippery = levelTheme === Assets.THEME_STORM
        for (let r = 0; r < h; r++) {
            const row = rows[r]
            if (row.length !== w)
                console.log(`LEVEL ROW ${r} LENGTH ${row.length} != ${w}`)
            for (let c = 0; c < w; c++) {
                const ch = row.charAt(c)
                let idx = 0
                if (ch === "#") {
                    const above = r > 0 ? rows[r - 1].charAt(c) : "."
                    idx = above === "#" ? 2 : 1
                    layer.setPixel(c, r, 2)
                } else if (ch === "=") {
                    idx = 3
                    layer.setPixel(c, r, 2)
                } else if (ch === "~") {
                    idx = HAZARD
                } else if (ch === "^") {
                    idx = SPIKES
                } else if (ch !== ".") {
                    spawns.push(new Spawn(ch, c, r))
                }
                data.setUint8(4 + c + r * w, idx)
            }
        }
        tiles.setCurrentTilemap(
            tiles.createTilemap(
                data,
                layer,
                Assets.tileset(levelTheme),
                TileScale.Sixteen,
            ),
        )
        scene.setBackgroundImage(Assets.background(levelTheme))
        widthPx = w * TILE
        heightPx = h * TILE
    }

    export function isWall(x: number, y: number): boolean {
        const tm = game.currentScene().tileMap
        if (!tm) return false
        return tm.isObstacle(x >> 4, y >> 4)
    }

    export function tileIndexAt(x: number, y: number): number {
        const tm = game.currentScene().tileMap
        if (!tm || !tm.enabled) return 0
        return tm.getTileIndex(x >> 4, y >> 4)
    }

    // Centre en x d'une colonne, bas d'une ligne (pour poser un sprite sur le sol)
    export function colX(col: number): number {
        return col * TILE + TILE / 2
    }
    export function rowBottom(row: number): number {
        return (row + 1) * TILE
    }
    export function rowY(row: number): number {
        return row * TILE + TILE / 2
    }
}
