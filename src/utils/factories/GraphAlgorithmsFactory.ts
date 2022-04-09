import {IGraphAlgorithmsFactory} from "../interfaces/ifactories/IGraphAlgorithmsFactory";
import {IAlgorithm} from "../interfaces/ialgorithms/IAlgorithm";
import {VisibilityGraph} from "../algorithms/VisibilityGraph";
import {StarShapedPolygon} from "../algorithms/StarShapedPolygon";
import {LongestConvexChain} from "../algorithms/LongestConvexChain";
import {Edge} from "../Edge";
import {Node} from "../Node";

export class GraphAlgorithmsFactory implements IGraphAlgorithmsFactory {
  private readonly nodes: Node[];
  private readonly edges: Edge[];

  constructor(_nodes: Node[], _edges: Edge[]) {
    this.nodes = _nodes;
    this.edges = _edges;
  }

  public getStarShapedPolygon(): IAlgorithm {
    return new StarShapedPolygon(this.nodes, this.edges);
  }

  public getVisibilityGraph(): IAlgorithm {
    return new VisibilityGraph(this.nodes, this.edges);
  }

  public getLongestConvexChain(): IAlgorithm {
    return new LongestConvexChain(this.nodes, this.edges);
  }
}
