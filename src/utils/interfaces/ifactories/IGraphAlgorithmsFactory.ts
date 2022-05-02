import {IAlgorithm} from "../ialgorithms/IAlgorithm";

export abstract class IGraphAlgorithmsFactory {
  abstract getStarShapedPolygon(): IAlgorithm;
  abstract getVisibilityGraph(): IAlgorithm;
  abstract getLongestConvexChain(): IAlgorithm;
  abstract getLargestAreaConvexChain(): IAlgorithm;
}
