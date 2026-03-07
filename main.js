/*
fun ideas:
- blackboard/whiteboard
- bubbles
- neon signs
- rotating planets
- animated cat
*/

import {renderTextContent} from './renderTextContent.js';
import {spawnGalaxies, renderGalaxies, createGalaxies} from './createGalaxy.js';
import {createStars, renderStars} from './stars.js';
import {clearCanvas} from './helper.js'
import {renderImage, drawImageCloud} from './imageRenderer.js';
import { renderCursorTrail } from './renderCursorTrail.js';
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.height = window.innerHeight*2.5;
canvas.width = window.innerWidth;

const galaxies = spawnGalaxies();
const stars = createStars();
const galaxyPositions = createGalaxies(ctx, galaxies)
renderImage(ctx);
// var delta = 0
// var x = 300;
// var y = 300;
function draw() {  
  clearCanvas(ctx);
  renderStars(ctx,stars);
  // ctx.fillStyle = 'white'
  // ctx.fillRect(x+ Math.cos(delta)*30, y+ Math.sin(delta)*30, 10, 10);
  // ctx.fillRect(x+ Math.cos(delta)*60, y+ Math.sin(delta)*60, 10, 10);

  // delta += 1
  // drawImageCloud(ctx,200,400);
  // renderGalaxies(ctx,delta, galaxyPositions);
  renderTextContent(ctx);
  renderCursorTrail();
}

setInterval(draw, 50);