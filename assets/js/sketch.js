let cnv
let canvasCenterX, canvasCenterY, tracerX, tracerY;
let isDragging = false;
const a = 100, b = 100 // a pole arm; b tracer arm
let c; // third side of triangle
let A, B, C; // corresponding angles
const pointSize = 20;
const epsilon = 10;

function setup() {
  cnv = createCanvas(400, 400);
  cnv.parent('p5CanvasContainer'); // Attach the canvas to the div
  // centerCanvas();
  // let newCanvasX = (windowWidth- width)/2;
  // let newCanvasY = (windowHeight- height)/2;
  // cnv.position(newCanvasX,newCanvasY)

  tracerX = random(60,140);
  tracerY = random(60,140);
  
}

function windowResized() {
  // centerCanvas(); // Recenter the canvas if the window is resized
}

function centerCanvas() {
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  
  cnv.position(x, y); // Position the canvas
}

function draw() {
  background(220);
  
  canvasCenterX = width/2;
  canvasCenterY = height/2;
  c = dist(canvasCenterX, canvasCenterY, tracerX, tracerY);
  // console.log(a,b,c)
  let B = acos((a**2+c**2-b**2)/(2*a*c));
  let C = acos((a**2+b**2-c**2)/(2*a*b));
  // console.log(a**2);
  let theta = atan2((tracerY - canvasCenterY), (tracerX - canvasCenterX));
  // console.log(theta);
  
  translate(canvasCenterX, canvasCenterY);
  rotate(theta);
  // line(0,0,c,0);
  rotate(B);
  strokeWeight(7);
  strokeCap(ROUND);
  stroke(255,0,0);
  line(0,0,a,0);
  translate(a,0);
  rotate(C - PI);
  stroke(0,0,255);
  line(0,0,b,0);
  strokeWeight(1)
  stroke(0,0,0);
  resetMatrix();
  ellipse(tracerX, tracerY, 20, 20);
  
  let r = dist(canvasCenterX, canvasCenterY, mouseX, mouseY);
  if (isDragging) {
    if (r > epsilon && r < 200 - epsilon) {
      tracerX = mouseX;
      tracerY = mouseY;
    }
    else {
      isDragging = false;
    }
  }
  
  
}

function mousePressed() {
  const d = dist(mouseX, mouseY, tracerX, tracerY);
  if (d < pointSize / 2) {
    isDragging = true;
  }
}

function mouseReleased() {
  isDragging = false;
}