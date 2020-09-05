import config from "./configuration.json";

function drawConstantEnviroment(p) {
  p.background(19, 96, 96);
  p.line(
    0,
    -(100 - config.GAME_HEIGHT),
    config.GAME_WIDTH,
    -(100 - config.GAME_HEIGHT)
  );
}

export { drawConstantEnviroment };
