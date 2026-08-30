// ============================================
// VROUM ! : la course
// La route défile vers le bas, on tourne à gauche / à droite pour éviter les
// obstacles, on ramasse les étoiles, on passe la ligne d'arrivée.
// ============================================

// biome-ignore lint/correctness/noUnusedVariables: utilisé par main.ts
namespace Race {
    export enum State {
        Title = 0,
        Transition = 1, // histoire, arrivée, redémarrage
        Countdown = 2,
        Racing = 3,
        Ending = 4,
    }

    export const CarKind = SpriteKind.create()
    export const ObstacleKind = SpriteKind.create()
    export const ItemKind = SpriteKind.create()
    export const DecorKind = SpriteKind.create()
    export const FinishKind = SpriteKind.create()

    export const ROAD_LEFT = 30
    export const ROAD_RIGHT = 130
    const CAR_Y = 96
    const STEER_SPEED = 90
    const TURBO = 1.35
    const INVINCIBLE_MS = 1500
    const SLOW_MS = 900
    const CROSSING_SPEED = 35

    export let state = State.Title
    export let car: Sprite = null
    export let speed = 0 // vitesse de défilement actuelle (pixels / s)
    export let turbo = false
    export let distance = 0

    class Mover {
        sprite: Sprite
        kind: number
        dir: number
        constructor(sprite: Sprite, kind: number, dir: number) {
            this.sprite = sprite
            this.kind = kind
            this.dir = dir
        }
    }

    let tracks: Tracks.Track[] = []
    let track: Tracks.Track = null
    let trackIndex = 0
    let chosenTrack = 0
    let obstacles: Mover[] = []
    let scrollOffset = 0
    let nextWaveAt = 0
    let nextDecorAt = 0
    let finishSpawned = false
    let invincibleUntil = 0
    let slowUntil = 0
    let bannerText = ""
    let bannerUntil = 0
    let countText = ""
    let countUntil = 0
    let bigFont: image.Font = null

    // Horloge globale (game.runtime() repart de zéro dans chaque dialogue)
    function now(): number {
        return control.millis()
    }

    export function showBanner(text: string, ms: number) {
        bannerText = text
        bannerUntil = now() + ms
    }

    // showLongText saute le caractère qui suit un "\n" : on protège les
    // lignes vides avec un espace
    function tell(text: string) {
        let out = ""
        for (let i = 0; i < text.length; i++) {
            const ch = text.charAt(i)
            if (ch === "\n" && text.charAt(i + 1) === "\n") {
                out += "\n \n"
                i++
            } else {
                out += ch
            }
        }
        game.showLongText(out, DialogLayout.Full)
    }

    function clearAll() {
        sprites.destroyAllSpritesOfKind(CarKind)
        sprites.destroyAllSpritesOfKind(ObstacleKind)
        sprites.destroyAllSpritesOfKind(ItemKind)
        sprites.destroyAllSpritesOfKind(DecorKind)
        sprites.destroyAllSpritesOfKind(FinishKind)
        obstacles = []
        car = null
    }

    function spawnCar() {
        car = sprites.create(Assets.car, CarKind)
        car.setPosition(80, CAR_Y)
        car.z = 10
    }

    // ---------- Écran titre ----------
    function showTitle() {
        state = State.Title
        clearAll()
        track = tracks[0]
        scene.setBackgroundColor(track.ground)
        info.showLife(false)
        info.showScore(false)
        speed = 45
        spawnCar()
        car.y = 84
    }

    function startAdventure() {
        state = State.Transition
        info.setScore(0)
        info.showScore(true)
        control.runInParallel(() => {
            if (chosenTrack === 0) {
                tell(
                    "Vroum est une petite voiture rouge.\n\nAujourd'hui, c'est la grande course des animaux : cinq courses, de plus en plus rapides !",
                )
                tell(
                    "Comment jouer :\n\nFlèches : tourner\nA : turbo (plus vite !)\nB : klaxon\n\nÉvite les obstacles et ramasse les étoiles !",
                )
            }
            beginRace(chosenTrack, true)
        })
    }

