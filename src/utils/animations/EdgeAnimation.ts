import * as TWEEN from "@tweenjs/tween.js";
import {ArrowedEdge} from "../objects/edges/ArrowedEdge";
import {Edge} from "../objects/edges/Edge";
import {IAnimation} from "../interfaces/ianimations/IAnimation";

export class EdgeAnimation implements IAnimation {
  constructor(private duration: number = 350, private easing: (x: number) => number = TWEEN.Easing.Circular.Out) {
  }

  private setLengthOfArrow = (edge: Edge, coords: {x: number, y: number}): void => {
    if(edge instanceof ArrowedEdge) {
      edge.setLength(coords.x * edge.length - 0.15, 0.2, 0.2);
    } else {
      edge.setLength(coords.x * edge.length);
    }
  }

  public prepareAnimation(edge: Edge): TWEEN.Tween<{ x: number, y: number }> {
    return new TWEEN.Tween({x: 0, y: 0})
      .to({x: 1, y: 1}, this.duration)
      .onUpdate((coords) => {
        this.setLengthOfArrow(edge, coords);
      }).easing(this.easing);
  }
}
