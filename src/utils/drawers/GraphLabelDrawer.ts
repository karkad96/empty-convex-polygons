import {IGraphDrawableLabel} from "../interfaces/idrawables/IGraphDrawableLabel";
import {Vertex} from "../objects/vertices/Vertex";
import {Edge} from "../objects/edges/Edge";
import {CSS2DObject} from "three/examples/jsm/renderers/CSS2DRenderer";
import {AlgorithmVisualizer} from "../algorithms/AlgorithmVisualizer";
import {ScrService} from "../../services/ScrService";
import {LabelAnimation} from "../animations/LabelAnimation";

export class GraphLabelDrawer extends AlgorithmVisualizer implements IGraphDrawableLabel {
  protected readonly vertices: Vertex[];
  private readonly edges: Edge[];

  constructor(_nodes: Vertex[], _edges: Edge[], private SCR: ScrService) {
    super(new LabelAnimation(SCR));
    this.vertices = _nodes;
    this.edges = _edges;
  }

  private makeLabels = (): void => {
    this.edges.forEach((edge) => {
      const edgeDiv = document.createElement('div');
      edgeDiv.className = 'label';
      edgeDiv.id = edge.uuid;
      edgeDiv.textContent = edge.weight.toString();
      const edgeLabel = new CSS2DObject(edgeDiv);
      edgeLabel.position.set(0, edge.length / 2, 0);
      edge.add(edgeLabel);
    });
  };

  public drawLabels(isAnimated: boolean = false): void {
    this.makeLabels();
    (this.animation as LabelAnimation).animateLabels(this.edges, isAnimated);
  }
}
