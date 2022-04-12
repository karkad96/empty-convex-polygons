import {ScrService} from "../../services/ScrService";
import {Object3D} from "three";
import * as TWEEN from "@tweenjs/tween.js";
import {IAnimation} from "../interfaces/ianimations/IAnimation";

export class ObjectAnimator {
  constructor(private animations: IAnimation[], private SCR: ScrService) {
  }

  protected executeAnimation(objects3D: Object3D[][]) {
    const zip = (a: Object3D[][], b: IAnimation[]) =>
      Array.from(Array(Math.max(b.length, a.length)),
        (_, i) => [a[i], b[i]]);

    zip(objects3D, this.animations).forEach((zippedObjects) => {
      let objects = zippedObjects[0] as Object3D[];
      let animation = zippedObjects[1] as IAnimation;
      if(objects && animation) {
        objects.forEach((object) => {
          let nextTween = animation.prepareAnimation(object);
          this.SCR.tween.onComplete(() => {
            this.SCR.scene.add(object);
          }).chain(nextTween);
          this.SCR.tween = nextTween;
        });
      } else if(objects) {
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
