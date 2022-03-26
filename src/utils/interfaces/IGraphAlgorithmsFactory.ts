import {IAlgorithm} from "./IAlgorithm";

export abstract class IGraphAlgorithmsFactory {
  abstract getStarShapedPolygon(): IAlgorithm;
  abstract getVisibilityGraph(): IAlgorithm;
}
