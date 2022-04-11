import {ScrService} from "../../services/ScrService";
import {Object3D} from "three";
import * as TWEEN from "@tweenjs/tween.js";
import {IAnimation} from "../interfaces/ianimations/IAnimation";

export class ObjectAnimator {
  constructor(protected animation: IAnimation, private SCR: ScrService) {
  }

  protected executeAnimation(objects: Object3D[], animate: boolean) {
    if(animate) {
      objects.forEach((object) => {
        let nextTween = this.animation.prepareAnimation(object);
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
  }
}
