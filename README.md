# Lila la fée

Jeu de plateforme MakeCode Arcade pour la console ELECFREAKS Arcade (STM32F401), entièrement en français.

Le dépôt contient un second jeu, **« Vroum ! »** (course de voiture), dans le dossier [`course/`](course/) : c'est un
projet MakeCode séparé avec son propre binaire (voir son `README.md`). Un seul jeu à la fois sur la console.

Lila, une petite fée, part récupérer les étoiles volées par la Sorcière Cracra, puis recoller la Lune cassée en trois morceaux. Six niveaux (forêt, grotte, château des nuages, plage des pirates, montagne de glace, volcan), six boss (sorcière, dragon, Roi des Ombres, Crabe Pirate, Yéti Frileux, Magma le Golem), une histoire racontée entre les niveaux.

**Commandes** : flèches = marcher, A = sauter (maintenir pour planer), B = magie. Sur l'écran titre, B choisit le niveau de départ. Tomber dans l'eau / la lave / l'orage coûte un cœur et ramène Lila au dernier endroit sûr ; marcher sur des piques coûte un cœur. À 0 cœur, le niveau (ou le boss) recommence : pas de game over définitif.

**Les énigmes du Hibou Savant** : dans chaque niveau, une porte magique barre le chemin. Le hibou pose une petite énigme (jeu différent, aux flèches + A) : compter les étoiles, trouver l'intrus, continuer la suite logique, ou répéter la mélodie des cristaux (comme un Simon, avec les flèches). Après trois erreurs, le hibou montre la réponse : on n'est jamais bloqué.

**Objets magiques** : les potions ont un effet surprise (Super Lila invincible, toute petite, escargot, bouclier, un cœur, pluie d'étoiles) ; les champignons bleus transforment Lila pendant 8 s en papillon (elle vole : A maintenu), grenouille (saute très haut) ou lapin (court très vite). Sur la montagne de glace, le sol est glissant.

Les deux anciens jeux (Fruits et fromage, Vaisseau spatial) sont conservés dans `archive/` mais ne sont plus compilés.

## Fichiers

| Fichier | Rôle |
| --- | --- |
| `main.ts` | Enchaînement du jeu (titre, histoire, niveaux, boss, fin), collisions, contrôles, affichage |
| `player.ts` | Lila : déplacements, saut, vol plané, magie, dégâts, potions et transformations |
| `enemies.ts` | Ennemis qui marchent / volent |
| `bosses.ts` | Les six boss et leur barre de vie |
| `levels.ts` | Niveaux dessinés en ASCII (`#` sol, `=` plateforme, `^` piques, `*` étoile, `h` cœur, `p` potion, `m` champignon, `?` porte à énigme, `e`/`b` ennemis, `F` portail, `~` danger) |
| `assets.ts` | Pixel art (sprites, tuiles, décors) |
| `story.ts` | Textes de l'histoire |
| `puzzles.ts` | Les énigmes du Hibou Savant (compter, intrus, suite logique, mélodie des cristaux) |
| `font.ts` | Ajoute les lettres accentuées à la police MakeCode |
| `autoplay.ts` | Mode démo : le jeu se joue tout seul (sur l'écran titre : maintenir BAS + A). Sert aux tests automatiques |
| `tools/checklevels.mjs` | Vérifie les règles de conception des niveaux (largeurs, plateformes au-dessus des trous, ennemis volants) |

## Développer

```sh
yarn                                   # dépendances (makecode CLI, playwright-core, usb)
./node_modules/.bin/makecode build -j  # compile pour le simulateur (built/binary.js)
./node_modules/.bin/makecode serve     # simulateur local sur http://localhost:7001 (recompile à chaque modif)
yarn lint                              # biome (format + lint)
node tools/checklevels.mjs             # vérifie les niveaux après les avoir modifiés
```

Raccourcis sur l'écran titre : B change le niveau de départ, HAUT + A va directement au boss du niveau choisi, BAS + A lance le mode démo.

## Tester automatiquement (simulateur piloté par Playwright)

Le serveur `makecode serve` doit tourner.

```sh
SIM_SPEED=4 node tools/play.mjs 400 5     # le robot joue toute la partie (temps x4), captures toutes les 5 s
SIM_SPEED=4 node tools/play.mjs 150 5 6   # idem en partant du niveau 6
node tools/sim.mjs "wait 2000; shot titre; press z; wait 800; shot histoire; log"   # scénario manuel
```

Les captures vont dans `tools/shots/`. Le jeu écrit sa progression sur la console (`LEVEL 1 START`, `STAR 5`, `POTION ...`, `MUSHROOM ...`, `PUZZLE`, `PUZZLE SOLVED`, `BOSS ... hp=2`, `DEFEAT`, `VICTOIRE`) et `play.mjs` l'affiche. Une partie complète prend 5 à 6 minutes de jeu (1 min 30 réelle à x4).

## Déployer sur la console

```sh
./node_modules/.bin/makecode build     # firmware natif : built/stm32f401/binary.uf2 (variante dans mkc.json)
node tools/deploy.mjs                  # redémarre la console en bootloader (USB HF2) puis copie le .uf2
node tools/deploy.mjs --info           # état de la console
```

Si le disque UF2 n'apparaît pas tout seul, mettre la console en mode bootloader à la main (bouton reset) puis relancer `node tools/deploy.mjs` : il copie le fichier sur le disque déjà monté.
