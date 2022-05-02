import {ConvexChain} from "./ConvexChain";
import {Vertex} from "../objects/vertices/Vertex";
import {Edge} from "../objects/edges/Edge";

export class LargestAreaConvexChain extends ConvexChain {
  constructor(_nodes: Vertex[], _edges: Edge[]) {
    super(_nodes, _edges);
  }

  protected treat(i: number): void {
    let m = 0;
    for(let j = this.incomingEdges[i].length - 1, l = this.outgoingEdges[i].length - 1; j >= 0; j--) {
      let edge = this.edges.find(line => line.pFrom == this.vertices[this.incomingEdges[i][j]] && line.pTo == this.vertices[i])!;
      this.L[this.incomingEdges[i][j]][i] = m + 1;
      while(l >= 0 && this.vertices.cross(i, this.incomingEdges[i][j], this.outgoingEdges[i][l]) < 0) {
        m = Math.max(m, this.L[i][this.outgoingEdges[i][l]]);
        l--;
      }
      let weight = this.vertices.cross(0, this.incomingEdges[i][j], i) / 2;
      this.L[this.incomingEdges[i][j]][i] = edge.weight = m + weight;
      edge.addLabel();
    }
  };

  public override runAlgorithm() {
    super.runAlgorithm();
  }
}
