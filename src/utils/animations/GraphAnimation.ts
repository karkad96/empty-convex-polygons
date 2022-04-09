import {IGraphAnimation} from "../interfaces/ianimations/IGraphAnimation";
import * as TWEEN from "@tweenjs/tween.js";
import {ScrService} from "../../services/ScrService";
import {LineArrow} from "../objects/lines/LineArrow";
import {Edge} from "../Edge";
import {LineBase} from "../objects/lines/LineBase";

export class GraphAnimation implements IGraphAnimation {
  constructor(private SCR: ScrService) {
  }

  private setLengthOfArrow = (line: LineBase, coords: {x: number, y: number}): void => {
    if(line instanceof LineArrow) {
      line.setLength(coords.x * line.length, 0.2, 0.2);
    } else {
      line.setLength(coords.x * line.length);
    }
  }

  public prepareAnimationOfEdge(line: LineBase): TWEEN.Tween<{ x: number, y: number }> {
    return new TWEEN.Tween({x: 0, y: 0})
      .to({x: 1, y: 1}, 350)
      .onUpdate((coords) => {
        this.setLengthOfArrow(line, coords);
      }).easing(TWEEN.Easing.Circular.Out);
  }

  public animateEdges(edges: Edge[], animate: boolean) {
    this.executeAnimation(edges.map((edge) => edge.line), animate);
  }

  private executeAnimation(lines: LineBase[], animate: boolean) {
    if(animate) {
      lines.forEach((line) => {
        let nextTween = this.prepareAnimationOfEdge(line);
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
