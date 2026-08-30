// ============================================
// LILA LA FÉE
// Un jeu de plateforme magique
// ============================================

namespace Game {
    export enum State {
        Title = 0,
        Transition = 1,
        Playing = 2,
        Boss = 3,
        Ending = 4,
    }

    export const ItemKind = SpriteKind.create()
    export const HeartKind = SpriteKind.create()
    export const PortalKind = SpriteKind.create()
    export const PotionKind = SpriteKind.create()
    export const MushroomKind = SpriteKind.create()
    export const DecoKind = SpriteKind.create()

    export let state = State.Title
    let levelIndex = 0
    // Niveau choisi sur l'écran titre (B pour changer)
    let chosenLevel = 0
    let bannerText = ""
    let bannerUntil = 0
    let bigFont: image.Font = null
    let titleFairy: Sprite = null

    // Horloge globale (game.runtime() repart de zéro dans chaque dialogue)
    function now(): number {
        return control.millis()
    }

    export function showBanner(text: string, ms: number) {
        bannerText = text
        bannerUntil = now() + ms
    }

    // Pluie d'étoiles (potion) : des étoiles jaillissent et retombent
    export function dropStars(x: number, y: number) {
        for (let i = 0; i < 4; i++) {
            const s = sprites.create(Assets.star, ItemKind)
            s.setPosition(x, y)
            s.vx = (i - 1.5) * 40
            s.vy = -120
            s.ay = 250
            s.z = 3
        }
    }

    function clearAll() {
        Enemies.clearAll()
        Bosses.clear()
        sprites.destroyAllSpritesOfKind(Player.Kind)
        sprites.destroyAllSpritesOfKind(Player.MagicKind)
        sprites.destroyAllSpritesOfKind(ItemKind)
        sprites.destroyAllSpritesOfKind(HeartKind)
        sprites.destroyAllSpritesOfKind(PortalKind)
        sprites.destroyAllSpritesOfKind(Puzzles.GateKind)
        sprites.destroyAllSpritesOfKind(PotionKind)
        sprites.destroyAllSpritesOfKind(MushroomKind)
        sprites.destroyAllSpritesOfKind(Player.BubbleKind)
        sprites.destroyAllSpritesOfKind(DecoKind)
        Player.sprite = null
        titleFairy = null
    }

    // ---------- Écran titre ----------
    function showTitle() {
        state = State.Title
        clearAll()
        tiles.setCurrentTilemap(null)
        scene.setBackgroundImage(Assets.background(Assets.THEME_FOREST))
        scene.centerCameraAt(80, 60)
        titleFairy = sprites.create(Assets.fairyR[0], DecoKind)
        titleFairy.setPosition(80, 66)
        for (let i = 0; i < 5; i++) {
            const s = sprites.create(Assets.star, DecoKind)
            s.setPosition(20 + i * 30, 30 + (i % 2) * 10)
        }
    }

    // ---------- Écran de fin ----------
    function showEnding() {
        state = State.Ending
        clearAll()
        tiles.setCurrentTilemap(null)
        scene.setBackgroundImage(Assets.background(Assets.THEME_SKY))
        scene.centerCameraAt(80, 60)
        info.showLife(false)
        titleFairy = sprites.create(Assets.fairyR[0], DecoKind)
        titleFairy.setPosition(80, 78)
        for (let i = 0; i < 6; i++) {
            const s = sprites.create(Assets.star, DecoKind)
            s.setPosition(15 + i * 26, 72 + (i % 2) * 16)
        }
        effects.confetti.startScreenEffect()
        music.powerUp.play()
    }

    function beginAdventure(straightToBoss: boolean) {
        state = State.Transition
        control.runInParallel(() => {
            music.magicWand.play()
            info.setScore(0)
            if (straightToBoss) {
                // Raccourci (HAUT + A sur le titre) : directement au boss
                levelIndex = chosenLevel
                Story.tell(Story.bossIntro[levelIndex])
                startBoss(levelIndex)
                return
            }
            if (chosenLevel === 0) Story.tell(Story.intro)
            startLevel(chosenLevel)
        })
    }

    // ---------- Niveaux ----------
    function spawnLevelObjects(theme: number) {
        for (const sp of Levels.spawns) {
            const x = Levels.colX(sp.col)
            const bottom = Levels.rowBottom(sp.row)
            const y = Levels.rowY(sp.row)
            if (sp.kind === "P") {
                Player.spawn(x, bottom - 8)
            } else if (sp.kind === "*") {
                const s = sprites.create(Assets.star, ItemKind)
                s.setPosition(x, y)
                s.z = 3
            } else if (sp.kind === "h") {
                const s = sprites.create(Assets.heart, HeartKind)
                s.setPosition(x, y)
                s.z = 3
            } else if (sp.kind === "p") {
                const s = sprites.create(Assets.potionItem, PotionKind)
                s.setPosition(x, y)
                s.z = 3
            } else if (sp.kind === "m") {
                const s = sprites.create(Assets.magicMushroom, MushroomKind)
                s.x = x
                s.bottom = bottom
                s.z = 3
            } else if (sp.kind === "?") {
                const s = sprites.create(Puzzles.gateImage(), Puzzles.GateKind)
                s.x = x
                s.bottom = bottom
                s.z = 2
            } else if (sp.kind === "F") {
                const s = sprites.create(Assets.portal, PortalKind)
                s.x = x
                s.bottom = bottom
                s.z = 2
            } else if (sp.kind === "e") {
                Enemies.spawnWalker(x, bottom, theme)
            } else if (sp.kind === "b") {
                Enemies.spawnFlyer(x, y, theme)
            }
        }
    }

