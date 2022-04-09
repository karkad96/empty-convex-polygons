import {IAnimation} from "./IAnimation";
import * as TWEEN from "@tweenjs/tween.js";
import {Edge} from "../../Edge";
import {LineBase} from "../../objects/lines/LineBase";

export abstract class ILabelAnimation  implements IAnimation {
  abstract prepareAnimationOfLabel(line: LineBase): TWEEN.Tween<{ x: number, y: number }>;
  abstract animateLabels(edges: Edge[], animate: boolean): void;
}
