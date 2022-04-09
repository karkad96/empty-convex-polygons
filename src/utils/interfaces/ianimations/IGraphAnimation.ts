import * as TWEEN from "@tweenjs/tween.js";
import {IAnimation} from "./IAnimation";
import {Edge} from "../../Edge";
import {LineBase} from "../../objects/lines/LineBase";

export abstract class IGraphAnimation implements IAnimation {
  abstract prepareAnimationOfEdge(line: LineBase): TWEEN.Tween<{ x: number, y: number }>;
  abstract animateEdges(edges: Edge[], animate: boolean): void;
}
