const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

class Particle {
  constructor(start_x, start_y, width=50, speed=2, x_limit=canvas.width, y_limit=canvas.height) {
    this.start_x = start_x;
    this.start_y = start_y;
    this.width = width;
    this.speed = speed;
    this.y_limit = y_limit;
    this.x_limit = x_limit;
  }
  // assign rings of colors & move in motion
  // want to be able to apply a tilt to the motion
  isValidPosition(x, y) {
    return x >= 0 && x < this.x_limit && y >=0 && y < this.y_limit;
  }
  // throw out 8 random particles 
  // in random directions...?
}

class Cluster extends Particle {
  constructor(start_x, start_y, width=50, speed=2, up=0, down=0, left=0, right=0, x_limit=canvas.width, y_limit=canvas.height) {
    super(start_x, start_y, width, speed, x_limit, y_limit)
    this.x = start_x;
    this.y = start_y;

    this.up = start_y;
    this.down = start_y;
    this.left = start_x;
    this.right = start_x;

  }
  // render(delta) {
  //   var centerx = Math.sin(delta)*this.radius + this.start_x;
  //   var centery = -Math.cos(delta)*this.radius + this.start_y;
  //   ctx.fillStyle = `rgb(${255 - Math.sin(delta)*255}, 0,${Math.cos(delta)*255})`; //'purple';
  //   ctx.fillRect(centerx, centery, this.width, this.width);
  //   ctx.fillStyle = `rgb(${Math.sin(delta)*255}, 0,${50 + Math.cos(delta)*255})`; 

  //   ctx.fillRect(centerx+this.width, centery, this.width, this.width);
  //   ctx.fillRect(centerx-this.width, centery, this.width, this.width);
  //   ctx.fillRect(centerx, centery+this.width, this.width, this.width);
  //   ctx.fillRect(centerx, centery-this.width, this.width, this.width);
  // }
  // most blue on edge
  // means 
  // canvas.width/2 = 0 blue
  // 0 or canvas.width = 255 blue
  // 
  percentOfColor(val, beg_val) {
    return Math.abs(val- this.x_limit/2)/Math.abs(this.x_limit/2)
  }

  getColor(val, beg_val) {
    return 255 * this.percentOfColor(val, beg_val);
  }
  updatePositions() {
    this.right += this.speed;
    this.left -= this.speed;
    this.up += this.speed;
    this.down -= this.speed;

    if (!this.isValidPosition(this.right, this.y)) {
      this.right = this.start_x;
    }
    if (!this.isValidPosition(this.left, this.y)) {
      this.left = this.start_x;
    }
    if (!this.isValidPosition(this.x, this.up)) {
      this.up = this.y;
    }
    if (!this.isValidPosition(this.x, this.down)) {
      this.down = this.y;
    }

  }
  // d = sqrt((x2-x1)^2 + (y2-y1)^2)
  getNebulaColor(val) {
    // x movement, want to change these values
  const percent = Math.abs(this.x_limit/2 - val)/(this.x_limit/2);
    if (percent < 1/2) {
      //color should be dark to cyan 
      const randVal = Math.random();
      if (randVal < 0.001)
        return `rgb(200, 200, 200)`;
      return 'rgb(0,0,0)'
    }
    else if (percent < 4/7) {
      return `rgb(120, 0, 0)`;
      //color should be light to dark orange
    }
    else if (percent < 5/7) {
      return `rgb(240, 120, 0)`;
      //color should be dark red
    } 
    else if (percent < 11/14) {
      return `rgb(240, 200, 0)`;
      //color should be dark red
    } else {
      return `rgb(0, 220, 240)`;
      //color should be black
    }
  }
  displayParticles(colors) {
    ctx.fillStyle = colors[0];
    ctx.fillRect(this.right, this.y, this.width, this.width);
    ctx.fillStyle = colors[1];
    ctx.fillRect(this.left, this.y, this.width, this.width);
    ctx.fillStyle = colors[2];
    ctx.fillRect(this.x, this.up, this.width, this.width);
    ctx.fillStyle = colors[3];
    ctx.fillRect(this.x, this.down, this.width, this.width);
  }
  calcDistance(x,y) {
    return Math.sqrt(((this.x_limit/2 - x)**2)/3 + (this.y_limit/2 - y)**2);
  }
  nebula(delta) {
    this.updatePositions();
    const colors = [];
    colors.push(this.getNebulaColor(this.calcDistance(this.right, this.start_y) + Math.random() *100));
    colors.push(this.getNebulaColor(this.calcDistance(this.left, this.start_y) + Math.random() *100));
    colors.push(this.getNebulaColor(this.calcDistance(this.start_x, this.up) + Math.random() *100));
    colors.push(this.getNebulaColor(this.calcDistance(this.start_x, this.down) + Math.random() *100));
    this.displayParticles(colors);
  }

  ripple(delta) {
    const colors = [];
    this.updatePositions();
    colors.push(`rgb(120, 0,${this.getColor(this.right, this.start_x)})`);
    colors.push(`rgb(120, 0,${this.getColor(this.left, this.start_x)})`);
    colors.push(`rgb(120, 0,${this.getColor(this.up, this.start_y)})`);
    colors.push(`rgb(120, 0,${this.getColor(this.down, this.start_y)})`);
    this.displayParticles(colors);
  }
}

var particles = [];
var nebulaParticles = [];
var delta = 0;
var removeParticles = false;


function genCoord(amplitude, centerVal) {
  return (Math.random() * amplitude)/2 + -(Math.random() * amplitude)/2 + centerVal;
}


function inOval(x,y, oval) {
  const {h,k,a,b,r} = oval;
  actual_r = (x-h)**2/(a**2) + (y-k)**2/(b**2)
  return actual_r < r
}

