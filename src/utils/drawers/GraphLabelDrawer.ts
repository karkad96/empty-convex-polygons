import {IGraphDrawableLabel} from "../interfaces/idrawables/IGraphDrawableLabel";
import {Nodes} from "../Nodes";
import {Edges} from "../Edges";
import {CSS2DObject} from "three/examples/jsm/renderers/CSS2DRenderer";
import {AlgorithmVisualizer} from "../algorithms/AlgorithmVisualizer";
import {ScrService} from "../../services/ScrService";
import {LabelAnimation} from "../animations/LabelAnimation";

export class GraphLabelDrawer extends AlgorithmVisualizer implements IGraphDrawableLabel {
  private readonly nodes: Nodes;
  private readonly edges: Edges;

  constructor(_nodes: Nodes, _edges: Edges, private SCR: ScrService) {
    super(new LabelAnimation(SCR));
    this.nodes = _nodes;
    this.edges = _edges;
  }

  private makeLabels = (): void => {
    this.edges.forEach((edge) => {
      const edgeDiv = document.createElement('div');
      edgeDiv.className = 'label';
      edgeDiv.id = edge.arrow.uuid;
      edgeDiv.textContent = edge.weight.toString();
      const edgeLabel = new CSS2DObject(edgeDiv);
      edgeLabel.position.set(0, edge.arrow.length / 2, 0);
      edge.arrow.add(edgeLabel);
    });
  };

  public drawLabels(isAnimated: boolean = false): void {
    this.makeLabels();
    (this.animation as LabelAnimation).animateLabels(this.edges, isAnimated);
  }
}
