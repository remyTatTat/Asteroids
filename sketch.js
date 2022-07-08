var canvas

function setup() {

  canvas = createCanvas(windowWidth * 8/10, windowHeight * 0.7)
  player = new Player(15)

  music.setVolume(0.2)
  hit.setVolume(0.2)
  shoot.setVolume(0.2)

  canvas.style('display', 'block')
  canvas.style('margin', 'auto')

  frameRate(60)

}

function preload() {
  shoot = loadSound('sounds/shoot.mp3')
  hit = loadSound('sounds/hit.mp3')
  music = loadSound('sounds/music.mp3')
}

var player
var asteroids = []
var shots = []
var life = 3
var state = 0
var hold = false
var r = 180
var temp = 0
var limit = 30
var oids = 15
var color = 255
var temp2 = 0
var immuneTimer = 180;
var immuneTrack = true;
var soft = 0;
var timerString = "";
var musicCheck = 1

function draw() {

  if (musicCheck == 0) {
    console.log("dog")
    music.play()
    music.loop()
    musicCheck++
  }

  if (immuneTrack) {
    immuneTimer--
    if (immuneTimer <= 0) {
      immuneTrack = false
      immuneTimer = 180
    }
  }

  if (state == 0) {
    player.reset()
    background(0)
    textSize(20)
    fill(255)
    textFont("courier new")
    textAlign(CENTER)
    text("Choose a Mode", width/2, height/3)
    push();textSize(27)
    text("ASTEROIDS", width/2, height/2); pop()
    text("Easy (E)", width*1/4, height*2/3)
    text("Hard (H)", width*3/4, height*2/3)

    push(); noFill(); strokeWeight(1); stroke(255)
    rect(1,1,width-1,height-1); pop()

  } else if (state == 1 || state == 2) {

      if (state == 2) {
        r = 100
        oids = 20
        limit = 15
        color = "red"
      }
      hold = true

      if (temp == 0) {
        for (let i = 0; i<oids; i++) {
          asteroids.push(new Asteroid(state))
        }
        temp++
      }
    }

    if (hold) {
      background(0,70)

      push(); noFill(); strokeWeight(1); stroke("white")
      rect(1,1,width-1,height-1); pop()

      /*push()
      fill(0)
      stroke(255)
      strokeWeight(1)
      ellipse(width/2, height/2, r, r)
      pop()*/

      text("Lives: " + life, width * 0.10, height * 0.10)

      for (let i = 0; i < asteroids.length; i++) {

        if (player.contact(asteroids[i]) && !immuneTrack) {
          life--
          background("white")
          player.reset()
          immuneTrack = true;
        }

        asteroids[i].display()
        asteroids[i].adjust()
        asteroids[i].wrap()
      }

      for (let i = shots.length - 1; i >= 0; i--) {
        shots[i].display()
        shots[i].adjust()

        for (let j = asteroids.length - 1; j >= 0; j--) {
          if (shots[i].contact(asteroids[j])) {
            hit.play()

            if (asteroids[j].z > limit) {
              let pieces = asteroids[j].crack()
              asteroids = asteroids.concat(pieces)
            } else {

            }

            asteroids.splice(j, 1)
            shots.splice(i, 1)

            break
          }
        }

      }

      player.display()

      if (keyIsDown(65) || keyIsDown(97) || keyIsDown(LEFT_ARROW)) {
        player.turn(-0.1)
      } else if (keyIsDown(68) || keyIsDown(100) || keyIsDown(RIGHT_ARROW)) {
        player.turn(0.1)
      } else if (keyIsDown(87) || keyIsDown(119) || keyIsDown(UP_ARROW)) {
        player.thrust(true)
      }

      player.move()
      player.thrust(false)
      player.wrap()

    }

    if ((state == 1 || state == 2) && life < 0) {
      music.stop()
      state = 3
      hold = false
      temp = 0
      immuneTrack = true
      player.reset()
    }

    if ((state == 1 || state == 2) && asteroids.length <= 0) {
      music.stop()
      state = 4
      hold = false
      temp = 0
      immuneTrack = true
      player.reset()
    }

    if (state == 3) {
      for (let i = 0; i < asteroids.length; i++) {
        asteroids.splice(i, 1)
      }

      background(0)
      push(); noFill(); strokeWeight(1); stroke("white")
      rect(1,1,width-1,height-1); pop()

      textSize(30)
      textAlign(CENTER)
      textFont("courier new")
      fill("white")
      text("LOSS", width/2, height*(1/3))
      textSize(20)
      text("Reset Game? (R)", width/2, height*(2/3))

    }

    if (state == 4) {

      for (let i = 0; i < asteroids.length; i++) {
        asteroids.splice(i, 1)
      }

      background(0)

      push(); noFill(); strokeWeight(1); stroke("white")
      rect(1,1,width-1,height-1); pop()

      textSize(30)
      textAlign(CENTER)
      textFont("courier new")
      fill("white")
      text("VICTORY", width/2, height*(1/3))
      textSize(20)
      text("Reset Game? (R)", width/2, height*(2/3))

    }

    if (immuneTrack && (state == 1 || state == 2)) {
      background(128, soft)

      let t = immuneTimer/60 + 1
      timerString = (Math.floor(t)).toString()

      if (soft <= 120) {
        soft += 10;
      }

      push()
      textSize(30)
      textAlign(CENTER)
      textFont("courier new")
      fill("white")
      text(timerString, width/2, height/2)
      pop()

    } else {
      soft = 0;
    }

}

function keyPressed() {

  if (state == 0) {
    if (keyCode == 69 || keyCode == 101) {
      musicCheck = 0
      state = 1
    } else if (keyCode == 72 || keyCode == 104) {
      state = 2
      musicCheck = 0
    }
  }

  if ((state == 3 || state == 4) && (keyCode == 82 || keyCode == 114)) {
    life = 3
    state = 0
  }

  if (keyCode == 32) {
    shots.push(new Shot(player.or, player.angle))
    shoot.play()
  }
}
