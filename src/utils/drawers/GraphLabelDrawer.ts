import {IGraphDrawableLabel} from "../interfaces/idrawables/IGraphDrawableLabel";
import {Node} from "../Node";
import {Edge} from "../Edge";
import {CSS2DObject} from "three/examples/jsm/renderers/CSS2DRenderer";
import {AlgorithmVisualizer} from "../algorithms/AlgorithmVisualizer";
import {ScrService} from "../../services/ScrService";
import {LabelAnimation} from "../animations/LabelAnimation";

export class GraphLabelDrawer extends AlgorithmVisualizer implements IGraphDrawableLabel {
  protected readonly nodes: Node[];
  private readonly edges: Edge[];

  constructor(_nodes: Node[], _edges: Edge[], private SCR: ScrService) {
    super(new LabelAnimation(SCR));
    this.nodes = _nodes;
    this.edges = _edges;
  }

  private makeLabels = (): void => {
    this.edges.forEach((edge) => {
      const edgeDiv = document.createElement('div');
      edgeDiv.className = 'label';
      edgeDiv.id = edge.line.uuid;
      edgeDiv.textContent = edge.line.weight.toString();
      const edgeLabel = new CSS2DObject(edgeDiv);
      edgeLabel.position.set(0, edge.line.length / 2, 0);
      edge.line.add(edgeLabel);
    });
  };

  public drawLabels(isAnimated: boolean = false): void {
    this.makeLabels();
    (this.animation as LabelAnimation).animateLabels(this.edges, isAnimated);
  }
}
