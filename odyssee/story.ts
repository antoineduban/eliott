// ============================================
// L'HISTOIRE (écrite pour un enfant de 6 ans)
// ============================================

// biome-ignore lint/correctness/noUnusedVariables: utilisé par main.ts
namespace Story {
    export const intro: string[] = [
        "Il était une fois un héros grec très malin qui s'appelait Ulysse.\n\nGrâce à son idée du grand cheval de bois, il venait de gagner la guerre de Troie.",
        "Maintenant, il n'a qu'une envie : rentrer chez lui, sur l'île d'Ithaque.\n\nLà-bas l'attendent sa femme Pénélope et son petit garçon Télémaque.",
        "Mais Poséidon, le dieu de la mer, est de très mauvaise humeur...\n\nD'un coup de trident, il déchaîne une tempête terrible !\n\nLe bateau d'Ulysse s'échoue sur une île inconnue.",
        "Ulysse prend son arc :\n\n« Par tous les dieux ! Je rentrerai à Ithaque, quoi qu'il arrive ! »\n\nEt l'aventure commence.",
        "Comment jouer :\n\nFlèches : marcher\nA : sauter\n(reste appuyé pour planer !)\nB : tirer une flèche\n\nRamasse les pièces d'or !",
        "Sur le chemin :\n\nAmphore = surprise des dieux !\nFleur de lotus = Ulysse se transforme !\n\nSaute par-dessus les piques, ça pique !",
    ]

    export const bossIntro: string[][] = [
        [
            "Près du navire, le sol se met à trembler.\n\nBOUM. BOUM. BOUM.\n\nUn géant avec UN SEUL OEIL ramasse un rocher énorme :\n\n« Qui se promène sur MON île ?! »",
            "C'est Polyphème le Cyclope, le fils de Poséidon !\n\nIl lance des rochers et fonce tête baissée : saute par-dessus et tire avec B !",
        ],
        [
            "Tout en haut de l'île des nuages, le roi Éole garde tous les vents du monde dans un grand sac.\n\nMais des harpies, mi-femmes mi-oiseaux, le lui ont volé !",
            "« Le sac des vents est à NOUS ! » crie leur reine en battant des ailes.\n\nElle plonge du ciel et lance ses plumes pointues : attention !",
        ],
        [
            "Devant le palais de marbre, une magicienne remue une potion fumante.\n\n« Bienvenue chez Circé... » dit-elle avec un sourire de sorcière.\n\nPOF ! Elle a transformé les marins d'Ulysse en cochons !",
            "« Toi aussi, tu finiras en cochon ! »\n\nElle disparaît et réapparaît là où on ne l'attend pas.\n\nÉvite ses sortilèges et vise bien, Ulysse !",
        ],
        [
            "Sur la mer calme, une chanson s'élève...\n\n« Viens avec nous, Ulysse... viens... »\n\nCe sont les sirènes ! Leur chant endort les marins pour faire couler les bateaux.",
            "La Reine des Sirènes jaillit des vagues !\n\nSes notes de musique traversent le ciel : saute par-dessus et réponds avec tes flèches !",
        ],
        [
            "Au sommet de la montagne, un géant vieux comme le monde porte le ciel sur ses épaules.\n\n« JE SUIS ATLAS, LE DERNIER DES TITANS. »",
            "« PERSONNE NE DÉRANGE UN TITAN ! »\n\nQuand il saute, toute la montagne tremble !\n\nÉvite les rochers qui roulent et vise bien !",
        ],
        [
            "La mer devient toute noire. Les vagues sont hautes comme des montagnes.\n\nPoséidon en personne sort de l'eau, son trident à la main :\n\n« ULYSSE ! Tu as fait pleurer mon fils le Cyclope ! »",
            "« Tu ne reverras JAMAIS Ithaque ! »\n\nIl lance des éclairs et appelle les serpents de la mer.\n\nCourage Ulysse, c'est le tout dernier combat ! Pénélope t'attend !",
        ],
    ]

