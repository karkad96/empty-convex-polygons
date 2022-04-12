import {IAnimationFactory} from "../interfaces/ifactories/IAnimationFactory";
import {IAnimation} from "../interfaces/ianimations/IAnimation";
import {EdgeAnimation} from "../animations/EdgeAnimation";
import {LabelAnimation} from "../animations/LabelAnimation";

export enum AnimationKind {
  edgeAnimation,
  labelAnimation
}

export class AnimationFactory implements IAnimationFactory {
  constructor() {
  }

  public getAnimation(animationKind: AnimationKind): IAnimation {
    switch(animationKind) {
      case AnimationKind.edgeAnimation:
        return new EdgeAnimation();
      case AnimationKind.labelAnimation:
        return new LabelAnimation();
    }
  }
}
