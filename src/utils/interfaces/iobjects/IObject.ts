import {IAnimation} from "../ianimations/IAnimation";
import {Object3D} from "three";

export abstract class IObject extends Object3D {
  tweens: IAnimation[] = [];
  protected constructor() {
    super();
  }

  public setAnimation(...animations: IAnimation[]) {
    this.tweens.push(...animations);
  }
}
