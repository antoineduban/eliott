// ============================================
// POLICE FRANÇAISE
// La police 8px de MakeCode ne contient que l'ASCII.
// On lui ajoute les lettres accentuées pour écrire en français.
// ============================================

// biome-ignore lint/correctness/noUnusedVariables: utilisé par main.ts
namespace FrenchFont {
    // Format identique à image.font8 : 2 octets de code (petit-boutiste)
    // puis 6 colonnes de 8 bits (bit 0 = ligne du haut).
    // Les entrées doivent rester triées par code croissant.
    const extraGlyphs = hex`
        ab00001028102800 bb00002810281000
        c000781513147800 c700003c42c22400 c800007f4b4a4200 c900007e4b4b4200 ca00007f4b4b4200
        e0000030494a7800 e2000032494a7800 e700003048c84800
        e8000030695a5000 e90000306a595000 ea000032695a5000 eb000032685a5000
        ee00004a79420000 ef00004a78420000
        f4000032494a3000 f6000032484a3000
        f900003841427800 fb00003a41427800 fc00003a40427800
    `

    export function install() {
        image.font8.data = image.font8.data.concat(extraGlyphs)
    }
}
