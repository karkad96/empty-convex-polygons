import * as TWEEN from "@tweenjs/tween.js";
import {IAnimation} from "./IAnimation";
import {Edges} from "../../Edges";
import {Arrow2DHelper} from "../../../helpers/Arrow2DHelper";

export abstract class IGraphAnimation implements IAnimation {
  abstract prepareAnimationOfEdge(arrow: Arrow2DHelper): TWEEN.Tween<{ x: number, y: number }>;
  abstract animateEdges(edges: Edges, animate: boolean): void;
}
