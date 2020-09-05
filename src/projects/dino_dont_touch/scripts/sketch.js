// import Bush from "./Bush";
// import Dino from "./Dino";
// import { nextGeneration } from "./next";
import * as tf from "@tensorflow/tfjs";
import NeuralNetwork from "./nn";

export default function sketch(p) {
  class Bush {
    constructor(x, amount, size) {
      this.x = x;
      this.amount = amount;
      this.width = widthBush * amount;
      this.height = size * 20;
    }

    show() {
      p.fill(0);
      p.rect(this.x, 400 - this.height, this.width, this.height);
    }

    update() {
      this.x -= gameSpeed;
    }

    colision(dinoX, dino_bottom) {
      if (dinoX + 20 >= this.x && dinoX <= this.x + this.width) {
        if (dino_bottom >= 400 - this.height) {
          return true;
        }
      }
      return false;
    }

    behindScene() {
      return this.x < -50;
    }
  }

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
      //		this.isDucking = false;

      this.score = 0;
      this.fitness = 0;
      if (brain) {
        this.brain = brain.copy(p);
      } else {
        this.brain = new NeuralNetwork(4, 4, 2, p);
      }
    }

    show() {
      this.p.fill(0);
      this.p.rect(
        this.position_X,
        this.bottom_Y - this.height,
        20,
        this.height
      );
    }

    update() {
      this.score++;
      this.velocity += this.gravity;

      if (this.velocity > 16) {
        this.velocity = 16;
      }

      if (this.bottom_Y + this.velocity > 400) {
        this.bottom_Y = 400;
        this.velocity = 0;
      } else {
        this.bottom_Y += this.velocity;
      }
      this.show();
    }

    dispose() {
      this.brain.dispose();
    }

    jump_low() {
      if (this.isGrounded()) {
        this.velocity = this.lift;
      }
    }

    jump_high() {
      if (this.isGrounded()) {
        this.velocity = this.lift * 1.2;
      }
    }

    isGrounded() {
      return this.bottom_Y === 400;
    }

    mutate() {
      this.brain.mutate(mutationRate);
    }

    think(bush) {
      let closest = null;
      let closestD = Infinity;
      for (let i = 0; i < bush.length; i++) {
        let d = bush[i].x - this.position_X;
        //		console.log(d);
        if (d < closestD && d > 0) {
          closest = bush[i];
          closestD = d;
        }
      }

      let inputs = [];
      inputs[0] = closest.x;
      inputs[1] = this.bottom_Y;
      inputs[2] = closest.width;
      inputs[3] = closest.height;

      let output = this.brain.predict(inputs);
      if (output[0] > output[1]) {
        this.jump_low();
      }
    }
  }
  let run = false;
  let first = true;

  //Game variable
  let sizeOfBush = [1, 1, 1, 2, 2, 3];
  let smallOrHigh = [1, 1, 1, 1, 1, 1, 1, 1, 2, 2];
  let widthBush = 22;
  let gameSpeed = 6;
  // let gameAdjuster = 0.01;
  // let counter = 0;
  let frameCounter = 0;
  let bush = [];

  let slider;

  //Neural variable
  let dinos = [];
  let deadDinos = [];
  let populationSize = 20;
  let mutationRate = 0.1;
  let generation = 1;
  let canvas;
  p.setup = () => {
    canvas = p.createCanvas(1000, 500);
    let text1 = p.createP("Speed: ");
    slider = p.createSlider(1, 10, 1);
    slider.parent(text1);

    tf.setBackend("cpu");

    for (let i = 0; i < populationSize; i++) {
      dinos.push(new Dino(null, p));
    }
  };
  function nextGeneration() {
    //  console.log('next generation');
    calculateFitness();
    for (let i = 0; i < populationSize; i++) {
      dinos[i] = pickOne();
    }
    for (let i = 0; i < populationSize; i++) {
      deadDinos[i].dispose();
    }
    deadDinos = [];
  }

  function pickOne() {
    let index = 0;
    let r = p.random(1);
    while (r > 0) {
      r = r - deadDinos[index].fitness;
      index++;
    }
    index--;
    let dino = deadDinos[index];
    let child = new Dino(dino.brain, p);
    child.mutate();
    return child;
  }

  let calculateFitness = () => {
    let sum = 0;
    for (let dino of deadDinos) {
      sum += dino.score;
    }
    for (let dino of deadDinos) {
      dino.fitness = dino.score / sum;
    }
  };

  p.draw = () => {
    if (run || first) {
      for (let i = 0; i < slider.value(); i++) {
        p.background(189, 96, 96);
        p.line(0, 400, 1000, 400);

        spawnBarrier();
        bushUpdate();
        destroyBush();

        for (let dino of dinos) {
          dino.think(bush);
          dino.update();
        }

        if (dinos.length === 0) {
          frameCounter = 0;
          nextGeneration();
          generation++;
          bush = [];
        }
      }
      p.textSize(32);
      let liveshow = dinos.length;
      p.text("Generation: " + generation, 500, 30);
      p.text("Live: " + liveshow, 30, 30);

      first = false;
    }
  };

  function spawnBarrier() {
    if (frameCounter % 90 === 0) {
      let r = p.random(100, 300);
      let ss = p.random(sizeOfBush);
      let qwe = p.random(smallOrHigh);
      bush.push(new Bush(1000 + r, ss, qwe));
      frameCounter = 0;
    }
    frameCounter++;
  }

  function bushUpdate() {
    for (let i = 0; i < bush.length; i++) {
      bush[i].update();
      bush[i].show();
      for (let j = 0; j < dinos.length; j++) {
        if (bush[i].colision(dinos[j].position_X, dinos[j].bottom_Y)) {
          deadDinos.push(dinos.splice(j, 1)[0]);
        }
      }
    }
  }

  function destroyBush() {
    for (let i = bush.length - 1; i >= 0; i--) {
      if (bush[i].behindScene()) {
        bush.splice(i, 1);
      }
    }
  }
}
