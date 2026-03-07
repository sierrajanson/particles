export function genCoord(amplitude, centerVal) {
  return (Math.random() * amplitude)/2 + -(Math.random() * amplitude)/2 + centerVal;
}

export function percentOfColor(val) {
  return Math.abs(val- this.x_limit/2)/Math.abs(this.x_limit/2)
}

export function clearCanvas(ctx) {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

export function getDistanceRatio(x,y, centerX, centerY) {
  return Math.sqrt(((centerX - x)**2) + (centerY - y)**2)/Math.sqrt(centerX**2 + centerY**2);
}