import {Object3D} from "three";
import {Tween} from "../../../types/Types";

export abstract class IAnimation {
  abstract prepareAnimation(object: Object3D): Tween;
}