    // ---------- Une course ----------
    function beginRace(index: number, withIntro: boolean) {
        state = State.Transition
        trackIndex = index
        track = tracks[index]
        clearAll()
        scene.setBackgroundColor(track.ground)
        info.showLife(true)
        info.setLife(3)
        spawnCar()
        distance = 0
        nextWaveAt = 260
        nextDecorAt = 0
        finishSpawned = false
        speed = 0
        turbo = false
        invincibleUntil = 0
        slowUntil = 0
        console.log(`RACE ${index + 1} START`)
        control.runInParallel(() => {
            if (withIntro) tell(track.intro)
            countdown()
        })
    }

    function countdown() {
        state = State.Countdown
        showBanner(`${trackIndex + 1}. ${track.name}`, 1400)
        pause(1500)
        const steps = ["3", "2", "1"]
        for (const s of steps) {
            countText = s
            countUntil = now() + 900
            music.playTone(440, 150)
            pause(650)
        }
        countText = "PARTEZ !"
        countUntil = now() + 1000
        music.playTone(880, 350)
        state = State.Racing
    }

    // ---------- Apparition des obstacles, étoiles et décors ----------
    function laneX(lane: number): number {
        return ROAD_LEFT + 17 + lane * 33
    }

    function placeObstacle(lane: number) {
        const def = track.obstacles[randint(0, track.obstacles.length - 1)]
        const s = sprites.create(def.image, ObstacleKind)
        s.z = 5
        let dir = 0
        if (def.kind === Tracks.CROSSING) {
            // arrive par un bord de la route et traverse
            dir = Math.random() < 0.5 ? 1 : -1
            s.x = dir > 0 ? ROAD_LEFT + 8 : ROAD_RIGHT - 8
        } else {
            s.x = laneX(lane) + randint(-6, 6)
        }
        s.bottom = 0
        obstacles.push(new Mover(s, def.kind, dir))
    }

    function spawnWave() {
        const first = randint(0, 2)
        placeObstacle(first)
        let second = -1
        if (Math.random() < track.doubleChance) {
            second = (first + randint(1, 2)) % 3
            placeObstacle(second)
        }
        // une étoile dans une voie libre, une fois sur deux
        if (Math.random() < 0.5) {
            let lane = randint(0, 2)
            while (lane === first || lane === second) lane = (lane + 1) % 3
            const star = sprites.create(Assets.star, ItemKind)
            star.x = laneX(lane)
            star.bottom = -20
            star.z = 4
        }
    }

    function spawnDecor() {
        const im = track.decor[randint(0, track.decor.length - 1)]
        const s = sprites.create(im, DecorKind)
        const leftSide = Math.random() < 0.5
        const margin = Math.max(0, ROAD_LEFT - im.width)
        const x = randint(0, margin)
        s.left = leftSide ? x : ROAD_RIGHT + margin - x
        s.bottom = 0
        s.z = 1
    }

    function spawnFinish() {
        const f = sprites.create(
            Assets.finishLine(ROAD_RIGHT - ROAD_LEFT),
            FinishKind,
        )
        f.left = ROAD_LEFT
        f.bottom = 0
        f.z = 2
    }

    // ---------- Boucle de la course ----------
    function updateRacing(dt: number) {
        const t = now()
        // Vitesse : turbo avec A, ralenti après un choc
        turbo = controller.A.isPressed() && t >= slowUntil
        let target = track.speed * (turbo ? TURBO : 1)
        if (t < slowUntil) target = track.speed * 0.45
        speed += (target - speed) * Math.min(1, dt * 3)
        distance += speed * dt

        // Direction
        let vx = 0
        if (controller.left.isPressed()) vx = -STEER_SPEED
        else if (controller.right.isPressed()) vx = STEER_SPEED
        car.vx = vx
        if (car.left < ROAD_LEFT + 1) {
            car.left = ROAD_LEFT + 1
            if (car.vx < 0) car.vx = 0
        } else if (car.right > ROAD_RIGHT - 1) {
            car.right = ROAD_RIGHT - 1
            if (car.vx > 0) car.vx = 0
        }

        // Nouvelles vagues, étoiles, décors, ligne d'arrivée
        if (distance >= track.length) {
            if (!finishSpawned) {
                finishSpawned = true
                spawnFinish()
            }
        } else if (distance >= nextWaveAt && distance < track.length - 120) {
            nextWaveAt = distance + track.gap
            spawnWave()
        }
        if (distance >= nextDecorAt) {
            nextDecorAt = distance + randint(35, 80)
            spawnDecor()
        }

        // Clignote après un choc
        car.setFlag(
            SpriteFlag.Invisible,
            t < invincibleUntil && Math.idiv(t, 100) % 2 === 0,
        )
    }

