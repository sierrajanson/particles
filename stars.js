export function createStars() {
    const stars = [];
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
  return stars;
}

export function renderStars(ctx, stars) {
  for (const star in stars) {
    const brightness = stars[star][2]; //Math.pow(Math.random(),4);
    const size = stars[star][3];
    ctx.fillStyle = `rgb(${brightness*255},${brightness*255},${brightness*255})`;
    ctx.fillRect(stars[star][0], stars[star][1], 1+2*size,1+2*size); //5*size, 5*size);
  }
}