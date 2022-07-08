class Shot {

  constructor(pos, angle) {
    this.or = createVector(pos.x, pos.y)
    this.angle = angle
    this.velocity = p5.Vector.fromAngle(angle)
    this.velocity.mult(15)
  }

  display() {
    push()
    strokeWeight(3)
    stroke(255)
    point(this.or.x, this.or.y)
    pop()
  }

  contact(asteroid) {
    let d = dist(this.or.x, this.or.y, asteroid.or.x, asteroid.or.y)

    if (d < asteroid.z) {
      return true
    } else {
      return false
    }

  }

  adjust() {
    this.or.add(this.velocity)
  }

}
