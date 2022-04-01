import {IAlgorithm} from "../interfaces/ialgorithms/IAlgorithm";
import {Nodes} from "../Nodes";
import {Edges} from "../Edges";

export class StarShapedPolygon implements IAlgorithm {
  private readonly nodes: Nodes;
  private edges: Edges;

  constructor(_nodes: Nodes, _edges: Edges) {
    this.nodes = _nodes;
    this.edges = _edges;
  }

  private starShapedPolygon(): void {
    this.nodes.sortByAngle();

    this.edges.addEdge(this.nodes[0], this.nodes[1], 0x00ff00, false);
    this.edges.addEdge(this.nodes[0], this.nodes[this.nodes.length - 1], 0x00ff00, false);

    for(let i = 1; i < this.nodes.length - 1; i++) {
      this.edges.addEdge(this.nodes[i],this.nodes[i + 1], 0x00ff00, false);
    }
  }

  public runAlgorithm(): void {
    this.starShapedPolygon();
  }
}
