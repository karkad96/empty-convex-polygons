import {IAnimation} from "../ianimations/IAnimation";
import {Object3D} from "three";
import {Tween} from "../../../types/Types";

export abstract class IObject extends Object3D {
  tweens: Tween[] = [];
  weight: number | string = 0;
  protected constructor() {
    super();
  }

  public setAnimation(...animations: IAnimation[]) {
    animations.forEach((animation) => {
      this.tweens.push(animation.prepareAnimation(this));
    });
  }
}
