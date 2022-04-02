import {IGraphAnimation} from "../interfaces/ianimations/IGraphAnimation";
import * as TWEEN from "@tweenjs/tween.js";
import {ScrService} from "../../services/ScrService";
import {Edges} from "../Edges";
import {Line} from "../../models/Line";

export class GraphAnimation implements IGraphAnimation {
  constructor(private SCR: ScrService) {
  }

  private setLengthOfArrow = (edge: Line, coords: {x: number, y: number}): void => {
    if(edge.arrow.hasHead) {
      edge.arrow.setLength(coords.x * edge.arrow.length, 0.2, 0.2);
    } else {
      edge.arrow.setLength(coords.x * edge.arrow.length);
    }
  }

  public prepareAnimationOfEdge(edge: Line): TWEEN.Tween<{ x: number, y: number }> {
    return new TWEEN.Tween({x: 0, y: 0})
      .to({x: 1, y: 1}, 500)
      .onUpdate((coords) => {
        this.setLengthOfArrow(edge, coords);
      }).easing(TWEEN.Easing.Circular.Out);
  }

  public animateEdges(edges: Edges) {
    this.executeAnimation(edges).then(() => {
      this.SCR.tween.pause();
    });
  }

  public executeAnimation(edges: Edges) {
    return new Promise((resolve) => {
      edges.forEach((edge) => {
        let nextTween = this.prepareAnimationOfEdge(edge);
        this.SCR.tween.onComplete(() => {
          this.SCR.scene.add(edge.arrow);
        }).chain(nextTween);
        this.SCR.tween = nextTween;
      });
      this.SCR.tween.onComplete(() => {
        return resolve(true);
      });
    });
  }
}
