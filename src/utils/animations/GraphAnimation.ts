import {IGraphAnimation} from "../interfaces/ianimations/IGraphAnimation";
import * as TWEEN from "@tweenjs/tween.js";
import {ScrService} from "../../services/ScrService";
import {Arrow2DHelper} from "../../helpers/Arrow2DHelper";
import {Edges} from "../Edges";

export class GraphAnimation implements IGraphAnimation {
  constructor(private SCR: ScrService) {
  }

  private setLengthOfArrow = (arrow: Arrow2DHelper, coords: {x: number, y: number}): void => {
    if(arrow.hasHead) {
      arrow.setLength(coords.x * arrow.length, 0.2, 0.2);
    } else {
      arrow.setLength(coords.x * arrow.length);
    }
  }

  public prepareAnimationOfEdge(arrow: Arrow2DHelper): TWEEN.Tween<{ x: number, y: number }> {
    return new TWEEN.Tween({x: 0, y: 0})
      .to({x: 1, y: 1}, 350)
      .onUpdate((coords) => {
        this.setLengthOfArrow(arrow, coords);
      }).easing(TWEEN.Easing.Circular.Out);
  }

  public animateEdges(edges: Edges, animate: boolean) {
    this.executeAnimation(edges.map((line) => line.arrow), animate);
  }

  private executeAnimation(arrows: Arrow2DHelper[], animate: boolean) {
    if(animate) {
      arrows.forEach((arrow) => {
        let nextTween = this.prepareAnimationOfEdge(arrow);
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
