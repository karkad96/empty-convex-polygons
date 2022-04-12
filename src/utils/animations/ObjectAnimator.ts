import {ScrService} from "../../services/ScrService";
import * as TWEEN from "@tweenjs/tween.js";
import {IObject} from "../interfaces/iobjects/IObject";

export class ObjectAnimator {
  constructor(private SCR: ScrService) {
  }

  protected executeAnimation(objects: IObject[]) {
    objects.forEach((object) => {
      let tweens = object.tweens;
      if(tweens.length) {
        object.tweens.forEach((tween) => {
          let nextTween = tween.prepareAnimation(object);
          this.SCR.tween.onComplete(() => {
            this.SCR.scene.add(object);
          }).chain(nextTween);
          this.SCR.tween = nextTween;
        });
      } else {
        let nextTween = new TWEEN.Tween({x: 0, y: 0}).
        to({x: 0, y: 0}, 0).
        onStart(() => {
          objects.forEach((object) => {
            this.SCR.scene.add(object);
          });
        });
        this.SCR.tween.chain(nextTween);
        this.SCR.tween = nextTween;
      }
    });
  }
}