function percentOfColor(val) {
  return Math.abs(val- this.x_limit/2)/Math.abs(this.x_limit/2)
}

function calcOvularCoords(galaxy, r, θ) {
    const {a,b, k, h, tilt} = galaxy;

    const ux = r * Math.cos(θ); 
    const uy = r * Math.sin(θ);

    const ex = a * ux;
    const ey = b * uy;
    
    const rx = ex * Math.cos(tilt) - ey * Math.sin(tilt);
    const ry = ex * Math.sin(tilt) + ey * Math.cos(tilt);
    
    // offset by desired center position 
    return [h + rx, k + ry];
}

function percentageOfRadius(minVal, val, maxVal, abs=true) {
  if (abs)
    return (Math.abs(val-minVal)/Math.abs(maxVal-minVal))**1.5
  const eq = (val- minVal)/(maxVal-minVal)
  const res = eq > 0 ? eq**1.5 : -1 * eq**1.5
  return res;
}

function createGalaxy(center_x, center_y, height, width, tilt, color=1, otherColor) { //, colors, concentration, tilt) {
  const galaxy = {
    'a': width,
    'b': height,
    'r': 500,
    'k': center_y,
    'h': center_x,
    "tilt": tilt
  }  
  for (var i = 0; i < 1000; i++) {

    // random r and theta value
    const r = Math.sqrt(Math.random());
    const θ = 2 * Math.PI * Math.random();

    // min = center_x, val = x, max = maxX
    const [maxX,maxY] = calcOvularCoords(galaxy, 1, θ);
    var [x,y] = calcOvularCoords(galaxy, r, θ);

    const percentOfRadius = percentageOfRadius(center_x, x, maxX) * 255;
    switch (color) {
      case 0:
        ctx.fillStyle = `rgb(${percentOfRadius}, 30, ${otherColor})`
        break;
      case 1:
        ctx.fillStyle = `rgb(180, ${percentOfRadius * 0.3}, 60)`
        break;
      case 2:
        ctx.fillStyle = `rgb(${otherColor}, 30, ${percentOfRadius})`
        break;
    }
    // const portionOfRadius = percentageOfRadius(center_x, x, maxX, abs=true) * 255;

    // const randomScale = Math.random() * 300;
    // if (portionOfRadius > 0.9) {
    //   x += Math.random() * randomScale;
    //   y += Math.random() * randomScale;
    // }
    // if (portionOfRadius < -0.9) {
    //   x -= Math.random() * randomScale;
    //   y -= Math.random() * randomScale;
    // }
    ctx.fillRect(x, y, 5, 5);
  }
}

// experiment with not clearing page afterwards!!

const galaxies = [];
const numGalaxies = 3;

for (let i = 0; i < numGalaxies; i++) {
  const galaxy = {}
  galaxy['color'] = Math.floor(Math.random() * 3);
  galaxy['x'] = Math.random() > 0.5 ? Math.random() * 0.25 * canvas.width : Math.random() * 0.25 * canvas.width + canvas.width*0.75;
  galaxy['y'] = Math.random() * canvas.height * 0.6 + canvas.height * 0.2;
  galaxy['width'] = Math.random() * 200 + 100;
  galaxy['height'] = Math.random() * 25 + 50;
  galaxy['tilt'] = Math.random() * Math.PI;
  galaxy['otherColor'] = Math.random()*255 + 10;
  galaxies.push(galaxy);
}

const rand = Math.random()*255 + 10;
function draw() {  
  
  ctx.fillStyle = 'black';
  // ctx.fillRect(0, 0, canvas.width, canvas.height);

  // createGalaxy(400,700,350,100, 2.2, color=1, otherColor=Math.random()*255 + 10);
  // createGalaxy(canvas.width*0.8,canvas.height*0.6,350,100, 0.8, color=2, otherColor=rand);
  // for (const g in galaxies) {
  //   const galaxy = galaxies[g];
  //   createGalaxy(galaxy['x'], galaxy['y'], galaxy['width'], galaxy['height'], galaxy['tilt'], color=galaxy['color'], otherColor=galaxy['otherColor'])
  // }

  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.font = 'bold 100px Courier'
  ctx.fillText('sierra janson', canvas.width/2, canvas.height/2)
  ctx.font = 'bold 30px Courier'
  ctx.fillText('computer science', canvas.width/2, canvas.height/2 + 75);

  if (removeParticles) {
    for (var i = 0; i < 3; i++) {
      if (particles.length > 0) {
        particles.shift();
      }
    }
  }
  for (const p in particles) {
    particles[p].nebula(delta);
  }
    // for (const np in nebulaParticles) {
      //   nebulaParticles[np].nebula(delta);
      // }
      
  delta +=0.1;
}
    // document.addEventListener('click', function(event) {
      //   var mx = event.clientX;
//   var my = event.clientY;

//   particles.push(new Cluster(mx,my,25,6));//event.clientX, event.clickY,50,3));
// });

let timer;
document.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  particles.push(new Cluster(x,y,5,6));
  if (particles.length > 50) {
    particles.shift()
  }
  clearTimeout(timer);
  removeParticles = false;
  timer = setTimeout(() => {
    console.log("stopped for 2 seconds");
    removeParticles = true;
  }, 200);

});


// for (var i = 0; i < 5000; i++) {
//   nebulaParticles.push(new Cluster(Math.random()*canvas.width,Math.random()*canvas.height,5,6));
// }
setInterval(draw, 50);




// function mainLoop() {
//   update();
//   draw();
//   requestAnimationFrame(mainLoop);
// }

// mainLoop();
// canvas.onload = () => {
//     mainLoop();
// };