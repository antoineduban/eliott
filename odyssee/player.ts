// ============================================
// ULYSSE : déplacements, saut, vol plané, tir à l'arc,
// amphores (effets surprises) et fleurs de lotus (transformations)
// ============================================

// biome-ignore lint/correctness/noUnusedVariables: utilisé par main.ts
namespace Player {
    export const Kind = SpriteKind.create()
    export const MagicKind = SpriteKind.create()
    export const BubbleKind = SpriteKind.create()

    // Les formes d'Ulysse
    export const FORM_NORMAL = 0
    export const FORM_TINY = 1 // amphore : tout petit, saute plus haut
    export const FORM_EAGLE = 2 // lotus : l'aigle de Zeus vole (A maintenu)
    export const FORM_SATYR = 3 // lotus : le satyre saute très haut
    export const FORM_CENTAUR = 4 // lotus : le centaure court très vite

    // Les effets des amphores
    const POTION_SUPER = 0 // la force d'Héraclès : invincible, écrase tout
    const POTION_TINY = 1
    const POTION_SNAIL = 2 // tout lent comme une tortue (c'est rigolo)
    const POTION_SHIELD = 3 // le bouclier d'Athéna : protège d'un coup
    const POTION_HEART = 4
    const POTION_STARS = 5 // pluie de pièces d'or
    const POTION_COUNT = POTION_STARS + 1

    const SPEED = 70
    const JUMP_VY = -185
    const GRAVITY = 420
    const GLIDE_VY = 35 // vitesse de chute quand on plane (A maintenu)
    const FLY_VY = -75 // aigle : vitesse de montée (A maintenu)
    const FLY_FALL_VY = 30 // aigle : vitesse de chute
    const COYOTE_MS = 120 // on peut encore sauter juste après avoir quitté le sol
    const JUMP_BUFFER_MS = 150 // un saut demandé juste avant d'atterrir est gardé
    const INVINCIBLE_MS = 1300
    const MAGIC_COOLDOWN_MS = 220
    const MAGIC_SPEED = 170
    const FORM_MS = 8000
    const SUPER_MS = 7000
    const SNAIL_MS = 5000
    const ICE_GRIP = 3 // plus c'est petit, plus ça glisse (pont mouillé)

    export let sprite: Sprite = null
    export let facing = 1
    export let enabled = false
    export let form = FORM_NORMAL
    export let shielded = false

    let invincibleUntil = 0
    let knockbackUntil = 0
    let magicReadyAt = 0
    let lastGroundedAt = 0
    let jumpQueuedUntil = 0
    let formUntil = 0
    let formName = ""
    let superUntil = 0
    let snailUntil = 0
    let bubble: Sprite = null
    let safeX = 0
    let safeY = 0
    let frame = 0
    let frameT = 0

    export function spawn(x: number, y: number) {
        if (sprite) sprite.destroy()
        resetEffects()
        sprite = sprites.create(Assets.ulysseR[0], Kind)
        sprite.setPosition(x, y)
        sprite.ay = GRAVITY
        sprite.z = 10
        scene.cameraFollowSprite(sprite)
        facing = 1
        safeX = x
        safeY = y
        invincibleUntil = game.runtime() + 1200
        knockbackUntil = 0
        jumpQueuedUntil = 0
        enabled = true
    }

    function resetEffects() {
        form = FORM_NORMAL
        formUntil = 0
        formName = ""
        superUntil = 0
        snailUntil = 0
        shielded = false
        if (bubble) {
            bubble.destroy()
            bubble = null
        }
    }

    export function disable() {
        enabled = false
        if (sprite) {
            sprite.vx = 0
        }
    }

    export function enable() {
        enabled = sprite !== null
    }

    export function isInvincible(): boolean {
        return game.runtime() < invincibleUntil || isSuper()
    }

    // La force d'Héraclès (amphore) : les ennemis touchés sont éliminés
    export function isSuper(): boolean {
        return game.runtime() < superUntil
    }

    function grounded(): boolean {
        return sprite.isHittingTile(CollisionDirection.Bottom)
    }

    export function jumpPressed() {
        if (!enabled || !sprite) return
        jumpQueuedUntil = game.runtime() + JUMP_BUFFER_MS
    }

    export function magicPressed() {
        if (!enabled || !sprite) return
        const now = game.runtime()
        if (now < magicReadyAt) return
        magicReadyAt = now + MAGIC_COOLDOWN_MS
        const s = sprites.create(
            facing > 0 ? Assets.arrowR : Assets.arrowL,
            MagicKind,
        )
        s.setPosition(sprite.x + facing * 9, sprite.y - 2)
        s.vx = facing * MAGIC_SPEED
        s.z = 8
        s.lifespan = 700
        s.setFlag(SpriteFlag.AutoDestroy, true)
        s.setFlag(SpriteFlag.DestroyOnWall, true)
        music.pewPew.play()
    }

