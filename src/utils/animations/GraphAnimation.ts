import {IGraphAnimation} from "../interfaces/ianimations/IGraphAnimation";
import * as TWEEN from "@tweenjs/tween.js";
import {ScrService} from "../../services/ScrService";
import {ArrowedEdge} from "../objects/edges/ArrowedEdge";
import {Edge} from "../objects/edges/Edge";

export class GraphAnimation implements IGraphAnimation {
  constructor(private SCR: ScrService) {
  }

  private setLengthOfArrow = (edge: Edge, coords: {x: number, y: number}): void => {
    if(edge instanceof ArrowedEdge) {
      edge.setLength(coords.x * edge.length, 0.2, 0.2);
    } else {
      edge.setLength(coords.x * edge.length);
    }
  }

  public prepareAnimationOfEdge(edge: Edge): TWEEN.Tween<{ x: number, y: number }> {
    return new TWEEN.Tween({x: 0, y: 0})
      .to({x: 1, y: 1}, 350)
      .onUpdate((coords) => {
        this.setLengthOfArrow(edge, coords);
      }).easing(TWEEN.Easing.Circular.Out);
  }

  public animateEdges(edges: Edge[], animate: boolean) {
    this.executeAnimation(edges, animate);
  }

  private executeAnimation(edges: Edge[], animate: boolean) {
    if(animate) {
      edges.forEach((edge) => {
        let nextTween = this.prepareAnimationOfEdge(edge);
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