    // Tout ce qui défile (aussi pendant l'arrivée et sur l'écran titre)
    function scrollWorld(dt: number) {
        scrollOffset += speed * dt
        for (let i = obstacles.length - 1; i >= 0; i--) {
            const o = obstacles[i]
            const s = o.sprite
            if (o.kind === Tracks.SLOW_CAR) s.vy = speed * 0.5
            else s.vy = speed
            if (o.kind === Tracks.CROSSING) {
                if (s.left < ROAD_LEFT - 6) o.dir = 1
                else if (s.right > ROAD_RIGHT + 6) o.dir = -1
                s.vx = o.dir * CROSSING_SPEED
            }
            if (s.top > screen.height) {
                s.destroy()
                obstacles.splice(i, 1)
            }
        }
        for (const s of sprites.allOfKind(ItemKind)) {
            s.vy = speed
            if (s.top > screen.height) s.destroy()
        }
        for (const s of sprites.allOfKind(DecorKind)) {
            s.vy = speed
            if (s.top > screen.height) s.destroy()
        }
        for (const s of sprites.allOfKind(FinishKind)) {
            s.vy = speed
            if (s.top > screen.height) s.destroy()
        }
    }

    game.onUpdate(() => {
        const dt = game.eventContext().deltaTime
        if (state === State.Racing) updateRacing(dt)
        if (state !== State.Ending) scrollWorld(dt)
    })

    // ---------- Chocs, étoiles, arrivée ----------
    function crash(o: Sprite) {
        for (let i = 0; i < obstacles.length; i++) {
            if (obstacles[i].sprite === o) {
                obstacles.splice(i, 1)
                break
            }
        }
        o.destroy(effects.spray, 250)
        invincibleUntil = now() + INVINCIBLE_MS
        slowUntil = now() + SLOW_MS
        scene.cameraShake(4, 300)
        music.bigCrash.play()
        info.changeLifeBy(-1)
        console.log(`CRASH life=${info.life()}`)
    }

    sprites.onOverlap(CarKind, ObstacleKind, (_c, o) => {
        if (state !== State.Racing) return
        if (now() < invincibleUntil) return
        crash(o)
    })

    sprites.onOverlap(CarKind, ItemKind, (_c, star) => {
        if (state !== State.Racing) return
        star.destroy(effects.spray, 150)
        info.changeScoreBy(1)
        music.baDing.play()
        console.log(`STAR ${info.score()}`)
    })

    sprites.onOverlap(CarKind, FinishKind, (_c, _f) => {
        if (state !== State.Racing) return
        onFinish()
    })

    function onFinish() {
        state = State.Transition
        car.vx = 0
        console.log(`FINISH ${trackIndex + 1} score=${info.score()}`)
        control.runInParallel(() => {
            music.powerUp.play()
            showBanner("ARRIVÉE !", 2200)
            effects.confetti.startScreenEffect(2000)
            info.changeScoreBy(10)
            pause(2400)
            if (trackIndex >= tracks.length - 1) showEnding()
            else beginRace(trackIndex + 1, true)
        })
    }

    function onDefeat() {
        if (state !== State.Racing) return
        state = State.Transition
        car.vx = 0
        console.log("RESTART")
        control.runInParallel(() => {
            pause(700)
            tell(
                "Oh non ! Vroum a trop de bosses...\n\nCe n'est pas grave : on recommence la course !",
            )
            beginRace(trackIndex, false)
        })
    }

    info.onLifeZero(() => {
        onDefeat()
    })

    // ---------- Écran de fin ----------
    function showEnding() {
        state = State.Ending
        clearAll()
        scene.setBackgroundColor(9)
        info.showLife(false)
        spawnCar()
        car.setPosition(80, 84)
        effects.confetti.startScreenEffect()
        music.powerUp.play()
        console.log("CHAMPION")
    }

