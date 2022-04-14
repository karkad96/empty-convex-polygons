import {IAnimation} from "../interfaces/ianimations/IAnimation";
import {IObject} from "../interfaces/iobjects/IObject";
export {};

declare global {
  interface Array<T> {
    setAnimations(animation: IAnimation): void;
  }
}

Array.prototype.setAnimations = function (animation: IAnimation): void {
  let self = this as Array<IObject>
  self.forEach((object) => {
    object.tweens.push(animation);
  });
};

