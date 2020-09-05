import config from "./configuration.json";
class Barrier {
  constructor(x, bottom_y, width, height, p) {
    this.x = x;
    this.bottom_y = bottom_y;
    this.width = width * config.BASIC_WIDTH;
    this.height = height * config.BASIC_HEIGHT;
    this.p = p;
  }

  show() {
    this.p.fill(0);
    this.p.rect(this.x, this.bottom_y, this.width, -this.height);
  }

  update() {
    this.x -= config.GAME_SPEED;
  }

  // colision(dinoX, dino_bottom) {
  //   if (dinoX + 20 >= this.x && dinoX <= this.x + this.width) {
  //     if (dino_bottom >= 400 - this.height) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }

  // behindScene() {
  //   return this.x < -50;
  // }
}

export { Barrier };
