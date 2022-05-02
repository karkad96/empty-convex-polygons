import * as TWEEN from "@tweenjs/tween.js";
import {Edge} from "../objects/edges/Edge";
import {IAnimation} from "../interfaces/ianimations/IAnimation";
import {Tween} from "../../types/Types";

export class EdgeAnimation implements IAnimation {
  constructor(private duration: number = 350, private easing: (x: number) => number = TWEEN.Easing.Circular.Out) {
  }

  private setLengthOfArrow = (edge: Edge, coords: {x: number, y: number}): void => {
    edge.setLength(coords.x * edge.length);
  }

  public prepareAnimation(edge: Edge): Tween {
    return new TWEEN.Tween({x: 0, y: 0, z: 0})
      .to({x: 1, y: 1, z: 1}, this.duration)
      .onUpdate((coords) => {
        this.setLengthOfArrow(edge, coords);
      }).easing(this.easing);
  }
}
