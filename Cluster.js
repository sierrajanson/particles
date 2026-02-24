const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

class Particle {
  constructor(start_x, start_y, width=50, speed=2, x_limit=canvas.width, y_limit=canvas.height) {
    this.start_x = start_x;
    this.start_y = start_y;
    this.width = width;
    this.speed = speed;
    this.y_limit = y_limit;
    this.x_limit = x_limit;
  }
  isValidPosition(x, y) {
    return x >= 0 && x < this.x_limit && y >=0 && y < this.y_limit;
  }
}

export default class Cluster extends Particle {
  constructor(start_x, start_y, width=50, speed=2, up=0, down=0, left=0, right=0, x_limit=canvas.width, y_limit=canvas.height) {
    super(start_x, start_y, width, speed, x_limit, y_limit)
    this.x = start_x;
    this.y = start_y;

    this.up = start_y;
    this.down = start_y;
    this.left = start_x;
    this.right = start_x;

  }
  // render(delta) {
  //   var centerx = Math.sin(delta)*this.radius + this.start_x;
  //   var centery = -Math.cos(delta)*this.radius + this.start_y;
  //   ctx.fillStyle = `rgb(${255 - Math.sin(delta)*255}, 0,${Math.cos(delta)*255})`; //'purple';
  //   ctx.fillRect(centerx, centery, this.width, this.width);
  //   ctx.fillStyle = `rgb(${Math.sin(delta)*255}, 0,${50 + Math.cos(delta)*255})`; 

  //   ctx.fillRect(centerx+this.width, centery, this.width, this.width);
  //   ctx.fillRect(centerx-this.width, centery, this.width, this.width);
  //   ctx.fillRect(centerx, centery+this.width, this.width, this.width);
  //   ctx.fillRect(centerx, centery-this.width, this.width, this.width);
  // }
  // most blue on edge
  // means 
  // canvas.width/2 = 0 blue
  // 0 or canvas.width = 255 blue
  // 
  percentOfColor(val, beg_val) {
    return Math.abs(val- this.x_limit/2)/Math.abs(this.x_limit/2)
  }

  getColor(val, beg_val) {
    return 255 * this.percentOfColor(val, beg_val);
  }
  updatePositions() {
    this.right += this.speed;
    this.left -= this.speed;
    this.up += this.speed;
    this.down -= this.speed;

    if (!this.isValidPosition(this.right, this.y)) {
      this.right = this.start_x;
    }
    if (!this.isValidPosition(this.left, this.y)) {
      this.left = this.start_x;
    }
    if (!this.isValidPosition(this.x, this.up)) {
      this.up = this.y;
    }
    if (!this.isValidPosition(this.x, this.down)) {
      this.down = this.y;
    }

  }
  // d = sqrt((x2-x1)^2 + (y2-y1)^2)
  getNebulaColor(val) {
    // x movement, want to change these values
  const percent = Math.abs(this.x_limit/2 - val)/(this.x_limit/2);
    if (percent < 4/7) {
      // return 'gold';
      return `rgb(255,0,0)`//`rgb(120, 0, 0)`;
      //color should be light to dark orange
    // } else {
      // return 'white';
    }
    else if (percent < 5/7) {
      return `rgb(240, 120, 0)`;
      //color should be dark red
    } 
    else if (percent < 11/14) {
      return `rgb(240, 200, 0)`;
    //   //color should be dark red
    } else {
      return `rgb(0, 220, 240)`;
    //   //color should be black
    }
  }
  displayParticles(colors) {
    ctx.fillStyle = colors[0];
    ctx.fillRect(this.right, this.y, this.width, this.width);
    ctx.fillStyle = colors[1];
    ctx.fillRect(this.left, this.y, this.width, this.width);
    ctx.fillStyle = colors[2];
    ctx.fillRect(this.x, this.up, this.width, this.width);
    ctx.fillStyle = colors[3];
    ctx.fillRect(this.x, this.down, this.width, this.width);
  }
  calcDistance(x,y, ylim=this.y_limit, xlim=this.x_limit) {
    return Math.sqrt(((xlim/2 - x)**2)/3 + (ylim/2 - y)**2);
  }
  nebula(delta) {
    this.updatePositions();
    const colors = [];
    colors.push(this.getNebulaColor(this.calcDistance(this.right, this.start_y, window.innerHeight) + Math.random() * 100));
    colors.push(this.getNebulaColor(this.calcDistance(this.left, this.start_y, window.innerHeight) + Math.random() * 100));
    colors.push(this.getNebulaColor(this.calcDistance(this.start_x, this.up, window.innerHeight) + Math.random() * 100));
    colors.push(this.getNebulaColor(this.calcDistance(this.start_x, this.down, window.innerHeight) + Math.random() * 100));
    this.displayParticles(colors);
  }

  ripple(delta) {
    const colors = [];
    this.updatePositions();
    colors.push(`rgb(120, 0,${this.getColor(this.right, this.start_x)})`);
    colors.push(`rgb(120, 0,${this.getColor(this.left, this.start_x)})`);
    colors.push(`rgb(120, 0,${this.getColor(this.up, this.start_y)})`);
    colors.push(`rgb(120, 0,${this.getColor(this.down, this.start_y)})`);
    this.displayParticles(colors);
  }
}
