import {ScrService} from "../../services/ScrService";
import * as TWEEN from "@tweenjs/tween.js";
import {IObject} from "../interfaces/iobjects/IObject";
import {Tween} from "../../types/Types";

export class ObjectAnimator {
  protected objects: IObject[] = [];
  private readonly tweenHelper: Tween;
  constructor(private SCR: ScrService) {
    this.tweenHelper = new TWEEN.Tween({ x: 0, y: 0, z: 0 }).to({x: 0, y: 0, z: 0}, 0);
  }

  protected executeAnimation(_: IObject[]) {
    this.SCR.tween = this.chainTweens(this.tweenHelper);
  }

  private chainTweens(nextTween: Tween, index: number = 0): Tween {
    if(index < this.objects.length) {
      if(this.objects[index].tweens.length > 0) {
        this.objects[index].tweens.forEach((tween) => {
          nextTween.chain(
            this.chainTweens(tween, index + 1)
          ).onComplete(() => {
            this.SCR.scene.add(this.objects[index]);
          });
        });
      } else {
        let emptyTween = new TWEEN.Tween({x: 0, y: 0, z: 0}).
        to({x: 0, y: 0, z: 0}, 0);
        nextTween.chain(
          this.chainTweens(emptyTween, index + 1)
        ).onComplete(() => {
          this.SCR.scene.add(this.objects[index]);
        });
      }
    }
    return nextTween;
  }
}
