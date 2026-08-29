// ============================================
// L'HISTOIRE (écrite pour un enfant de 6 ans)
// ============================================

// biome-ignore lint/correctness/noUnusedVariables: utilisé par main.ts
namespace Story {
    export const intro: string[] = [
        "Il était une fois une petite fée qui s'appelait Lila.\n\nElle vivait dans la Forêt Enchantée, où des milliers d'étoiles brillaient chaque nuit.",
        "Mais une nuit, la Sorcière Cracra est passée sur son balai...\n\nElle a volé TOUTES les étoiles du ciel !\n\nSans étoiles, la nuit est toute noire et les animaux ont peur.",
        "Lila prend sa baguette magique :\n\n« Je vais retrouver les étoiles ! »\n\nEt elle s'envole vers l'aventure.",
        "Comment jouer :\n\nFlèches : marcher\nA : sauter\n(reste appuyé pour planer !)\nB : lancer de la magie\n\nRamasse les étoiles !",
    ]

    export const bossIntro: string[][] = [
        [
            "Au bout de la forêt, Lila trouve un portail magique.\n\nDerrière... une voix ricane :\n\n« Hi hi hi ! C'est moi, la Sorcière Cracra ! »",
            "« Tu veux les étoiles ? Il faudra m'attraper !\n\nAttention à mes potions qui tombent ! »\n\nSaute pour l'atteindre et lance ta magie avec B !",
        ],
        [
            "Au fond de la grotte, la terre tremble...\n\nGRRRR !\n\nUn énorme dragon vert apparaît !",
            "« Je suis le Dragon Ronchon ! Personne ne passe ! »\n\nIl crache des boules de feu : saute par-dessus et lance ta magie !",
        ],
        [
            "Tout en haut du château, il fait très sombre.\n\nUne ombre géante avec une couronne se lève...\n\n« Je suis le Roi des Ombres. Les étoiles sont à MOI ! »",
            "« Jamais tu ne les reprendras ! »\n\nIl se téléporte et lance des boules d'ombre.\n\nCourage Lila, c'est le dernier combat !",
        ],
    ]

    export const afterBoss: string[][] = [
        [
            "La sorcière tombe de son balai !\n\n« Aïe aïe aïe ! D'accord, d'accord...\n\nCe n'est pas moi qui ai les étoiles ! Je les ai données au dragon, dans la grotte ! »",
            "Lila ramasse une petite étoile que la sorcière avait gardée dans sa poche.\n\nElle brille dans sa main.\n\nDirection : la Grotte Sombre !",
        ],
        [
            "Le dragon se met à pleurer :\n\n« Snif... Pardon ! Le Roi des Ombres m'a forcé !\n\nIl cache les étoiles dans son château, tout là-haut dans les nuages. »",
            "Lila console le dragon avec un câlin.\n\nPuis elle bat des ailes et monte, monte, monte...\n\nDirection : le Château des Nuages !",
        ],
    ]

    export const ending: string[] = [
        "Le Roi des Ombres disparaît dans un nuage de fumée !\n\nPOUF !\n\nUn grand coffre s'ouvre : toutes les étoiles s'envolent vers le ciel !",
        "La nuit redevient belle et brillante.\n\nLes animaux de la forêt dansent de joie.\n\n« Merci Lila ! Tu es la plus courageuse des fées ! »",
        "BRAVO !\n\nTu as sauvé la Forêt Enchantée !\n\nFIN",
    ]

    export const defeat =
        "Oh non ! Lila est toute étourdie...\n\nCe n'est pas grave, on réessaie !"

    // showLongText saute le caractère qui suit un "\n" : deux "\n" de suite
    // décalent la ligne suivante. On insère un espace entre les deux.
    function fixBlankLines(s: string): string {
        let out = ""
        for (let i = 0; i < s.length; i++) {
            const ch = s.charAt(i)
            if (ch === "\n" && s.charAt(i + 1) === "\n") {
                out += "\n \n"
                i++
            } else {
                out += ch
            }
        }
        return out
    }

    export function show(text: string, layout: DialogLayout) {
        game.showLongText(fixBlankLines(text), layout)
    }

    export function tell(pages: string[]) {
        for (const p of pages) {
            show(p, DialogLayout.Full)
        }
    }
}
