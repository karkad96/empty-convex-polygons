import {IGraphAlgorithmsFactory} from "../interfaces/IGraphAlgorithmsFactory";
import {IAlgorithm} from "../interfaces/IAlgorithm";
import {VisibilityGraph} from "../algorithms/VisibilityGraph";
import {Nodes} from "../Nodes";
import {Edges} from "../Edges";
import {StarShapedPolygon} from "../algorithms/StarShapedPolygon";

export class GraphAlgorithmsFactory implements IGraphAlgorithmsFactory {
  private readonly nodes: Nodes;
  private readonly edges: Edges;

  constructor(_nodes: Nodes, _edges: Edges) {
    this.nodes = _nodes;
    this.edges = _edges;
  }

  public getStarShapedPolygon(): IAlgorithm {
    return new StarShapedPolygon(this.nodes, this.edges);
  }

  public getVisibilityGraph(): IAlgorithm {
    return new VisibilityGraph(this.nodes, this.edges);
  }
}
