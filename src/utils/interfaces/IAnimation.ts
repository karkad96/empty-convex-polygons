import * as TWEEN from "@tweenjs/tween.js";
import {Line} from "../../models/Line";

export abstract class IAnimation {
  abstract animateEdge(edge: Line, isStartingEdge: boolean): TWEEN.Tween<{ x: number, y: number }>;
}
