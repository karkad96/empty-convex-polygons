import {IAlgorithmsFactory} from "../interfaces/IAlgorithmsFactory";
import {IAlgorithm} from "../interfaces/IAlgorithm";
import {VisibilityGraph} from "../algorithms/VisibilityGraph";
import {Nodes} from "../Nodes";
import {Edges} from "../Edges";
import {StarShapedPolygon} from "../algorithms/StarShapedPolygon";

export class GraphAlgorithmsFactory implements IAlgorithmsFactory {
  public getAlgorithm(nodes: Nodes, edges: Edges, algorithmName: string): IAlgorithm {
    switch(algorithmName) {
      case "VisibilityGraph":
        return new VisibilityGraph(nodes, edges);
      case "StarShapedPolygon":
        return new StarShapedPolygon(nodes, edges);
    }
    return new StarShapedPolygon(nodes, edges);
  }
}
