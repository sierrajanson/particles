/*
fun ideas:
- blackboard/whiteboard
- bubbles
- neon signs
- rotating planets
- animated cat
*/

import {renderTextContent} from './renderTextContent.js';
import {createGalaxy, spawnGalaxies} from './createGalaxy.js';
import Cluster from './Cluster.js'

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.height = window.innerHeight*2.5;
canvas.width = window.innerWidth;

var particles = [];
var nebulaParticles = [];
var delta = 0;
var removeParticles = false;

function genCoord(amplitude, centerVal) {
  return (Math.random() * amplitude)/2 + -(Math.random() * amplitude)/2 + centerVal;
}

function percentOfColor(val) {
  return Math.abs(val- this.x_limit/2)/Math.abs(this.x_limit/2)
}

function clearCanvas() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function renderCursorTrail(removeParticles) {
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
}
const galaxies = spawnGalaxies();
function renderGalaxies() {
  for (const g in galaxies) {
    const galaxy = galaxies[g];
    createGalaxy(ctx, galaxy['x'], galaxy['y'], galaxy['height'], galaxy['width'], galaxy['tilt'], galaxy['color'], galaxy['otherColor'], galaxy['pixels'])
  }
}
function renderStars() {
  for (const star in stars) {
    const brightness = stars[star][2]; //Math.pow(Math.random(),4);
    const size = stars[star][3];
    ctx.fillStyle = `rgb(${brightness*255},${brightness*255},${brightness*255})`;
    ctx.fillRect(stars[star][0], stars[star][1], 1+2*size,1+2*size); //5*size, 5*size);
  }
}

const newImage = [];
function renderImage(xscale=2, yscale=1,shrinkFactor=3) {

  // swapped xscale & yscale.. maybe keep right and flop the way that they're read later on
  const img = new Image();
  img.src="Nebula.jpg";
  const yinterval = 1 * shrinkFactor;
  const xinterval = 1 * shrinkFactor;
  img.onload = () => {
    ctx.drawImage(img, 0,0);
    const imageData = ctx.getImageData(0, 0, img.width, img.height);
    const data = imageData.data;
    
    for (let y = 0; y < img.height; y+=yinterval) {
      const row = [];
      for (let x = 0; x < img.width; x+=xinterval) {
        const i = (y * img.width + x) * 4;
        for (let xscaleiter = 0; xscaleiter < yscale; xscaleiter++) {
          row.push({
            r: data[i],
            g: data[i + 1],
            b: data[i + 2],
            a: data[i + 3]
          });
        }
    }
    for (let yscaleiter = 0; yscaleiter < xscale; yscaleiter++) {
      newImage.push(row);
    }
  }
  
  clearCanvas();

  // const imageData2 = ctx.getImageData(0, 0, newImage.length, newImage.length);
  // const data2 = imageData2.data;
  // // want to take every k points from imageData2

  // center is newImage.length/2
  // 

  // for (let y = 0; y < newImage.length; y++) {
  //   for (let x = 0; x < newImage.length; x++) {
  //     const p = newImage[x][y];
  //     // should be more spread out around the edges
  //     // should be based on distance from the center with exponential distribution...
  //     console.log(newImage.length/2, newImage.length)
  //     const distanceFactor = getDistanceRatio(x,y,newImage.length/2, newImage.length/2);
  //     const radialDistanceFactor = 10 * distanceFactor**3;
      
  //     ctx.fillStyle = `rgba(${255 * distanceFactor}, ${0}, ${0}, ${1})`;
  //     ctx.fillRect(x+(Math.random() - 0.5)*radialDistanceFactor,y+(Math.random()-0.5)*radialDistanceFactor,1,1); //5*size, 5*size);

  //     // every four points in data2 is rgb
  // //     const i = (y * newImage.length + x) * 4; // 4 for every 

  // //     data2[i]     = p.r;
  // //     data2[i + 1] = p.g;
  // //     data2[i + 2] = p.b;
  // //     data2[i + 3] = p.a; // 0–255
  //   }
  // }
  // ctx.putImageData(imageData2,0,0);

  }
}
function renderNebula() {
  for (const np in nebulaParticles) {
    nebulaParticles[np].nebula(delta);
  }      
}
function getDistanceRatio(x,y, centerX, centerY) {
  return Math.sqrt(((centerX - x)**2) + (centerY - y)**2)/Math.sqrt(centerX**2 + centerY**2);
}
   
var stars = [];
renderImage();

function drawImageCloud(startX, startY) {
  // ctx.save();
  // ctx.beginPath();
  const xCen = startX + newImage.length/2
  const yCen = startY + newImage[0].length/2
  // ctx.ellipse(xCen, yCen, newImage.length/2, newImage[0].length/2, 0, 0, Math.PI * 2); // stopping everything
  // ctx.clip();
  for (let x = 0; x < newImage.length; x+=5) {
    for (let y = 0; y < newImage[0].length; y+=5) {
      const p = newImage[x][y];
      const distanceRatio = getDistanceRatio(x,y,newImage.length/2, newImage[0].length/2);
      const opacity = 1; //-distanceRatio**1.5;
      //  ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, 1)`;
      
      ctx.fillStyle = `rgba(${p.r*1.5}, ${p.g}, ${p.b*1.5}, ${opacity})`;
      if (distanceRatio > 0.7) continue;
      const scaleFactor = 50 * distanceRatio**2;
      const xCoord = startX + x + (Math.random()-0.5)*scaleFactor;
       const yCoord = startY + y + (Math.random()-0.5)*scaleFactor
      ctx.fillRect(xCoord,yCoord,3,3); //5*size, 5*size);
    }
  }
}
// ctx.restore();

function draw() {  
  clearCanvas();
  // drawImageCloud(200,400);
  
  renderStars();
  renderGalaxies();
  renderNebula();
  renderTextContent(ctx);
  renderCursorTrail(removeParticles);

  delta +=0.5;
}

// function createCursorTrail() {
let timer;
document.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  particles.push(new Cluster(x,y,4,5));
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
// }
// createCursorTrail();
// function createNebula() {
//   for (var i = 0; i < 1000; i++) {
//     nebulaParticles.push(new Cluster(Math.random()*canvas.width,Math.random()*canvas.height,5,6, x_limit=canvas.width));
//   }
// }
  
function createStars() {
  for (let i = 0; i < canvas.width; i+=1) {
    for (let j = 0; j < canvas.height; j+=1) {
      const [brightness, size, createStar] = [Math.random(), Math.random(), Math.random()];
      // console.log(x,y, noise(x,y))
      // (noise(i/15, j/15) > 0.9)
      // (noise(i/15, j/15) > 0.9) {//
      if (Math.pow(createStar,3) > 0.99) { //noise(x, y) > 0) {
        stars.push([i,j,Math.pow(brightness,4), Math.pow(size, 6)]); //x*canvas.width, y*canvas.height]);
      }
    }
  }
}
createStars();
setInterval(draw, 50);