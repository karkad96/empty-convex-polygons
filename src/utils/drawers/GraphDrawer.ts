import {Edge} from "../objects/edges/Edge";
import {ScrService} from "../../services/ScrService";
import {EdgeAnimation} from "../animations/EdgeAnimation";
import {Vertex} from "../objects/vertices/Vertex";
import {IDrawable} from "../interfaces/idrawables/IDrawable";
import {ObjectAnimator} from "../animations/ObjectAnimator";

export class GraphDrawer extends ObjectAnimator implements IDrawable {
  private readonly vertices: Vertex[];
  private readonly edges: Edge[];

  constructor(_nodes: Vertex[], _edges: Edge[], SCR: ScrService) {
    super(new EdgeAnimation(), SCR);
    this.vertices = _nodes;
    this.edges = _edges;
  }

  public drawEdges(isAnimated: boolean = false): void {
    this.executeAnimation(this.edges, isAnimated);
  }

  public drawNodes(isAnimated: boolean = false): void {
    this.executeAnimation(this.vertices, isAnimated);
  }

  public drawObject(isAnimated: boolean = false): void {
    this.drawNodes();
    this.drawEdges(isAnimated);
  }
}
