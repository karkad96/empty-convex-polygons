import {IGraphDrawable} from "../interfaces/idrawables/IGraphDrawable";
import {Edge} from "../objects/edges/Edge";
import {ScrService} from "../../services/ScrService";
import {AlgorithmVisualizer} from "../algorithms/AlgorithmVisualizer";
import {GraphAnimation} from "../animations/GraphAnimation";
import {Vertex} from "../objects/vertices/Vertex";

export class GraphDrawer extends AlgorithmVisualizer implements IGraphDrawable {
  private readonly vertices: Vertex[];
  private readonly edges: Edge[];

  constructor(_nodes: Vertex[], _edges: Edge[], private SCR: ScrService) {
    super(new GraphAnimation(SCR));
    this.vertices = _nodes;
    this.edges = _edges;
  }

  public drawEdges(isAnimated: boolean = false): void {
    (this.animation as GraphAnimation).animateEdges(this.edges, isAnimated);
  }

  public drawNodes(isAnimated: boolean = false): void {
    this.vertices.forEach(vertex => {
      this.SCR.scene.add(vertex.circle);
    });
  }

  public drawGraph(isAnimated: boolean = false): void {
    //this.drawNodes();
    this.drawEdges(isAnimated);
  }
}