    // ---------- Formes ----------
    function frames(): Image[] {
        if (form === FORM_TINY)
            return facing > 0 ? Assets.tinyUlysseR : Assets.tinyUlysseL
        if (form === FORM_EAGLE)
            return facing > 0 ? Assets.eagleR : Assets.eagleL
        if (form === FORM_SATYR)
            return facing > 0 ? Assets.satyrR : Assets.satyrL
        if (form === FORM_CENTAUR)
            return facing > 0 ? Assets.centaurR : Assets.centaurL
        return facing > 0 ? Assets.ulysseR : Assets.ulysseL
    }

    function speedMul(): number {
        let m = 1
        if (form === FORM_EAGLE) m = 0.9
        else if (form === FORM_SATYR) m = 0.85
        else if (form === FORM_CENTAUR) m = 1.6
        if (game.runtime() < snailUntil) m *= 0.5
        return m
    }

    function jumpMul(): number {
        if (form === FORM_TINY) return 1.15
        if (form === FORM_SATYR) return 1.4
        if (form === FORM_CENTAUR) return 1.1
        return 1
    }

    function setForm(newForm: number, name: string, ms: number) {
        if (!sprite) return
        form = newForm
        formName = name
        formUntil = game.runtime() + ms
        // On garde les pieds au même endroit quand la taille change
        const bottom = sprite.bottom
        const x = sprite.x
        frame = 0
        sprite.setImage(frames()[0])
        sprite.bottom = bottom
        sprite.x = x
        sprite.startEffect(effects.spray, 400)
    }

    function endForm() {
        if (form === FORM_NORMAL) return
        setForm(FORM_NORMAL, "", 0)
        formUntil = 0
        music.baDing.play()
    }

    // ---------- Amphore : effet surprise ----------
    export function drinkPotion() {
        if (!sprite) return
        const now = game.runtime()
        const which = randint(0, POTION_COUNT - 1)
        let text = ""
        if (which === POTION_SUPER) {
            text = "FORCE D'HÉRACLÈS !"
            superUntil = now + SUPER_MS
            sprite.startEffect(effects.halo, SUPER_MS)
        } else if (which === POTION_TINY) {
            text = "Tout petit !"
            setForm(FORM_TINY, "Petit", FORM_MS)
        } else if (which === POTION_SNAIL) {
            text = "Tortue..."
            snailUntil = now + SNAIL_MS
        } else if (which === POTION_SHIELD) {
            text = "Bouclier d'Athéna !"
            giveShield()
        } else if (which === POTION_HEART) {
            text = "Un coeur en plus !"
            if (info.life() < 5) info.changeLifeBy(1)
            sprite.startEffect(effects.hearts, 800)
        } else {
            text = "Pluie de pièces d'or !"
            Game.dropCoins(sprite.x, sprite.y - 12)
        }
        console.log(`POTION ${text}`)
        Game.showBanner(`Amphore : ${text}`, 2000)
        music.magicWand.play()
    }

    // ---------- Fleur de lotus : transformation ----------
    export function eatMushroom() {
        if (!sprite) return
        const which = randint(0, 2)
        let text = ""
        if (which === 0) {
            text = "Ulysse aigle !"
            setForm(FORM_EAGLE, "Aigle", FORM_MS)
        } else if (which === 1) {
            text = "Ulysse satyre !"
            setForm(FORM_SATYR, "Satyre", FORM_MS)
        } else {
            text = "Ulysse centaure !"
            setForm(FORM_CENTAUR, "Centaure", FORM_MS)
        }
        console.log(`MUSHROOM ${text}`)
        Game.showBanner(text, 2000)
        music.powerUp.play()
    }

    function giveShield() {
        shielded = true
        if (!bubble) {
            bubble = sprites.create(Assets.shieldBubble(), BubbleKind)
            bubble.z = 11
            bubble.setFlag(SpriteFlag.GhostThroughWalls, true)
        }
        bubble.setPosition(sprite.x, sprite.y)
    }

    function popShield() {
        shielded = false
        if (bubble) {
            bubble.destroy(effects.bubbles, 300)
            bubble = null
        }
    }

    // Texte affiché en bas de l'écran pendant un effet
    export function hudText(): string {
        if (!sprite) return ""
        const now = game.runtime()
        if (form !== FORM_NORMAL && formUntil > now)
            return `${formName} ${Math.ceil((formUntil - now) / 1000)}s`
        if (isSuper())
            return `Héraclès ${Math.ceil((superUntil - now) / 1000)}s`
        if (now < snailUntil)
            return `Tortue ${Math.ceil((snailUntil - now) / 1000)}s`
        if (shielded) return "Bouclier"
        return ""
    }

