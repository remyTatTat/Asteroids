class Asteroid {

  constructor(state, lo, z) {
    this.state = state

    if (state == 1) {
      this.speed = 0
    } else if (state == 2) {
      this.speed = random(2.5, 3.5)
    }

    if (lo) {
      this.or = lo.copy()
    } else {
      this.or = createVector(random(width), random(height))
    }

    this.points = floor(random(7, 10))
    this.change = []
    this.velocity = p5.Vector.random2D()
    for (let i = 0; i < this.points; i++) {
      this.change.push(random(-12, 7))
    }

    if (z) {
      this.z = z * 0.5
    } else {
      this.z = random(20,65)
    }
  }

  display() {
    push()
    translate(this.or.x,this.or.y)
    strokeWeight(1)
    if (state == 1) {
      stroke("thistle")
    } else if (state == 2) {
      stroke("red")
    }
    fill(0)
    //ellipse(0,0,this.z)

    beginShape()
    for (let i = 0; i < 10; i++) {
      let angle = map(i, 0, this.points, 0, TWO_PI)
      let x = (this.z + this.change[i]) * cos(angle)
      let y = (this.z + this.change[i]) * sin(angle)
      vertex(x,y)
    } endShape(CLOSE)

    pop()
  }

  crack() {
    var piece = []

    piece.push(new Asteroid(this.state, this.or, this.z))
    piece.push(new Asteroid(this.state, this.or, this.z))
    return piece
  }

  adjust() {
    this.or.add(this.velocity)
    this.or.add(this.speed)
  }

  wrap() {
    if (this.or.x <= -this.z) {
      this.or.x = width + this.z;
    } else if (this.or.x >= width + this.z) {
      this.or.x = -this.z
    }

    if (this.or.y <= -this.z) {
      this.or.y = height + this.z;
    } else if (this.or.y >= height + this.z) {
      this.or.y = -this.z
    }
  }

}
