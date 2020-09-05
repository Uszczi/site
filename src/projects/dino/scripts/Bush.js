import config from "./configuration.json";
import { Barrier } from "./Barrier";

class Bush extends Barrier {
  constructor(x, bottom_y, width, height, p) {
    super(x, bottom_y, width, height, p);
  }
}

export { Bush };
