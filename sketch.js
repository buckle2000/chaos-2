'use strict'

// Python range
function* range(start, stop, step) {
  if (typeof stop == 'undefined') {
    // one param defined
    stop = start;
    start = 0;
  }

  if (typeof step == 'undefined') {
    step = 1;
  }

  if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
    return;
  }

  for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
    yield i;
  }
}

const {
  sqrt, round, sin, cos, PI
} = Math
const phi = (sqrt(5) + 1) / 2;

function sunflowerRadius(k, n, b) {
  if (k > n - b) {
    return 1
  } else {
    return sqrt(k - 1 / 2) / sqrt(n - (b + 1) / 2)
  }
}

function* sunflower(n, alpha) {
  const b = round(alpha * sqrt(n));
  for (let k of range(1, n + 1)) {
    const r = sunflowerRadius(k, n, b);
    const theta = 2 * PI * k / phi ^ 2;
    yield [r, theta]
  }
}

function setup() {
  createCanvas(200, 200)
  colorMode(HSL, 360, 100, 100, 100)
  noStroke()
  noLoop()
  createButton('Redraw').mousePressed(draw)
  draw()
}

function draw() {
  push()
  translate(width / 2, height / 2)
  background(0, 0, 100)
  const angleOffset = random(0,2*PI)
  for (let [r, angle] of sunflower(100,0)) {
    angle += angleOffset
    angle += random(0,2*PI)
    // r -= .1
    const [x,y] = [r * cos(angle), r * sin(angle)]
    fill(0, 0, 0, random(0, 35))
    ellipse(x*80, y*80, random(10,60))
  }
  pop()
}