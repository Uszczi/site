import "./configuration.json";

class Dino {
  constructor(brain, p) {
    this.p = p;
    this.position_X = 100;
    this.position_Y = 200;
    this.height = 50;
    this.bottom_Y = this.position_Y - this.height;

    this.gravity = 0.6;
    this.velocity = 0;
    this.lift = -10;
    if (brain == "PLAYER") {
    } else if (brain) {
    } else {
    }
  }

  draw() {
    this.p.fill(0);
    this.p.rect(100, 100, 100, 100);
  }
}

function returnDinoPopulation(amount, p) {
  let dinos = [];
  for (let i = 0; i < amount; i++) {
    dinos.push(new Dino(null, p));
  }
  return dinos;
}

export { Dino, returnDinoPopulation };
