import * as TWEEN from "@tweenjs/tween.js";
import {IAnimation} from "../interfaces/ianimations/IAnimation";
import {IObject} from "../interfaces/iobjects/IObject";
import {Tween} from "../../types/Types";
import {CSS2DObject} from "three/examples/jsm/renderers/CSS2DRenderer";

export class LabelAnimation implements IAnimation {
  constructor(private duration: number = 500, private easing: (x: number) => number = TWEEN.Easing.Circular.Out) {
  }

  public prepareAnimation(object: IObject): Tween {
    let label = object.getObjectByName("Label") as CSS2DObject;
    return new TWEEN.Tween({x: 0, y: 0, z: 0})
      .to({x: 1, y: 1, z: 1}, this.duration)
      .onUpdate((coords) => {
        label.element.style.opacity = (100 * coords.x) + "%";
      }).easing(this.easing);
  }
}
