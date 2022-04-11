import {Object3D} from "three";
import * as TWEEN from "@tweenjs/tween.js";

export abstract class IAnimation {
  abstract prepareAnimation(object: Object3D): TWEEN.Tween<{ x: number, y: number }>;
}
