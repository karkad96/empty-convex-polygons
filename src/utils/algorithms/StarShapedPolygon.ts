import {IAlgorithm} from "../interfaces/ialgorithms/IAlgorithm";
import {Node} from "../Node";
import {Edge} from "../Edge";
import "../extensions/ArrayPointExtensions";
import {LineBase} from "../objects/lines/LineBase";

export class StarShapedPolygon implements IAlgorithm {
  private nodes: Node[];
  protected edges: Edge[];

  constructor(_nodes: Node[], _edges: Edge[]) {
    this.nodes = _nodes;
    this.edges = _edges;
  }

  private starShapedPolygon(): void {
    this.nodes.sortByAngle();

    this.edges.push(new Edge(new LineBase(this.nodes[0].point.origin, this.nodes[1].point.origin, 0, 0x00ff00)));
    this.edges.push(new Edge(new LineBase(this.nodes[0].point.origin, this.nodes[this.nodes.length - 1].point.origin, 0, 0x00ff00)));

    for(let i = 1; i < this.nodes.length - 1; i++) {
      this.edges.push(new Edge(new LineBase(this.nodes[i].point.origin, this.nodes[i + 1].point.origin, 0, 0x00ff00)));
    }
  }

  public runAlgorithm(): void {
    this.starShapedPolygon();
  }
}
