import {IObject} from "../interfaces/iobjects/IObject";
import {IAnimation} from "../interfaces/ianimations/IAnimation";

export {};

declare global {
  interface Array<T> {
    setAnimations(...animations: IAnimation[]): void;
  }
}

Array.prototype.setAnimations = function (...animations: IAnimation[]): void {
  let self = this as Array<IObject>
  self.forEach((object) => {
    animations.forEach((animation) => {
      object.tweens.push(animation.prepareAnimation(object));
    });
  });
};