    export function startLevel(index: number) {
        state = State.Transition
        levelIndex = index
        clearAll()
        const level = Levels.levels[index]
        Levels.load(level.rows, level.theme)
        info.setLife(3)
        spawnLevelObjects(level.theme)
        showBanner(`${index + 1}. ${level.name}`, 2500)
        console.log(`LEVEL ${index + 1} START`)
        state = State.Playing
    }

    function startBoss(index: number) {
        state = State.Transition
        clearAll()
        const level = Levels.levels[index]
        Levels.load(Levels.arena, level.theme)
        info.setLife(3)
        spawnLevelObjects(level.theme)
        Bosses.start(index, Levels.widthPx, Levels.heightPx - Levels.TILE)
        showBanner("BOSS !", 2000)
        console.log(`BOSS ${index + 1} START`)
        state = State.Boss
    }

    function onPortal() {
        if (state !== State.Playing) return
        state = State.Transition
        Player.disable()
        console.log("PORTAL")
        control.runInParallel(() => {
            music.magicWand.play()
            pause(600)
            Story.tell(Story.bossIntro[levelIndex])
            startBoss(levelIndex)
        })
    }

    // La porte du Hibou Savant : une énigme pour l'ouvrir
    function onGate(gate: Sprite) {
        if (state !== State.Playing) return
        state = State.Transition
        Player.disable()
        console.log("PUZZLE")
        control.runInParallel(() => {
            music.magicWand.play()
            const ok = Puzzles.run(levelIndex)
            if (ok) {
                gate.destroy(effects.spray, 400)
                music.magicWand.play()
                console.log("PUZZLE SOLVED")
                showBanner("La porte s'ouvre !", 2000)
            } else if (Player.sprite) {
                Player.sprite.x = gate.x - 24
                Player.sprite.vx = 0
            }
            Player.enable()
            state = State.Playing
        })
    }

    export function onBossDefeated() {
        if (state !== State.Boss) return
        state = State.Transition
        Player.disable()
        console.log(`BOSS ${levelIndex + 1} DEFEATED`)
        control.runInParallel(() => {
            pause(1500)
            if (levelIndex >= Levels.levels.length - 1) {
                Story.tell(Story.ending)
                console.log("VICTOIRE")
                showEnding()
            } else {
                Story.tell(Story.afterBoss[levelIndex])
                startLevel(levelIndex + 1)
            }
        })
    }

    function onDefeat() {
        if (state !== State.Playing && state !== State.Boss) return
        const wasBoss = state === State.Boss
        state = State.Transition
        Player.disable()
        console.log("DEFEAT")
        control.runInParallel(() => {
            pause(800)
            Story.show(Story.defeat, DialogLayout.Bottom)
            if (wasBoss) startBoss(levelIndex)
            else startLevel(levelIndex)
        })
    }

    // ---------- Collisions ----------
    sprites.onOverlap(Player.Kind, ItemKind, (_p, star) => {
        star.destroy(effects.spray, 150)
        info.changeScoreBy(1)
        music.baDing.play()
        console.log(`STAR ${info.score()}`)
    })

    sprites.onOverlap(Player.Kind, HeartKind, (_p, heart) => {
        heart.destroy(effects.hearts, 300)
        if (info.life() < 5) info.changeLifeBy(1)
        music.powerUp.play()
    })

    sprites.onOverlap(Player.Kind, PortalKind, (_p, _portal) => {
        onPortal()
    })

    sprites.onOverlap(Player.Kind, Puzzles.GateKind, (_p, gate) => {
        onGate(gate)
    })

    sprites.onOverlap(Player.Kind, PotionKind, (_p, potion) => {
        if (state !== State.Playing) return
        potion.destroy(effects.spray, 200)
        Player.drinkPotion()
    })

    sprites.onOverlap(Player.Kind, MushroomKind, (_p, mushroom) => {
        if (state !== State.Playing) return
        mushroom.destroy(effects.spray, 200)
        Player.eatMushroom()
    })

