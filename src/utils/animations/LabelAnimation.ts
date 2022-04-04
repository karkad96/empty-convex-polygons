import {ILabelAnimation} from "../interfaces/ianimations/ILabelAnimation";
import {ScrService} from "../../services/ScrService";
import * as TWEEN from "@tweenjs/tween.js";
import {Edges} from "../Edges";
import {Arrow2DHelper} from "../../helpers/Arrow2DHelper";

export class LabelAnimation implements ILabelAnimation {
  constructor(private SCR: ScrService) {
  }

  public prepareAnimationOfLabel(arrow: Arrow2DHelper): TWEEN.Tween<{ x: number, y: number }> {
    return new TWEEN.Tween({x: 0, y: 0})
      .to({x: 1, y: 1}, 500)
      .onUpdate(() => {
      }).easing(TWEEN.Easing.Circular.Out);
  }

  public animateLabels(edges: Edges, animate: boolean) {
    this.executeAnimation(edges.map((lines) => lines.arrow), animate);
  }

  public executeAnimation(arrows: Arrow2DHelper[], animate: boolean) {
    if(animate) {
      arrows.forEach((arrow) => {
        let nextTween = this.prepareAnimationOfLabel(arrow);
        this.SCR.tween.onComplete(() => {
          this.SCR.scene.add(arrow);
        }).chain(nextTween);
        this.SCR.tween = nextTween;
      });
    } else {
      let chain = new TWEEN.Tween({x: 0, y: 0}).
      to({x: 0, y: 0}, 0).
      onStart(() => {
        arrows.forEach((arrow) => {
          this.SCR.scene.add(arrow);
        });
      });
      this.SCR.tween.chain(chain);
      this.SCR.tween = chain;
    }
  }
}
