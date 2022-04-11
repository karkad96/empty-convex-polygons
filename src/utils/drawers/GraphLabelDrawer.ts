import {Vertex} from "../objects/vertices/Vertex";
import {Edge} from "../objects/edges/Edge";
import {CSS2DObject} from "three/examples/jsm/renderers/CSS2DRenderer";
import {ScrService} from "../../services/ScrService";
import {IDrawable} from "../interfaces/idrawables/IDrawable";
import {ObjectAnimator} from "../animations/ObjectAnimator";
import {LabelAnimation} from "../animations/LabelAnimation";

export class GraphLabelDrawer extends ObjectAnimator implements IDrawable {
  protected readonly vertices: Vertex[];
  private readonly edges: Edge[];
  constructor(_nodes: Vertex[], _edges: Edge[], SCR: ScrService) {
    super(new LabelAnimation(), SCR);
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

  public drawObject(isAnimated: boolean = false): void {
    this.makeLabels();
    this.executeAnimation(this.edges, isAnimated);
  }
}
