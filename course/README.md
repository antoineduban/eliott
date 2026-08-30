# Vroum !

Jeu de course MakeCode Arcade pour la console ELECFREAKS Arcade, en français, pour un enfant de 6 ans.
Second projet du dépôt (le premier est « Lila la fée », à la racine) : il a son propre binaire.

Vroum, une petite voiture rouge, participe à la grande course des animaux : cinq courses de plus en plus
rapides (campagne, plage, forêt, neige, ville la nuit). La route défile, il faut éviter les obstacles
(bottes de foin, crabes, hérissons qui traversent, pingouins, cônes, voitures plus lentes...) et ramasser
les étoiles jusqu'à la ligne d'arrivée.

**Commandes** : flèches gauche / droite = tourner, A = turbo, B = klaxon. Un choc coûte un cœur et ralentit
la voiture ; à 0 cœur la course recommence (pas de game over). Sur l'écran titre, B choisit la course de
départ ; BAS + A lance le mode démo.

## Fichiers

| Fichier | Rôle |
| --- | --- |
| `race.ts` | Enchaînement (titre, compte à rebours, course, arrivée, fin), route, obstacles, chocs |
| `tracks.ts` | Les cinq courses : couleurs, vitesse, longueur, obstacles, décors |
| `assets.ts` | Pixel art et décors dessinés en code |
| `autoplay.ts` | Mode démo (la voiture se conduit seule), utilisé par les tests |
| `font.ts` | Lien vers `../font.ts` (lettres accentuées) |

## Développer et tester (depuis la racine du dépôt)

```sh
cd course && ../node_modules/.bin/makecode build -j          # simulateur (course/built/binary.js)
cd course && ../node_modules/.bin/makecode serve -p 7002     # simulateur local sur http://localhost:7002
SIM_SPEED=4 node tools/play-race.mjs 300 5                   # le robot fait toutes les courses (temps x4)
cd course && ../node_modules/.bin/makecode build             # binaire natif : course/built/stm32f401/binary.uf2
node tools/deploy.mjs course/built/stm32f401/binary.uf2      # flasher la console
```
