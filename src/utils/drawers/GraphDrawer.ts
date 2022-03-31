import {IGraphDrawable} from "../interfaces/IGraphDrawable";
import {IAnimation} from "../interfaces/IAnimation";
import {Nodes} from "../Nodes";
import {Edges} from "../Edges";
import {ScrService} from "../../services/ScrService";
import * as TWEEN from "@tweenjs/tween.js";
import {Line} from "../../models/Line";
export class GraphDrawer implements IGraphDrawable, IAnimation {
  private readonly nodes: Nodes;
  private readonly edges: Edges;

  constructor(_nodes: Nodes, _edges: Edges, private SCR: ScrService) {
    this.nodes = _nodes;
    this.edges = _edges;
  }

  public drawEdges(isAnimated: boolean = false): void {
    console.log(this.edges);
    if(isAnimated && this.edges[0]) {
      this.SCR.scene.add(this.edges[0].arrow);
      this.SCR.tween = this.animateEdge(this.edges[0], true);
      for(let i = 1; i < this.edges.length; i++) {
        let nextTween = this.animateEdge(this.edges[i]);
        this.SCR.tween.onComplete(() => {
          this.SCR.scene.add(this.edges[i].arrow);
        }).chain(nextTween);
        this.SCR.tween = nextTween;
      }
    } else {
      this.edges.forEach(edge => {
        this.SCR.scene.add(edge.arrow);
      });
    }
  }

  public drawNodes(isAnimated: boolean = false): void {
    this.nodes.forEach(node => {
      this.SCR.scene.add(node.mesh);
    });
  }

  public drawGraph(isAnimated: boolean = false): void {
    this.drawNodes();
    this.drawEdges(isAnimated);
  }

  public animateEdge(edge: Line, isStartingEdge: boolean = false): TWEEN.Tween<{ x: number, y: number }> {
    let tween = new TWEEN.Tween({ x: 0, y: 0 })
      .to({ x: 1, y: 1 }, 1000)
      .onUpdate((coords) => {
        edge.arrow.setLength(coords.x * edge.arrow.length, 0.2, 0.2);
      }).easing(TWEEN.Easing.Circular.Out);
    if(isStartingEdge) {
      tween.start();
    }
    return tween;
  }
}
