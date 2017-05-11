/* global Phaser */

const Obstacle = require('./Obstacle')

class ObstacleGroup extends Phaser.Group {
  constructor (game, parent, frame) {
    super(game, parent)

    this.difficulty = 0
    this.frame = frame
    this.speed = -200

    this.topObstacle = new Obstacle(this.game, 0, 0, this.frame + 'Down.png')
    this.add(this.topObstacle)

    this.bottomObstacle = new Obstacle(this.game, 0, this.game.height, this.frame + '.png')
    this.add(this.bottomObstacle)
  }

  reset (x, y, difficulty, speed) {
    this.difficulty = difficulty

    // lim -> 0.5
    const offset = difficulty / (2 * difficulty + 10)

    if (speed !== undefined) this.speed = speed

    this.topObstacle.reset(0, this.topObstacle.height * offset)
    this.bottomObstacle.reset(0, this.game.height - this.bottomObstacle.height * offset)

    this.x = x
    this.y = y


    this.hasScored = false
    this.exists = true
  }

  checkWorldBounds () {
    if (!this.topObstacle.inWorld) { this.exists = false }
  }

  update () {
    this.x += this.speed * this.game.time.physicsElapsed
    this.checkWorldBounds()
  }

  stop () {
    this.speed = 0
  }
}

module.exports = ObstacleGroup
