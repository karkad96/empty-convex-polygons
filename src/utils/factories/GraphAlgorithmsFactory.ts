import {IGraphAlgorithmsFactory} from "../interfaces/ifactories/IGraphAlgorithmsFactory";
import {IAlgorithm} from "../interfaces/ialgorithms/IAlgorithm";
import {VisibilityGraph} from "../algorithms/VisibilityGraph";
import {StarShapedPolygon} from "../algorithms/StarShapedPolygon";
import {Edge} from "../objects/edges/Edge";
import {Vertex} from "../objects/vertices/Vertex";
import {LongestConvexChain} from "../algorithms/LongestConvexChain";
import {LargestAreaConvexChain} from "../algorithms/LargestAreaConvexChain";

export class GraphAlgorithmsFactory implements IGraphAlgorithmsFactory {
  private readonly vertices: Vertex[];
  private readonly edges: Edge[];

  constructor(_nodes: Vertex[], _edges: Edge[]) {
    this.vertices = _nodes;
    this.edges = _edges;
  }

  public getStarShapedPolygon(): IAlgorithm {
    return new StarShapedPolygon(this.vertices, this.edges);
  }

  public getVisibilityGraph(): IAlgorithm {
    return new VisibilityGraph(this.vertices, this.edges);
  }

  public getLongestConvexChain(): IAlgorithm {
    return new LongestConvexChain(this.vertices, this.edges);
  }

  public getLargestAreaConvexChain(): IAlgorithm {
    return new LargestAreaConvexChain(this.vertices, this.edges);
  }
}
