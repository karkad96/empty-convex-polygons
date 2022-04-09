import {ILabelAnimation} from "../interfaces/ianimations/ILabelAnimation";
import {ScrService} from "../../services/ScrService";
import * as TWEEN from "@tweenjs/tween.js";
import {Edge} from "../Edge";
import {LineBase} from "../objects/lines/LineBase";

export class LabelAnimation implements ILabelAnimation {
  constructor(private SCR: ScrService) {
  }

  public prepareAnimationOfLabel(line: LineBase): TWEEN.Tween<{ x: number, y: number }> {
    return new TWEEN.Tween({x: 0, y: 0})
      .to({x: 1, y: 1}, 500)
      .onUpdate(() => {
      }).easing(TWEEN.Easing.Circular.Out);
  }

  public animateLabels(edges: Edge[], animate: boolean) {
    this.executeAnimation(edges.map((edge) => edge.line), animate);
  }

  public executeAnimation(lines: LineBase[], animate: boolean) {
    if(animate) {
      lines.forEach((line) => {
        let nextTween = this.prepareAnimationOfLabel(line);
        this.SCR.tween.onComplete(() => {
          this.SCR.scene.add(line);
        }).chain(nextTween);
        this.SCR.tween = nextTween;
      });
    } else {
      let chain = new TWEEN.Tween({x: 0, y: 0}).
      to({x: 0, y: 0}, 0).
      onStart(() => {
        lines.forEach((line) => {
          this.SCR.scene.add(line);
        });
      });
      this.SCR.tween.chain(chain);
      this.SCR.tween = chain;
    }
  }
}