    export const afterBoss: string[][] = [
        [
            "Le Cyclope se frotte l'oeil et tombe assis :\n\n« Ouille ouille ouille ! Papa Poséidon ! Le petit bonhomme est trop fort ! »\n\nVite, Ulysse saute dans son navire et hisse la voile !",
            "Dans le ciel, une chouette tournoie : c'est la chouette d'Athéna, la déesse qui protège Ulysse.\n\n« Hou hou ! Suis-moi : cap sur l'île d'Éole, le roi des vents ! »",
        ],
        [
            "La reine des harpies s'enfuit en lâchant le grand sac des vents !\n\nLe roi Éole le rend à Ulysse :\n\n« Merci, héros ! Je souffle un bon vent dans ta voile ! »",
            "Mais pendant la nuit, un marin curieux ouvre le sac...\n\nWOUUUSH ! Tous les vents s'échappent d'un coup !\n\nLe navire atterrit sur l'île de Circé la magicienne.",
        ],
        [
            "« D'accord, d'accord, tu as gagné ! » dit Circé.\n\nPOF ! Les cochons redeviennent des marins. Hourra !\n\nPour se faire pardonner, Circé prépare un grand banquet.",
            "« Écoute-moi bien, Ulysse » dit Circé.\n\n« Sur ta route chantent les sirènes : bouche les oreilles de tes marins avec de la cire !\n\nEt méfie-toi de Charybde, le tourbillon qui avale les bateaux ! »",
        ],
        [
            "La Reine des Sirènes replonge dans la mer, toute vexée :\n\n« Personne ne veut écouter ma chanson ! Snif ! »\n\nLes marins d'Ulysse rament de toutes leurs forces.",
            "Le navire passe tout près de Charybde, l'énorme tourbillon... OUF !\n\nDevant, une montagne monte jusqu'aux étoiles :\n\nc'est la Montagne des Titans, le dernier chemin vers Ithaque.",
        ],
        [
            "Atlas s'assoit doucement, le ciel toujours sur les épaules :\n\n« Pardon, petit héros. Ça fait mille ans que personne ne vient me voir.\n\nJe voulais juste jouer... »",
            "Ulysse lui raconte tout son voyage, et Atlas sourit pour la première fois depuis mille ans.\n\n« Ithaque est droit devant. Mais je sens que Poséidon t'attend sur la mer...\n\nBonne chance, Ulysse ! »",
        ],
    ]

    export const ending: string[] = [
        "Zeus, le roi des dieux, apparaît dans un grand éclair, avec Héra la reine des dieux :\n\n« ÇA SUFFIT, Poséidon mon frère ! Ce héros a bien mérité de rentrer chez lui ! »",
        "Poséidon baisse son trident... et se met à sourire :\n\n« C'est vrai qu'il est courageux, ce petit. D'accord !\n\nJe pousse même son bateau ! »\n\nEt une belle vague porte Ulysse jusqu'à Ithaque.",
        "ITHAQUE !\n\nPénélope serre Ulysse très fort dans ses bras, et Télémaque saute de joie.\n\nAthéna, Zeus et Héra regardent la fête depuis l'Olympe en souriant.",
        "BRAVO !\n\nAprès ce long voyage, Ulysse est enfin rentré chez lui.\n\nTu es un vrai héros !\n\nFIN",
    ]

    export const owlIntro: string[] = [
        "Hou hou ! Je suis la chouette d'Athéna, la déesse de la sagesse.\n\nCette porte magique ne s'ouvre pas avec les muscles... mais avec la tête !",
        "Choisis avec les flèches et valide avec A.\n\nSi tu te trompes, ce n'est pas grave : je t'aiderai !",
    ]

    export const defeat =
        "Oh non ! Ulysse est tout étourdi...\n\nMême les héros tombent parfois. On réessaie !"

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
