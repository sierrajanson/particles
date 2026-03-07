import {getDistanceRatio, clearCanvas} from './helper.js'
const newImage = [];

export function drawImageCloud(ctx,startX, startY) {
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
      if (distanceRatio > 0.5) continue;
      const scaleFactor = 50 * distanceRatio**2;
      const xCoord = startX + x + (Math.random()-0.5)*scaleFactor;
       const yCoord = startY + y + (Math.random()-0.5)*scaleFactor
      ctx.fillRect(xCoord,yCoord,3,3); //5*size, 5*size);
    }
  }
}

export function renderImage(ctx,xscale=2, yscale=1,shrinkFactor=3) {

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
  
  clearCanvas(ctx);

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