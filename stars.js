export function createStars(glowCtx) {
    const stars = [];
  for (let i = 0; i < canvas.width; i+=1) {
    for (let j = 0; j < canvas.height; j+=1) {
      const [brightness, size, createStar] = [Math.random(), Math.random(), Math.random()];
      // console.log(x,y, noise(x,y))
      // (noise(i/15, j/15) > 0.9)
      // (noise(i/15, j/15) > 0.9) {//
      if (Math.pow(createStar,3) > 0.99) { //noise(x, y) > 0) {
        // stars.push([i,j,Math.pow(brightness,4), 1+2*Math.pow(size, 6)]); //x*canvas.width, y*canvas.height]);
        if (Math.random() > 0.5) {
          glowCtx.shadowColor = "rgba(0,150,255,1)";
        } else {
          glowCtx.shadowColor = "rgba(255,150,0,0.8)";
        }
        glowCtx.shadowBlur = 8;
        glowCtx.fillStyle = `rgb(${brightness*255},${brightness*255},${brightness*255})`;
        glowCtx.fillRect(i, j,1+3*Math.pow(size, 16), 1+3*Math.pow(size, 16));
      }
    }
  }
  return stars;
}

export function renderStars(ctx, stars) {
  for (const star in stars) {
    const brightness = stars[star][2]; //Math.pow(Math.random(),4);
    const size = stars[star][3];
    ctx.fillStyle = `rgb(${brightness*255},${brightness*255},${brightness*255})`;
    ctx.fillRect(stars[star][0], stars[star][1], size, size); //5*size, 5*size);
  }
}