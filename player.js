class Player {

  constructor(z) {
    this.or = createVector(width/2, height/2)
    this.z = 20
    this.angle = 0
    this.rotating = 0
    this.going = false
    this.velocity = createVector(0,0)
  }

  placeX() {
    return this.or.x
  }
  placeY() {
    return this.or.y
  }

  display() {
    push()
    translate(this.or.x, this.or.y)
    rotate(this.angle + PI/2)
    fill(0)
    strokeWeight(1)
    stroke("powderblue")
    triangle(-this.z,this.z,this.z,this.z,0,-this.z)

    pop()
  }

  contact(asteroid) {
    let d = dist(this.or.x, this.or.y, asteroid.or.x, asteroid.or.y)

    if (d < this.z + asteroid.z) {
      return true
    } else {
      return false
    }
  }

  reset() {
    this.or.x = width/2
    this.or.y = height/2
  }

  turn(q) {
    this.angle += q
    //this.angle += this.rotating
  }

  /*adjust(r) {
    this.rotating += r
    console.log(this.rotating)
  }*/

  move() {
    if (this.going) {
      this.go()
    }
    this.or.add(this.velocity)
    this.velocity.mult(0.98)
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

  go() {
    let dir = p5.Vector.fromAngle(this.angle)
    dir.mult(0.25)
    this.velocity.add(dir)
  }

  thrust(g) {
    this.going = g
  }

}
