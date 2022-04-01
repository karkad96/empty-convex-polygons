import {IGraphAnimation} from "../interfaces/ianimations/IGraphAnimation";
import * as TWEEN from "@tweenjs/tween.js";
import {Line} from "../../models/Line";
import {Edges} from "../Edges";
import {ScrService} from "../../services/ScrService";

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

  private setTweenProperly(edge: Line): void {
    if(this.SCR.tween.isPlaying()) {
      this.SCR.tween.chain(this.prepareAnimationOfEdge(edge));
    } else {
      this.SCR.tween = this.prepareAnimationOfEdge(edge, true);
    }
  }

  public prepareAnimationOfEdge(edge: Line, isStartingEdge: boolean = false): TWEEN.Tween<{ x: number, y: number }> {
    let tween = new TWEEN.Tween({ x: 0, y: 0 })
      .to({ x: 1, y: 1 }, 500)
      .onUpdate((coords) => {
        this.setLengthOfArrow(edge, coords);
      }).easing(TWEEN.Easing.Circular.Out);
    if(isStartingEdge) {
      tween.start();
    }
    return tween;
  }

  public animateEdges(edges: Edges) {
    this.SCR.scene.add(edges[0].arrow);
    this.setTweenProperly(edges[0]);
    for(let i = 1; i < edges.length; i++) {
      let nextTween = this.prepareAnimationOfEdge(edges[i]);
      this.SCR.tween.onComplete(() => {
        this.SCR.scene.add(edges[i].arrow);
      }).chain(nextTween);
      this.SCR.tween = nextTween;
    }
  }
}
