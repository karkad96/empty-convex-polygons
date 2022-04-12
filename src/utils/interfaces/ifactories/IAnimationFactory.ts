import {IAnimation} from "../ianimations/IAnimation";
import {AnimationKind} from "../../factories/AnimationFactory";

export abstract class IAnimationFactory {
  abstract getAnimation(animation: AnimationKind): IAnimation;
}
