var particles = [];
var bgImg;
var minX;

function preload() {
  bgImg = loadImage('cutout.png');
}

function setup() {
  createCanvas(900, 500);
  background(0);
  noStroke();
  
  frameRate(30);
  
  bgImg.loadPixels();
  
  minX = width;
  var d = pixelDensity();
  for(var x=0; x<width; x++){
    for(var y=0; y<height; y++){
      var c = bgImg.get(x, y);
      if( red(c) > 111 && random() < 0.11){
        var p = new Particle(x, y);
        particles.push(p);
        if( p.countdown < minX ){
          minX = p.countdown;
        }
      }
    }
  }
  
  stroke(255);
  // fill(255);
  for (i = 0; i < particles.length; i++) {
    var p = particles[i];
    p.updateCountdown(minX);
  }
}

function draw() {
  background(0);

  for (var i in particles) {
    var one = particles[i];
    one.draw();
  }
  saveCanvas('output-'+frameCount, 'jpg');
}

function Particle(x, y) {
  this.x = x;
  this.y = y;
  this.dx = -1 + (Math.random() * 2);
  this.dy = 1 + (Math.random() * 4);
  this.size = 1 + Math.floor(Math.random() * 1);
  this.countdown = (2 * x - y + Math.random() * 11) / 4;
  this.cs = 1;

  this.draw = function() {
    fill(222);
    ellipse(this.x, this.y, this.size, this.size);
    this.update();
  }

  this.update = function() {
    if( this.countdown > 0 ){
      this.cs += 0.011;
      this.countdown -= this.cs;
    }
    else {
      this.dy *= 1.011;
      this.y += this.dy;
      this.x += this.dx;
    }
  }
  
  this.updateCountdown = function(offset) {
    this.countdown -= offset;
  }
}