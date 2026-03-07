function renderNebula(nebulaParticles) {
  for (const np in nebulaParticles) {
    nebulaParticles[np].nebula();
  }      
}

function createNebula() {
  const nebulaParticles = [];
  for (var i = 0; i < 1000; i++) {
    nebulaParticles.push(new Cluster(Math.random()*canvas.width,Math.random()*canvas.height,5,6, x_limit=canvas.width));
  }
  return nebulaParticles;
}