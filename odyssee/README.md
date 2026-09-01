# L'Odyssée d'Ulysse

Un jeu de plateforme mythologique, écrit pour un enfant de 6 ans qui a fini
« Lila la fée ». Même façon de jouer, nouvelle grande histoire : Ulysse a gagné
la guerre de Troie et veut rentrer à Ithaque retrouver Pénélope et Télémaque.
Mais Poséidon, le dieu de la mer, est fâché...

## Le voyage (6 niveaux, 6 boss)

1. **L'île du Cyclope** — Polyphème le Cyclope, le fils de Poséidon
2. **L'île d'Éole** — la Reine des Harpies a volé le sac des vents
3. **L'île de Circé** — la magicienne qui transforme les marins en cochons
4. **La Mer des Sirènes** — sur le pont du navire, la Reine des Sirènes
5. **La Montagne des Titans** — Atlas, le Titan qui porte le ciel
6. **La Tempête de Poséidon** — le pont mouillé glisse, et Poséidon en personne

Les dieux accompagnent le voyage : la chouette d'Athéna pose ses énigmes aux
portes des temples, et Zeus et Héra viennent calmer Poséidon à la fin.

## Comment jouer

- **Flèches** : marcher — **A** : sauter (rester appuyé : planer)
- **B** : tirer une flèche avec l'arc d'Ulysse
- **Amphore** : effet surprise (force d'Héraclès, bouclier d'Athéna, pluie de
  pièces d'or, tortue...)
- **Fleur de lotus** : transformation (aigle de Zeus qui vole, satyre qui saute
  très haut, centaure qui court très vite)
- Sur l'écran titre : **B** choisit le niveau de départ, **BAS + A** lance le
  mode démo, **HAUT + A** va directement au boss.

## Les fichiers

- `main.ts` — l'enchaînement du jeu (titre, niveaux, boss, fin) ; à garder en
  dernier dans `pxt.json`
- `levels.ts` — les niveaux dessinés en ASCII
- `player.ts` — Ulysse : déplacements, arc, amphores, transformations
- `enemies.ts` — les ennemis qui marchent et qui volent
- `bosses.ts` — les six boss
- `story.ts` — toutes les pages d'histoire
- `puzzles.ts` — les énigmes de la chouette d'Athéna
- `autoplay.ts` — le mode démo (robot de test)
- `assets.ts` — tout le pixel art
- `font.ts` — lien vers la police accentuée commune

## Construire et tester

```sh
cd odyssee
../node_modules/.bin/makecode build -j        # simulateur
../node_modules/.bin/makecode serve -p 7003   # page du simulateur
../node_modules/.bin/makecode build           # UF2 natif (vérifie la taille !)
node ../tools/deploy.mjs built/stm32f401/binary.uf2
```

Tests automatiques depuis la racine du dépôt :

```sh
node tools/checklevels.mjs odyssee/levels.ts
SIM_SPEED=4 node tools/play-odyssee.mjs 400 5
```
