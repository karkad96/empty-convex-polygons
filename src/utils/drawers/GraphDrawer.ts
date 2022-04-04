import {IGraphDrawable} from "../interfaces/idrawables/IGraphDrawable";
import {Nodes} from "../Nodes";
import {Edges} from "../Edges";
import {ScrService} from "../../services/ScrService";
import {AlgorithmVisualizer} from "../algorithms/AlgorithmVisualizer";
import {GraphAnimation} from "../animations/GraphAnimation";

export class GraphDrawer extends AlgorithmVisualizer implements IGraphDrawable {
  private readonly nodes: Nodes;
  private readonly edges: Edges;

  constructor(_nodes: Nodes, _edges: Edges, private SCR: ScrService) {
    super(new GraphAnimation(SCR));
    this.nodes = _nodes;
    this.edges = _edges;
  }

  public drawEdges(isAnimated: boolean = false): void {
    (this.animation as GraphAnimation).animateEdges(this.edges, isAnimated);
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
