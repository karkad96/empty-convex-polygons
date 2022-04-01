import * as TWEEN from "@tweenjs/tween.js";
import {Line} from "../../../models/Line";
import {Edges} from "../../Edges";
import {IAnimation} from "./IAnimation";

export abstract class IGraphAnimation implements IAnimation {
  abstract prepareAnimationOfEdge(edge: Line, isStartingEdge?: boolean): TWEEN.Tween<{ x: number, y: number }>;
  abstract animateEdges(edges: Edges): void;
}
