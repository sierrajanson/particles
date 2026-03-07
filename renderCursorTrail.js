import Cluster from './Cluster.js'

var particles = [];
var removeParticles = false;

export function renderCursorTrail() {
  if (removeParticles) {
    for (var i = 0; i < 3; i++) {
      if (particles.length > 0) {
        particles.shift();
      }
    }
  }
  for (const p in particles) {
    particles[p].nebula();
  }
}
let timer;

document.addEventListener('mousemove', (e) => {
  const canvas = document.getElementById('canvas');

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  particles.push(new Cluster(x,y,4,5));
  if (particles.length > 50) particles.shift()

  clearTimeout(timer);
  removeParticles = false;
  timer = setTimeout(() => {removeParticles = true;}, 200);
});