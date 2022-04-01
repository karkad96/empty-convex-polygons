import {IGraphAlgorithmsFactory} from "../interfaces/ifactories/IGraphAlgorithmsFactory";
import {IAlgorithm} from "../interfaces/ialgorithms/IAlgorithm";
import {VisibilityGraph} from "../algorithms/VisibilityGraph";
import {Nodes} from "../Nodes";
import {Edges} from "../Edges";
import {StarShapedPolygon} from "../algorithms/StarShapedPolygon";
import {LongestConvexChain} from "../algorithms/LongestConvexChain";

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

  getLongestConvexChain(): IAlgorithm {
    return new LongestConvexChain(this.nodes, this.edges);
  }
}
