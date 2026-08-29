// ============================================
// ENNEMIS : crapauds, champignons, gargouilles (marchent)
//           chauves-souris, fantômes (volent)
// ============================================

// biome-ignore lint/correctness/noUnusedVariables: utilisé par main.ts
namespace Enemies {
    export const Kind = SpriteKind.create()

    const WALK_SPEED = 22
    const FLY_RANGE = 40

    class Enemy {
        sprite: Sprite
        flying: boolean
        dir: number
        baseX: number
        baseY: number
        t: number
        framesL: Image[]
        framesR: Image[]
        frame: number
        frameT: number

        constructor(sprite: Sprite, flying: boolean, frames: Image[]) {
            this.sprite = sprite
            this.flying = flying
            this.dir = 1
            this.baseX = sprite.x
            this.baseY = sprite.y
            this.t = Math.random() * 6
            this.framesL = frames
            this.framesR = []
            for (const f of frames) {
                const c = f.clone()
                c.flipX()
                this.framesR.push(c)
            }
            this.frame = 0
            this.frameT = 0
        }

        currentImage(): Image {
            return this.dir < 0
                ? this.framesL[this.frame]
                : this.framesR[this.frame]
        }
    }

    let list: Enemy[] = []

    export function clearAll() {
        for (const e of list) e.sprite.destroy()
        list = []
        sprites.destroyAllSpritesOfKind(Kind)
    }

    export function spawnWalker(x: number, bottom: number, theme: number) {
        const frames = Assets.walkerFrames(theme)
        const s = sprites.create(frames[0], Kind)
        s.x = x
        s.bottom = bottom
        s.ay = 350
        s.z = 5
        list.push(new Enemy(s, false, frames))
    }

    export function spawnFlyer(x: number, y: number, theme: number) {
        const frames = Assets.flyerFrames(theme)
        const s = sprites.create(frames[0], Kind)
        s.setPosition(x, y)
        s.z = 5
        s.setFlag(SpriteFlag.GhostThroughWalls, true)
        list.push(new Enemy(s, true, frames))
    }

    export function update(dt: number) {
        for (const e of list) {
            const s = e.sprite
            e.t += dt
            if (e.flying) {
                // va-et-vient horizontal + petit vol ondulé
                s.x = e.baseX + Math.sin(e.t * 1.1) * FLY_RANGE
                s.y = e.baseY + Math.sin(e.t * 4) * 5
                e.dir = Math.cos(e.t * 1.1) >= 0 ? 1 : -1
            } else {
                // demi-tour contre un mur ou au bord d'une plateforme
                if (s.isHittingTile(CollisionDirection.Left)) e.dir = 1
                else if (s.isHittingTile(CollisionDirection.Right)) e.dir = -1
                else if (s.isHittingTile(CollisionDirection.Bottom)) {
                    const aheadX = e.dir > 0 ? s.right + 2 : s.left - 2
                    if (!Levels.isWall(aheadX, s.bottom + 3)) e.dir = -e.dir
                }
                s.vx = e.dir * WALK_SPEED
            }

            // animation
            e.frameT += dt
            if (e.frameT > 0.15 && e.framesL.length > 1) {
                e.frameT = 0
                e.frame = (e.frame + 1) % e.framesL.length
            }
            const im = e.currentImage()
            if (s.image !== im) s.setImage(im)
        }
    }

    export function kill(s: Sprite) {
        for (let i = 0; i < list.length; i++) {
            if (list[i].sprite === s) {
                list.splice(i, 1)
                break
            }
        }
        s.destroy(effects.spray, 250)
        music.smallCrash.play()
        info.changeScoreBy(2)
    }

    export function count(): number {
        return list.length
    }
}
