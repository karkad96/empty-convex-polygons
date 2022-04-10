import {IAnimation} from "./IAnimation";
import * as TWEEN from "@tweenjs/tween.js";
import {Edge} from "../../objects/edges/Edge";

export abstract class ILabelAnimation  implements IAnimation {
  abstract prepareAnimationOfLabel(edge: Edge): TWEEN.Tween<{ x: number, y: number }>;
  abstract animateLabels(edges: Edge[], animate: boolean): void;
}
