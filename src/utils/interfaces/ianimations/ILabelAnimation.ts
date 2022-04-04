import {IAnimation} from "./IAnimation";
import * as TWEEN from "@tweenjs/tween.js";
import {Edges} from "../../Edges";
import {Arrow2DHelper} from "../../../helpers/Arrow2DHelper";

export abstract class ILabelAnimation  implements IAnimation {
  abstract prepareAnimationOfLabel(arrow: Arrow2DHelper): TWEEN.Tween<{ x: number, y: number }>;
  abstract animateLabels(edges: Edges, animate: boolean): void;
}
