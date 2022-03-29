import {IGraphDrawable} from "../interfaces/IGraphDrawable";
import {Nodes} from "../Nodes";
import {Edges} from "../Edges";
import {ScrService} from "../../services/ScrService";

export class GraphDrawer implements IGraphDrawable {
  private readonly nodes: Nodes;
  private edges: Edges;

  constructor(_nodes: Nodes, _edges: Edges, private SCR: ScrService) {
    this.nodes = _nodes;
    this.edges = _edges;
  }

  public drawEdges(isAnimated: boolean = false): void {
    if(isAnimated) {
      let timeout = 1000;
      let delta = 1000;
      this.edges.forEach(edge => {
        setTimeout(() => this.SCR.scene.add(edge.arrow), timeout);
        timeout += delta;
      });
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
}
