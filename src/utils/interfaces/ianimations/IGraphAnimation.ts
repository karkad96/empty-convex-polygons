import * as TWEEN from "@tweenjs/tween.js";
import {IAnimation} from "./IAnimation";
import {Edge} from "../../objects/edges/Edge";

export abstract class IGraphAnimation implements IAnimation {
  abstract prepareAnimationOfEdge(edge: Edge): TWEEN.Tween<{ x: number, y: number }>;
  abstract animateEdges(edges: Edge[], animate: boolean): void;
}