    // ---------- Contrôles ----------
    controller.A.onEvent(ControllerButtonEvent.Pressed, () => {
        if (state === State.Title) {
            if (controller.down.isPressed()) {
                Autoplay.start()
                showBanner("MODE DÉMO", 3000)
            }
            startAdventure()
        } else if (state === State.Ending) {
            control.reset()
        }
    })
    controller.B.onEvent(ControllerButtonEvent.Pressed, () => {
        if (state === State.Title) {
            chosenTrack = (chosenTrack + 1) % tracks.length
            music.baDing.play()
        } else if (state === State.Racing) {
            // Klaxon !
            music.playTone(330, 90)
            music.playTone(262, 160)
        }
    })

    // ---------- Dessin de la route (sous les sprites) ----------
    game.onPaint(() => {
        if (state === State.Ending) return
        screen.fillRect(ROAD_LEFT, 0, ROAD_RIGHT - ROAD_LEFT, 120, track.road)
        // bandes sur les bas-côtés pour sentir la vitesse
        const band = Math.idiv(scrollOffset, 1) % 40
        for (let y = band - 40; y < 120; y += 40) {
            screen.fillRect(0, y, ROAD_LEFT, 4, track.groundStripe)
            screen.fillRect(ROAD_RIGHT, y, 30, 4, track.groundStripe)
        }
        // bords blancs et pointillés jaunes
        screen.fillRect(ROAD_LEFT, 0, 2, 120, 1)
        screen.fillRect(ROAD_RIGHT - 2, 0, 2, 120, 1)
        const dash = Math.idiv(scrollOffset, 1) % 24
        for (let y = dash - 24; y < 120; y += 24) {
            screen.fillRect(79, y, 2, 12, 5)
        }
        // flammes du turbo
        if (state === State.Racing && turbo && car) {
            const flicker = Math.idiv(now(), 80) % 2
            screen.fillTriangle(
                car.x - 4,
                car.bottom - 2,
                car.x + 2,
                car.bottom - 2,
                car.x - 1,
                car.bottom + 6 + flicker * 3,
                4,
            )
            screen.fillTriangle(
                car.x - 2,
                car.bottom - 2,
                car.x + 1,
                car.bottom - 2,
                car.x - 1,
                car.bottom + 3,
                5,
            )
        }
    })

    // ---------- Affichage par-dessus le jeu ----------
    game.onShade(() => {
        if (state === State.Title) {
            screen.fillRect(0, 18, 160, 34, 15)
            screen.printCenter("VROUM !", 22, 5, bigFont)
            screen.printCenter("La grande course", 41, 1, image.font8)
            if (Math.idiv(now(), 500) % 2 === 0) {
                screen.printCenter("Appuie sur A", 96, 1, image.font8)
            }
            screen.printCenter(
                `B : course ${chosenTrack + 1} / ${tracks.length}`,
                110,
                1,
                image.font5,
            )
        } else if (state === State.Ending) {
            screen.fillRect(0, 16, 160, 46, 15)
            screen.printCenter("CHAMPION !", 20, 5, bigFont)
            screen.printCenter(`Étoiles : ${info.score()}`, 40, 1, image.font8)
            screen.printCenter("Bravo Vroum !", 51, 3, image.font8)
            if (Math.idiv(now(), 500) % 2 === 0) {
                screen.printCenter(
                    "Appuie sur A pour rejouer",
                    104,
                    1,
                    image.font8,
                )
            }
        } else {
            // barre de progression de la course
            const w = 56
            const x0 = 52
            screen.fillRect(x0 - 1, 2, w + 2, 6, 15)
            const p = Math.min(1, distance / track.length)
            screen.fillRect(x0, 3, Math.idiv(w * p * 100, 100), 4, 7)
            screen.drawTransparentImage(Assets.flag, x0 + w - 1, 1)
            screen.fillRect(x0 + Math.idiv(w * p * 100, 100) - 1, 2, 3, 6, 2)
        }
        if (countUntil > now()) {
            screen.printCenter(countText, 44, 5, bigFont)
        }
        if (bannerUntil > now()) {
            const w = bannerText.length * 6 + 12
            const x = (screen.width - w) / 2
            screen.fillRect(x, 60, w, 16, 15)
            screen.drawRect(x, 60, w, 16, 5)
            screen.printCenter(bannerText, 64, 5, image.font8)
        }
    })

    export function start() {
        FrenchFont.install()
        bigFont = image.doubledFont(image.font8)
        tracks = Tracks.all()
        showTitle()
    }
}
