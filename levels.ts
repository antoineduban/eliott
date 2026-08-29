// ============================================
// NIVEAUX
// Chaque niveau est dessiné avec des caractères :
//   #  sol        =  plateforme     .  vide     ~  danger (eau, lave, orage)
//   P  départ     F  portail (fin du niveau)
//   *  étoile     h  coeur
//   e  ennemi qui marche     b  ennemi qui vole
//
// Règle de conception : jamais de plateforme juste au-dessus d'un trou
// ni de la case qui le précède (sinon on se cogne la tête en sautant).
// ============================================

// biome-ignore lint/correctness/noUnusedVariables: utilisé par main.ts
namespace Levels {
    export const TILE = 16
    export const HAZARD = 4

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
        new LevelDef("La Forêt Enchantée", Assets.THEME_FOREST, [
            "................................................................",
            "................................................................",
            ".................*....................................*.........",
            ".............*..===...b.........*.................*..===........",
            ".........*..===.............*..===......b.....*..===............",
            "........===................===...............===................",
            ".P....*....e........*....e....*.......*....e..*.....*.h.e.....F.",
            "#####################..##############...###################..###",
            "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~",
        ]),
        new LevelDef("La Grotte Sombre", Assets.THEME_CAVE, [
            "################################################################",
            "#....#........#..........#.............#.........#............#.",
            "................*...............................................",
            "............*..===....b............*...............*....b.......",
            "........*..===............h....*..===...b......*..===...........",
            ".......===....................===.............===...............",
            ".P..*..e....*....*......*.e......*......*.......e..*...e......F.",
            "####################..####################...#############..####",
            "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~",
        ]),
        new LevelDef("Le Château des Nuages", Assets.THEME_SKY, [
            "................................................................",
            "................................................................",
            "......................*.........................................",
            "..................*..===............*...h............*......b...",
            "........b.....*..===............*..===....b......*..===.........",
            ".............===...............===..............===.............",
            ".P..*.e.......*..e..*..........*.e.......*......*.e....*e.....F.",
            "##########...#############...###############...###########..####",
            "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~",
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

    export function load(rows: string[], theme: number) {
        const h = rows.length
        const w = rows[0].length
        const data = control.createBuffer(4 + w * h)
        data.setNumber(NumberFormat.UInt16LE, 0, w)
        data.setNumber(NumberFormat.UInt16LE, 2, h)
        const layer = image.create(w, h)
        spawns = []
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
                Assets.tileset(theme),
                TileScale.Sixteen,
            ),
        )
        scene.setBackgroundImage(Assets.background(theme))
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
