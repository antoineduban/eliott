# Lila la fée

Jeu de plateforme MakeCode Arcade pour la console ELECFREAKS Arcade (STM32F401), entièrement en français.

Lila, une petite fée, part récupérer les étoiles volées par la Sorcière Cracra. Trois niveaux (forêt, grotte, château des nuages), trois boss (sorcière, dragon, Roi des Ombres), une histoire racontée entre les niveaux.

**Commandes** : flèches = marcher, A = sauter (maintenir pour planer), B = magie. Tomber dans l'eau / la lave / l'orage coûte un cœur et ramène Lila au dernier endroit sûr. À 0 cœur, le niveau (ou le boss) recommence : pas de game over définitif.

Les deux anciens jeux (Fruits et fromage, Vaisseau spatial) sont conservés dans `archive/` mais ne sont plus compilés.

## Fichiers

| Fichier | Rôle |
| --- | --- |
| `main.ts` | Enchaînement du jeu (titre, histoire, niveaux, boss, fin), collisions, contrôles, affichage |
| `player.ts` | Lila : déplacements, saut, vol plané, magie, dégâts |
| `enemies.ts` | Ennemis qui marchent / volent |
| `bosses.ts` | Les trois boss et leur barre de vie |
| `levels.ts` | Niveaux dessinés en ASCII (`#` sol, `=` plateforme, `*` étoile, `e`/`b` ennemis, `F` portail, `~` danger) |
| `assets.ts` | Pixel art (sprites, tuiles, décors) |
| `story.ts` | Textes de l'histoire |
| `font.ts` | Ajoute les lettres accentuées à la police MakeCode |
| `autoplay.ts` | Mode démo : le jeu se joue tout seul (sur l'écran titre : maintenir BAS + A). Sert aux tests automatiques |

## Développer

```sh
yarn                                   # dépendances (makecode CLI, playwright-core, usb)
./node_modules/.bin/makecode build -j  # compile pour le simulateur (built/binary.js)
./node_modules/.bin/makecode serve     # simulateur local sur http://localhost:7001 (recompile à chaque modif)
yarn lint                              # biome (format + lint)
```

## Tester automatiquement (simulateur piloté par Playwright)

Le serveur `makecode serve` doit tourner.

```sh
SIM_SPEED=4 node tools/play.mjs 150 3     # le robot joue toute la partie (temps x4), captures toutes les 3 s
node tools/sim.mjs "wait 2000; shot titre; press z; wait 800; shot histoire; log"   # scénario manuel
```

Les captures vont dans `tools/shots/`. Le jeu écrit sa progression sur la console (`LEVEL 1 START`, `STAR 5`, `BOSS ... hp=2`, `DEFEAT`, `VICTOIRE`) et `play.mjs` l'affiche.

## Déployer sur la console

```sh
./node_modules/.bin/makecode build     # firmware natif : built/stm32f401/binary.uf2 (variante dans mkc.json)
node tools/deploy.mjs                  # redémarre la console en bootloader (USB HF2) puis copie le .uf2
node tools/deploy.mjs --info           # état de la console
```

Si le disque UF2 n'apparaît pas tout seul, mettre la console en mode bootloader à la main (bouton reset) puis relancer `node tools/deploy.mjs` : il copie le fichier sur le disque déjà monté.
