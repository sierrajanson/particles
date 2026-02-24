import { createNoise2D } from 'https://cdn.jsdelivr.net/npm/simplex-noise@4.0.1/+esm'
const noise = createNoise2D();

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

function percentageOfRadius(minVal, val, maxVal, abs=true, amplifier=1.5) {
  if (abs)
    return (Math.abs(val-minVal)/Math.abs(maxVal-minVal))**amplifier
  const eq = (val- minVal)/(maxVal-minVal)
  const res = eq > 0 ? eq**amplifier : -1 * eq**amplifier
  return res;
}


export function createGalaxy(ctx, center_x, center_y, height, width, tilt, color, otherColor, pixels=1000) { //, colors, concentration, tilt) {
  const galaxy = {
    'a': width,
    'b': height,
    'r': 500,
    'k': center_y,
    'h': center_x,
    "tilt": tilt
  }  
  // console.log(pixels)
  for (var i = 0; i < pixels; i++) {

    // random r and theta value
    const r = Math.random(); //Math.sqrt(Math.random());
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
    ctx.fillRect(x, y, 3, 3);
  }
}

function getCoordWithPerlinDistribution(width, height, scale) {
  while (true) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const density = noise(x*scale, y*scale);
    if (Math.random() < density**2) {
      return [x,y]
    }
  }
}

export function spawnGalaxies() {

  const galaxies = [];
  const numGalaxies = 10//0;

  for (let i = 0; i < numGalaxies; i++) {
    const galaxy = {}
    galaxy['color'] = Math.floor(Math.random() * 3);
    const [x,y] = getCoordWithPerlinDistribution(canvas.width, canvas.height, 0.1);
    galaxy['x'] = x;
    galaxy['y'] = y;
    // galaxy['x'] = Math.random() *canvas.width; // > 0.5 ? Math.random() * 0.25 * canvas.width : Math.random() * 0.25 * canvas.width + canvas.width*0.75;
    // galaxy['y'] = Math.random() * canvas.height;
    galaxy['width'] = Math.random() * 150 + 10; //200 + 100;
    galaxy['height'] = Math.random() * 50 + 5; //25 + 50;
    galaxy['tilt'] = Math.random() * Math.PI;
    galaxy['otherColor'] = Math.random()*255 + 10;
    galaxy['pixels'] = galaxy['width'] * galaxy['height'] * 0.4;
    galaxies.push(galaxy);
  }
  return galaxies;
}
