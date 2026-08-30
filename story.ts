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
        "Sur le chemin :\n\nPotion = effet surprise !\nChampignon bleu = Lila se transforme !\n\nSaute par-dessus les piques, ça pique !",
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
            "« Jamais tu ne les reprendras ! »\n\nIl se téléporte et lance des boules d'ombre.\n\nCourage Lila, c'est un grand combat !",
        ],
        [
            "Au bout de la plage, Lila trouve un portail dans un gros rocher.\n\nDerrière, un crabe géant avec un chapeau de pirate fait claquer ses pinces !\n\n« Yo ho ho ! Je suis le Crabe Pirate ! »",
            "« Le morceau de Lune est mon trésor ! Personne ne le prendra ! »\n\nIl lance des noix de coco et fonce sur toi : saute par-dessus !",
        ],
        [
            "Tout en haut de la montagne, la neige tombe à gros flocons.\n\nUne énorme boule de poils blancs éternue : ATCHOUM !\n\n« Je suis le Yéti Frileux ! Brrr ! »",
            "« Le morceau de Lune me tient chaud ! Je le garde ! »\n\nAttention : le sol est glissant !\n\nSaute par-dessus les boules de neige et les éclats de glace !",
        ],
        [
            "Au coeur du volcan, la lave bouillonne.\n\nUne montagne de cailloux se met à bouger... c'est un géant de pierre !\n\n« JE SUIS MAGMA. LE MORCEAU DE LUNE EST À MOI. »",
            "« PERSONNE NE PASSE ! »\n\nIl lance des rochers brûlants et appelle ses boules de lave.\n\nCourage Lila, c'est le tout dernier combat !",
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
        [
            "Le Roi des Ombres disparaît dans un nuage de fumée !\n\nPOUF !\n\nUn grand coffre s'ouvre : toutes les étoiles s'envolent vers le ciel !",
            "Mais... quelque chose ne va pas.\n\nLes étoiles brillent, et pourtant la nuit reste toute sombre.\n\n« La Lune ! Où est la Lune ? »",
            "Une petite voix sort de la fumée :\n\n« Hi hi ! J'ai cassé la Lune en trois morceaux !\n\nMes trois gardiens les ont cachés très, très loin... »",
            "Un vieux hibou se pose près de Lila :\n\n« Hou hou ! Je sais où ils sont : à la plage des pirates, sur la montagne de glace et dans le volcan ! »",
            "Lila serre sa baguette très fort.\n\n« Je vais recoller la Lune ! »\n\nDirection : la Plage des Pirates !",
        ],
        [
            "Le Crabe Pirate s'enfonce dans le sable, tout honteux.\n\n« D'accord, d'accord ! Prends-le, ton morceau de Lune... »\n\nUn premier morceau brille dans les mains de Lila !",
            "Le morceau de Lune est tout froid.\n\n« Le deuxième doit être dans la montagne de glace ! »\n\nLila s'envole vers les sommets enneigés. Brrr !",
        ],
        [
            "Le Yéti tombe sur les fesses dans la neige.\n\n« Snif... j'ai froid ! »\n\nLila lui tricote un bonnet avec sa magie. Il sourit et lui donne le deuxième morceau de Lune !",
            "Deux morceaux brillent maintenant.\n\n« Le dernier est dans le volcan ! »\n\nLila prend une grande inspiration et plonge vers la montagne de feu.",
        ],
    ]

    export const ending: string[] = [
        "Le Golem s'écroule en mille petits cailloux !\n\nDans sa main de pierre, le dernier morceau de Lune brille.",
        "Lila lève sa baguette : les trois morceaux s'envolent et se recollent dans le ciel !\n\nLa Lune est ronde et brillante à nouveau.",
        "Les étoiles dansent autour de la Lune.\n\nLe dragon, le crabe, le yéti et tous les animaux font une grande fête.\n\n« Merci Lila ! Tu es la fée de la nuit ! »",
        "BRAVO !\n\nTu as sauvé les étoiles ET la Lune !\n\nFIN",
    ]

    export const owlIntro: string[] = [
        "Hou hou ! Je suis le Hibou Savant.\n\nCette porte est fermée par une énigme.\n\nRéponds bien pour l'ouvrir !",
        "Choisis avec les flèches et valide avec A.\n\nSi tu te trompes, ce n'est pas grave : je t'aiderai !",
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
