import {IAnimation} from "../interfaces/ianimations/IAnimation";

export class AlgorithmVisualizer {
  protected animation: IAnimation;

  constructor(animation: IAnimation) {
    this.animation = animation;
  }
}
