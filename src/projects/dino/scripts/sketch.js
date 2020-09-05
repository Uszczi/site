// import * as tf from "@tensorflow/tfjs";

import { returnDinoPopulation, Dino } from "./Dino";
import { Bush } from "./Bush";
import { Bird } from "./Bird";
import { drawConstantEnviroment } from "./enviroment";
import config from "./configuration.json";

let population = 10;
let dinos = [];
let Player;

let b;
let bird;

function sketch(p) {
  p.setup = () => {
    p.createCanvas(config.GAME_WIDTH, config.GAME_HEIGHT);
    b = new Bush(config.GAME_WIDTH + 40, -(100 - config.GAME_HEIGHT), 3, 4, p);
    bird = new Bird(
      config.GAME_WIDTH + 80,
      -(150 - config.GAME_HEIGHT),
      3,
      4,
      p
    );
    Player = new Dino("PLAYER", p);
  };
  p.draw = () => {
    drawConstantEnviroment(p);
    Player.draw();
    b.show();
    b.update();
    bird.show();
    bird.update();
  };
}

export default sketch;
