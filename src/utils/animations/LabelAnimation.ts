import {ILabelAnimation} from "../interfaces/ianimations/ILabelAnimation";
import {ScrService} from "../../services/ScrService";
import * as TWEEN from "@tweenjs/tween.js";
import {Edge} from "../objects/edges/Edge";

export class LabelAnimation implements ILabelAnimation {
  constructor(private SCR: ScrService) {
  }

  public prepareAnimationOfLabel(edge: Edge): TWEEN.Tween<{ x: number, y: number }> {
    return new TWEEN.Tween({x: 0, y: 0})
      .to({x: 1, y: 1}, 500)
      .onUpdate(() => {
      }).easing(TWEEN.Easing.Circular.Out);
  }

  public animateLabels(edges: Edge[], animate: boolean) {
    this.executeAnimation(edges, animate);
  }

  public executeAnimation(edges: Edge[], animate: boolean) {
    if(animate) {
      edges.forEach((edge) => {
        let nextTween = this.prepareAnimationOfLabel(edge);
        this.SCR.tween.onComplete(() => {
          this.SCR.scene.add(edge);
        }).chain(nextTween);
        this.SCR.tween = nextTween;
      });
    } else {
      let chain = new TWEEN.Tween({x: 0, y: 0}).
      to({x: 0, y: 0}, 0).
      onStart(() => {
        edges.forEach((edge) => {
          this.SCR.scene.add(edge);
        });
      });
      this.SCR.tween.chain(chain);
      this.SCR.tween = chain;
    }
  }
}
