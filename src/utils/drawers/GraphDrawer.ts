import {IGraphDrawable} from "../interfaces/idrawables/IGraphDrawable";
import {Node} from "../Node";
import {Edge} from "../Edge";
import {ScrService} from "../../services/ScrService";
import {AlgorithmVisualizer} from "../algorithms/AlgorithmVisualizer";
import {GraphAnimation} from "../animations/GraphAnimation";

export class GraphDrawer extends AlgorithmVisualizer implements IGraphDrawable {
  private readonly nodes: Node[];
  private readonly edges: Edge[];

  constructor(_nodes: Node[], _edges: Edge[], private SCR: ScrService) {
    super(new GraphAnimation(SCR));
    this.nodes = _nodes;
    this.edges = _edges;
  }

  public drawEdges(isAnimated: boolean = false): void {
    (this.animation as GraphAnimation).animateEdges(this.edges, isAnimated);
  }

  public drawNodes(isAnimated: boolean = false): void {
    this.nodes.forEach(node => {
      this.SCR.scene.add(node.point.circle);
    });
  }

  public drawGraph(isAnimated: boolean = false): void {
    this.drawNodes();
    this.drawEdges(isAnimated);
  }
}
