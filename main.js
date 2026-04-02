/*
fun ideas:
- blackboard/whiteboard
- bubbles
- neon signs
- rotating planets
- animated cat
*/
import {renderTextContent} from './renderTextContent.js';
import {renderGalaxies, createGalaxies} from './createGalaxy.js';
import {createStars, renderStars} from './stars.js';
import {clearCanvas} from './helper.js'
import {renderImage, drawImageCloud} from './imageRenderer.js';
import { renderCursorTrail } from './renderCursorTrail.js';
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const heightMultiplier = window.innerWidth > window.innerHeight ? 2.5 : 1.5
canvas.height = window.innerHeight*heightMultiplier;
canvas.width = window.innerWidth;
// Later in your main loop:
const glowCanvas = document.createElement("canvas");
const glowCtx = glowCanvas.getContext("2d");

glowCanvas.width = canvas.width;
glowCanvas.height = canvas.height;

const stars = createStars(glowCtx);
const galaxyPositions =createGalaxies(ctx, 5, [canvas.width, canvas.height/heightMultiplier])
renderImage(ctx);
var delta = Math.PI
var x = 300;
var y = 300;
let increment = 0.07;
function draw() {  
  clearCanvas(ctx);
  ctx.drawImage(glowCanvas, 0, 0);
  // console.log(window.scrollY)

  // drawImageCloud(ctx,200,400);
  delta += increment
  renderGalaxies(ctx,delta, galaxyPositions);
  renderTextContent(ctx,heightMultiplier);
  renderCursorTrail();
  if (delta > 10 * Math.PI) {
    increment = -increment;
  }
  if (delta < 0) {
    increment = -increment;
  }

}

setInterval(draw, 50);