    sprites.onOverlap(Player.Kind, Enemies.Kind, (p, enemy) => {
        if (state !== State.Playing && state !== State.Boss) return
        // Super Lila écrase tout ; sauter sur un ennemi l'élimine aussi
        if (Player.isSuper() || (p.vy > 0 && p.bottom < enemy.y + 2)) {
            Enemies.kill(enemy)
            if (!Player.isSuper()) Player.bounce()
        } else {
            Player.hurt(enemy.x)
        }
    })

    sprites.onOverlap(Player.MagicKind, Enemies.Kind, (magic, enemy) => {
        magic.destroy()
        Enemies.kill(enemy)
    })

    sprites.onOverlap(Player.MagicKind, Bosses.Kind, (magic, _boss) => {
        magic.destroy(effects.spray, 100)
        Bosses.hit()
    })

    sprites.onOverlap(
        Player.MagicKind,
        Bosses.ShotKind,
        (magic, projectile) => {
            magic.destroy()
            projectile.destroy(effects.spray, 150)
            info.changeScoreBy(1)
        },
    )

    sprites.onOverlap(Player.Kind, Bosses.Kind, (_p, boss) => {
        if (state !== State.Boss) return
        Player.hurt(boss.x)
    })

    sprites.onOverlap(Player.Kind, Bosses.ShotKind, (_p, projectile) => {
        if (state !== State.Boss) return
        projectile.destroy(effects.fire, 150)
        Player.hurt(projectile.x)
    })

    info.onLifeZero(() => {
        onDefeat()
    })

    // ---------- Contrôles ----------
    controller.A.onEvent(ControllerButtonEvent.Pressed, () => {
        if (state === State.Title) {
            if (controller.down.isPressed()) {
                Autoplay.start()
                showBanner("MODE DÉMO", 3000)
            }
            beginAdventure(controller.up.isPressed())
        } else if (state === State.Ending) {
            control.reset()
        } else Player.jumpPressed()
    })
    controller.up.onEvent(ControllerButtonEvent.Pressed, () => {
        if (state === State.Playing || state === State.Boss)
            Player.jumpPressed()
    })
    controller.B.onEvent(ControllerButtonEvent.Pressed, () => {
        if (state === State.Playing || state === State.Boss) {
            Player.magicPressed()
        } else if (state === State.Title) {
            chosenLevel = (chosenLevel + 1) % Levels.levels.length
            music.baDing.play()
        }
    })

    // ---------- Boucle principale ----------
    game.onUpdate(() => {
        const dt = game.eventContext().deltaTime
        if (
            state === State.Playing ||
            state === State.Boss ||
            state === State.Transition
        ) {
            Player.update(dt)
            Enemies.update(dt)
        }
        if (state === State.Boss) {
            Bosses.update(dt)
        }
        if ((state === State.Title || state === State.Ending) && titleFairy) {
            const baseY = state === State.Title ? 66 : 78
            titleFairy.y = baseY + Math.sin(now() / 300) * 4
            titleFairy.setImage(Assets.fairyR[Math.idiv(now(), 150) % 2])
        }
    })

    // ---------- Affichage par-dessus le jeu ----------
    game.onShade(() => {
        if (state === State.Title) {
            screen.fillRect(0, 22, 160, 30, 15)
            screen.printCenter("LILA LA FÉE", 26, 5, bigFont)
            screen.printCenter("Une aventure magique", 42, 1, image.font5)
            if (Math.idiv(now(), 500) % 2 === 0) {
                screen.printCenter("Appuie sur A", 98, 1, image.font8)
            }
            screen.printCenter(
                `B : niveau ${chosenLevel + 1} / ${Levels.levels.length}`,
                110,
                1,
                image.font5,
            )
        }
        if (state === State.Ending) {
            screen.fillRect(0, 16, 160, 46, 15)
            screen.printCenter("VICTOIRE !", 20, 5, bigFont)
            screen.printCenter(`Étoiles : ${info.score()}`, 40, 1, image.font8)
            screen.printCenter("Merci d'avoir joué !", 51, 3, image.font8)
            if (Math.idiv(now(), 500) % 2 === 0) {
                screen.printCenter(
                    "Appuie sur A pour rejouer",
                    104,
                    1,
                    image.font8,
                )
            }
        }
        if (bannerUntil > now()) {
            const w = bannerText.length * 6 + 12
            const x = (screen.width - w) / 2
            screen.fillRect(x, 50, w, 16, 15)
            screen.drawRect(x, 50, w, 16, 5)
            screen.printCenter(bannerText, 54, 5, image.font8)
        }
        if (state === State.Playing || state === State.Boss) {
            const hud = Player.hudText()
            if (hud.length > 0) {
                screen.fillRect(0, 109, hud.length * 6 + 4, 11, 15)
                screen.print(hud, 2, 111, 5, image.font8)
            }
        }
        Bosses.drawHud()
    })

    export function start() {
        FrenchFont.install()
        bigFont = image.doubledFont(image.font8)
        game.setGameOverScoringType(game.ScoringType.HighScore)
        showTitle()
    }
}

Game.start()
