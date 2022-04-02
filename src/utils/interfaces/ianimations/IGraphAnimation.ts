import * as TWEEN from "@tweenjs/tween.js";
import {IAnimation} from "./IAnimation";
import {Edges} from "../../Edges";
import {Line} from "../../../models/Line";

export abstract class IGraphAnimation implements IAnimation {
  abstract prepareAnimationOfEdge(edge: Line): TWEEN.Tween<{ x: number, y: number }>;
  abstract animateEdges(edges: Edges): void;
}