    export function update(dt: number) {
        if (!sprite) return
        const now = game.runtime()
        const onGround = grounded()
        if (onGround) lastGroundedAt = now

        // Fin d'une transformation
        if (form !== FORM_NORMAL && now >= formUntil) endForm()

        // Contrôles
        if (enabled && now >= knockbackUntil) {
            let vx = 0
            const speed = SPEED * speedMul()
            if (controller.left.isPressed()) {
                vx = -speed
                facing = -1
            } else if (controller.right.isPressed()) {
                vx = speed
                facing = 1
            }
            if (Levels.slippery && onGround) {
                // Sur le pont mouillé, on glisse : la vitesse change doucement
                sprite.vx += (vx - sprite.vx) * Math.min(1, dt * ICE_GRIP)
            } else {
                sprite.vx = vx
            }

            if (now < jumpQueuedUntil && now - lastGroundedAt <= COYOTE_MS) {
                jumpQueuedUntil = 0
                lastGroundedAt = -1000
                sprite.vy = JUMP_VY * jumpMul()
                music.jumpUp.play()
            }

            const holdingA =
                controller.A.isPressed() || controller.up.isPressed()
            if (form === FORM_EAGLE) {
                // Aigle : A maintenu = on monte, sinon on descend doucement
                if (holdingA && !onGround) sprite.vy = FLY_VY
                else if (sprite.vy > FLY_FALL_VY) sprite.vy = FLY_FALL_VY
            } else if (!onGround && sprite.vy > GLIDE_VY && holdingA) {
                // Vol plané : A maintenu pendant la chute (le vent d'Éole te porte)
                sprite.vy = GLIDE_VY
            }
        }

        // Endroit sûr (les deux pieds sur le sol) pour revenir après une chute
        if (onGround && enabled) {
            const below = sprite.bottom + 2
            if (
                Levels.isWall(sprite.left + 2, below) &&
                Levels.isWall(sprite.right - 2, below) &&
                Levels.tileIndexAt(sprite.x, sprite.bottom - 2) !==
                    Levels.SPIKES
            ) {
                safeX = sprite.x
                safeY = sprite.y
            }
        }

        // Tombé dans la mer, la lave ou l'orage
        const feetTile = Levels.tileIndexAt(sprite.x, sprite.bottom - 2)
        if (feetTile === Levels.HAZARD || sprite.y > Levels.heightPx + 24) {
            fell()
        } else if (feetTile === Levels.SPIKES && enabled) {
            // Marché sur des piques : ça pique, et ça repousse en arrière
            hurt(sprite.x + facing)
        }

        // Le bouclier d'Athéna suit Ulysse
        if (bubble) bubble.setPosition(sprite.x, sprite.y)

        // Animation de la marche
        const fr = frames()
        frameT += dt
        const flapSpeed = onGround && sprite.vx === 0 ? 0.25 : 0.1
        if (frameT >= flapSpeed) {
            frameT = 0
            frame = (frame + 1) % fr.length
        }
        const im = fr[frame % fr.length]
        if (sprite.image !== im) sprite.setImage(im)

        // Clignote quand on vient d'être touché
        if (now < invincibleUntil && !isSuper()) {
            sprite.setFlag(SpriteFlag.Invisible, Math.idiv(now, 100) % 2 === 0)
        } else {
            sprite.setFlag(SpriteFlag.Invisible, false)
        }
    }

    // Ulysse est touché : perd un coeur (sauf si invincible ou protégé)
    export function hurt(fromX: number) {
        if (!sprite || !enabled || isInvincible()) return
        const now = game.runtime()
        knockbackUntil = now + 250
        sprite.vy = -110
        sprite.vx = fromX < sprite.x ? 70 : -70
        if (shielded) {
            popShield()
            invincibleUntil = now + 800
            music.knock.play()
            return
        }
        invincibleUntil = now + INVINCIBLE_MS
        music.powerDown.play()
        info.changeLifeBy(-1)
    }

    function fell() {
        if (!sprite || !enabled) return
        sprite.setPosition(safeX, safeY - 2)
        sprite.vx = 0
        sprite.vy = 0
        if (isSuper()) return
        if (shielded) {
            popShield()
            invincibleUntil = game.runtime() + 800
            music.knock.play()
            return
        }
        if (game.runtime() >= invincibleUntil) {
            invincibleUntil = game.runtime() + INVINCIBLE_MS
            music.powerDown.play()
            info.changeLifeBy(-1)
        }
    }

    // Petit rebond quand Ulysse saute sur un ennemi
    export function bounce() {
        if (!sprite) return
        sprite.vy = -130
    }
}
