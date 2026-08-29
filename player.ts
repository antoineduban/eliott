// ============================================
// LILA LA FÉE : déplacements, saut, vol plané, magie
// ============================================

// biome-ignore lint/correctness/noUnusedVariables: utilisé par main.ts
namespace Player {
    export const Kind = SpriteKind.create()
    export const MagicKind = SpriteKind.create()

    const SPEED = 70
    const JUMP_VY = -185
    const GRAVITY = 420
    const GLIDE_VY = 35 // vitesse de chute quand on plane (A maintenu)
    const COYOTE_MS = 120 // on peut encore sauter juste après avoir quitté le sol
    const JUMP_BUFFER_MS = 150 // un saut demandé juste avant d'atterrir est gardé
    const INVINCIBLE_MS = 1500
    const MAGIC_COOLDOWN_MS = 220
    const MAGIC_SPEED = 160

    export let sprite: Sprite = null
    export let facing = 1
    export let enabled = false

    let invincibleUntil = 0
    let knockbackUntil = 0
    let magicReadyAt = 0
    let lastGroundedAt = 0
    let jumpQueuedUntil = 0
    let safeX = 0
    let safeY = 0
    let frame = 0
    let frameT = 0

    export function spawn(x: number, y: number) {
        if (sprite) sprite.destroy()
        sprite = sprites.create(Assets.fairyR[0], Kind)
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

    export function disable() {
        enabled = false
        if (sprite) {
            sprite.vx = 0
        }
    }

    export function isInvincible(): boolean {
        return game.runtime() < invincibleUntil
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
        const s = sprites.create(Assets.sparkle[0], MagicKind)
        s.setPosition(sprite.x + facing * 9, sprite.y - 2)
        s.vx = facing * MAGIC_SPEED
        s.z = 8
        s.lifespan = 700
        s.setFlag(SpriteFlag.AutoDestroy, true)
        s.setFlag(SpriteFlag.DestroyOnWall, true)
        animation.runImageAnimation(s, Assets.sparkle, 70, true)
        music.magicWand.play()
    }

    export function update(dt: number) {
        if (!sprite) return
        const now = game.runtime()
        const onGround = grounded()
        if (onGround) lastGroundedAt = now

        // Contrôles
        if (enabled && now >= knockbackUntil) {
            let vx = 0
            if (controller.left.isPressed()) {
                vx = -SPEED
                facing = -1
            } else if (controller.right.isPressed()) {
                vx = SPEED
                facing = 1
            }
            sprite.vx = vx

            if (now < jumpQueuedUntil && now - lastGroundedAt <= COYOTE_MS) {
                jumpQueuedUntil = 0
                lastGroundedAt = -1000
                sprite.vy = JUMP_VY
                music.jumpUp.play()
            }

            // Vol plané : A maintenu pendant la chute
            if (
                !onGround &&
                sprite.vy > GLIDE_VY &&
                (controller.A.isPressed() || controller.up.isPressed())
            ) {
                sprite.vy = GLIDE_VY
            }
        }

        // Endroit sûr (les deux pieds sur le sol) pour revenir après une chute
        if (onGround && enabled) {
            const below = sprite.bottom + 2
            if (
                Levels.isWall(sprite.left + 2, below) &&
                Levels.isWall(sprite.right - 2, below)
            ) {
                safeX = sprite.x
                safeY = sprite.y
            }
        }

        // Tombé dans l'eau, la lave ou l'orage
        if (
            Levels.tileIndexAt(sprite.x, sprite.bottom - 2) === Levels.HAZARD ||
            sprite.y > Levels.heightPx + 24
        ) {
            fell()
        }

        // Animation des ailes
        frameT += dt
        const flapSpeed = onGround && sprite.vx === 0 ? 0.25 : 0.1
        if (frameT >= flapSpeed) {
            frameT = 0
            frame = frame === 0 ? 1 : 0
            sprite.setImage(
                facing > 0 ? Assets.fairyR[frame] : Assets.fairyL[frame],
            )
        } else if (
            (facing > 0 && sprite.image !== Assets.fairyR[frame]) ||
            (facing < 0 && sprite.image !== Assets.fairyL[frame])
        ) {
            sprite.setImage(
                facing > 0 ? Assets.fairyR[frame] : Assets.fairyL[frame],
            )
        }

        // Clignote quand on est invincible
        if (isInvincible()) {
            sprite.setFlag(SpriteFlag.Invisible, Math.idiv(now, 100) % 2 === 0)
        } else {
            sprite.setFlag(SpriteFlag.Invisible, false)
        }
    }

    // Lila est touchée : perd un coeur (sauf si invincible)
    export function hurt(fromX: number) {
        if (!sprite || !enabled || isInvincible()) return
        const now = game.runtime()
        invincibleUntil = now + INVINCIBLE_MS
        knockbackUntil = now + 250
        sprite.vy = -110
        sprite.vx = fromX < sprite.x ? 70 : -70
        music.powerDown.play()
        info.changeLifeBy(-1)
    }

    function fell() {
        if (!sprite || !enabled) return
        sprite.setPosition(safeX, safeY - 2)
        sprite.vx = 0
        sprite.vy = 0
        if (!isInvincible()) {
            invincibleUntil = game.runtime() + INVINCIBLE_MS
            music.powerDown.play()
            info.changeLifeBy(-1)
        }
    }

    // Petit rebond quand Lila saute sur un ennemi
    export function bounce() {
        if (!sprite) return
        sprite.vy = -130
    }
}
