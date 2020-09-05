import { Barrier } from "./Barrier";

class Bird extends Barrier {
  constructor(x, bottom_y, width, height, p) {
    super(x, bottom_y, width, height, p);
  }
}

export { Bird };
