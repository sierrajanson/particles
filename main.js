/*
fun ideas:
- blackboard/whiteboard
- bubbles
- neon signs
- rotating planets
- animated cat
*/

import {renderTextContent} from './renderTextContent.js';
import {spawnGalaxies, renderGalaxies, createGalaxies, createGalaxy} from './createGalaxy.js';
import {createStars, renderStars} from './stars.js';
import {clearCanvas} from './helper.js'
import {renderImage, drawImageCloud} from './imageRenderer.js';
import { renderCursorTrail } from './renderCursorTrail.js';
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const heightMultiplier = 2.5
canvas.height = window.innerHeight*heightMultiplier;
canvas.width = window.innerWidth;

const galaxies = spawnGalaxies(5, 20, [canvas.width, canvas.height/heightMultiplier], [canvas.width/2, canvas.height/5]);
const stars = createStars();
const galaxyPositions =createGalaxies(ctx, galaxies)
// renderImage(ctx);
var delta = 0
var x = 300;
var y = 300;
let increment = 0.07;
function draw() {  
  clearCanvas(ctx);
  // ctx.fillStyle = 'white'
  // ctx.fillRect(x+ Math.cos(delta)*30, y+ Math.sin(delta)*30, 10, 10);
  // ctx.fillRect(x+ Math.cos(delta)*60, y+ Math.sin(delta)*60, 10, 10);
  
  // drawImageCloud(ctx,200,400);
  delta += increment
  renderStars(ctx,stars);
  renderGalaxies(ctx,delta, galaxyPositions);
  renderTextContent(ctx);
  renderCursorTrail();
  if (delta > 10 * Math.PI) {
    increment = -increment;
  }
  if (delta < 0) {
    increment = -increment;
  }

}

setInterval(draw, 50);