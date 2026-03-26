// import { createNoise2D } from 'https://cdn.jsdelivr.net/npm/simplex-noise@4.0.1/+esm'
// const noise = createNoise2D();
const noise = (x,y) => {return 0.5}
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
  const galaxyPositions = []
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

    const percentOfRadius = percentageOfRadius(center_x, x, maxX) * 255 + Math.random()*20 - 10;
    let max = 255;
    switch (color) {
      case 0: // white - orange - blue
        if (percentOfRadius < 0.13*255) { // white-orange
          ctx.fillStyle = `rgb(${max}, ${max-percentOfRadius*0.85}, ${max-percentOfRadius*0.95})`
        } else {
          max = (1-(percentOfRadius/255)*0.6)*max
          ctx.fillStyle = `rgb(${max-percentOfRadius}, ${max-percentOfRadius+60*(3*percentOfRadius/255)},  ${max-percentOfRadius+90*(3*percentOfRadius/255)})`
        }
        break;
      case 1:
        if (percentOfRadius < 0.13*255) { // white-orange
          ctx.fillStyle = `rgb(${max}, ${max-percentOfRadius*0.85}, ${max-percentOfRadius})`
        } else {
          max = (1-(percentOfRadius/255)*0.6)*max
          ctx.fillStyle = `rgb(${max-percentOfRadius+70*(3*percentOfRadius/255)}, ${max-percentOfRadius},  ${max-percentOfRadius+90*(3*percentOfRadius/255)})`
        }
        break;
        case 2: // white-orange-red
        if (percentOfRadius < 0.15*255) { 
          ctx.fillStyle = `rgb(${max}, ${max-percentOfRadius*0.75}, ${max-percentOfRadius})`
        } else {
          max = (1-(percentOfRadius/255)*0.6)*max
          ctx.fillStyle = `rgb(${max-percentOfRadius+120*(3*percentOfRadius/255)}, ${max-percentOfRadius+90*(percentOfRadius/255)}, ${max-percentOfRadius})`
        }        
        break;
    }
    // ctx.fillRect(x, y, 3, 3);
    galaxyPositions.push([ctx.fillStyle, r, center_x, center_y, θ, width,height, tilt])
  }
  return galaxyPositions
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

function isInBox(x, y, center_x, center_y, x_width, y_height) {
  return x >=center_x- x_width/2 && x < center_x+x_width/2 && y >= center_y - y_height/2 && y < center_y + y_height/2;
}

export function spawnGalaxies(numGalaxies=10,numSmallGalaxies=20, inBox=[canvas.width, canvas.height], outBox=[]) {

  const galaxies = [];

  for (let i = 0; i < numGalaxies; i++) {
    const galaxy = {}
    galaxy['color'] = Math.floor(Math.random() * 3);
    let [x,y] = getCoordWithPerlinDistribution(inBox[0], inBox[1], 1);
    if (outBox.length > 0) {
      console.log('yay')
     while (isInBox(x,y,outBox[0], outBox[1], 1000, 1000)) {
      console.log('here')
      let [newx,newy] = getCoordWithPerlinDistribution(inBox[0], inBox[1], 1);
      x = newx;
      y = newy;
      break;
     }
    }
    galaxy['x'] = x;
    galaxy['y'] = y;
    // galaxy['x'] = Math.random() *canvas.width; // > 0.5 ? Math.random() * 0.25 * canvas.width : Math.random() * 0.25 * canvas.width + canvas.width*0.75;
    // galaxy['y'] = Math.random() * canvas.height;
    galaxy['width'] = Math.random() * 150 + 30; //200 + 100;
    galaxy['height'] = Math.random() * 50 + 30; //25 + 50;
    galaxy['tilt'] = Math.random() * Math.PI;
    galaxy['otherColor'] = Math.random()*255 + 10;
    galaxy['pixels'] = galaxy['width'] * galaxy['height'] * 0.6;
    galaxies.push(galaxy);
  }

  for (let i = 0; i < numSmallGalaxies; i++) {
    const galaxy = {}
    galaxy['color'] = Math.floor(Math.random() * 3);
    let [x,y] = getCoordWithPerlinDistribution(inBox[0], inBox[1], 1);

    galaxy['x'] = x;
    galaxy['y'] = y;
    // galaxy['x'] = Math.random() *canvas.width; // > 0.5 ? Math.random() * 0.25 * canvas.width : Math.random() * 0.25 * canvas.width + canvas.width*0.75;
    // galaxy['y'] = Math.random() * canvas.height;
    galaxy['width'] = Math.random() * 20 + 5; //200 + 100;
    galaxy['height'] = Math.random() * 10 + 5; //25 + 50;
    galaxy['tilt'] = Math.random() * Math.PI;
    galaxy['pixels'] = galaxy['width'] * galaxy['height'] * 0.6;
    galaxies.push(galaxy);
  }
  return galaxies;
}

export function createGalaxies(ctx, galaxies) {
  const allGalaxies = [];
  for (const g in galaxies) {
    const galaxy = galaxies[g];
    allGalaxies.push(createGalaxy(ctx, galaxy['x'], galaxy['y'], galaxy['height'], galaxy['width'], galaxy['tilt'], galaxy['color'], galaxy['otherColor'], galaxy['pixels']))
  }
  return allGalaxies
}

export function renderGalaxies(ctx, delta, galaxyPositions) {
  for (let g = 0; g < galaxyPositions.length; g+=1) {
    const delta2 = delta + g * 2
    const multiplier = g%2==0 ? 1 : -1
    for (let i = 0; i < galaxyPositions[g].length; i++) {
      const [fillStyle, r, center_x, center_y, angle, a, b, tilt] = galaxyPositions[g][i]
      const angle2 = angle //+ delta
      const tilt2 = 1.1
      let relativeAngleWithTilt = (angle2+delta*r)*tilt2

      let layerAngle = delta*r*tilt2+angle2

      ctx.fillStyle = fillStyle
      // works
      // ctx.fillRect(center_x + (r)*a*Math.cos(angle+delta*(r)), center_y + (r)*b*Math.sin(delta*(r)+angle), 3, 3);
      // ctx.fillRect(center_x + multiplier*r*a*Math.cos(relativeAngleWithTilt), center_y + r*b*Math.sin(layerAngle), 3, 3);
      // ctx.fillRect(center_x + r*a*Math.cos(relativeAngleWithTilt), center_y + r*b*Math.sin(layerAngle), 3, 3);

      ctx.fillRect(
        center_x + r*a*(Math.cos(relativeAngleWithTilt) - Math.sin(relativeAngleWithTilt)), 
        center_y + multiplier*r*b*(Math.sin(layerAngle) + Math.cos(layerAngle)), 3,3//(1-r)+1.5, (1-r) +1.5
      );
  /**
   * i want theinner particles to move in a small circle
   * i want the outer particles to move in big circles
   * should calculate r based on x and y
   */
    }
  }
}


// function renderButterfly(ctx, delta, galaxyPositions) {
//   for (let i = 0; i < galaxyPositions.length; i++) {
//     const [x,y, fillStyle, percentageOfRadius, center_x, max_x] = galaxyPositions[i]
//     ctx.fillStyle = fillStyle
//     // console.log(x,center_x,max_x)
//     const r = Math.abs(max_x-center_x) * (percentageOfRadius)
//     // console.log(percentageOfRadius)
//     ctx.fillRect(x + r*Math.cos(delta), y+ r*Math.sin(delta), 3, 3);

//   }
// }