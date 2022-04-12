import * as TWEEN from "@tweenjs/tween.js";
import {Object3D} from "three";
import {IAnimation} from "../interfaces/ianimations/IAnimation";

export class LabelAnimation implements IAnimation {
  constructor(private duration: number = 500, private easing: (x: number) => number = TWEEN.Easing.Circular.Out) {
  }

  public prepareAnimation(object: Object3D): TWEEN.Tween<{ x: number, y: number }> {
    return new TWEEN.Tween({x: 0, y: 0})
      .to({x: 1, y: 1}, this.duration)
      .onUpdate(() => {
      }).easing(this.easing);
  }
}
