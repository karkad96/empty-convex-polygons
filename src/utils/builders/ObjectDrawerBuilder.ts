import {ScrService} from "../../services/ScrService";
import {IAnimation} from "../interfaces/ianimations/IAnimation";
import {Object3D} from "three";
import {ObjectDrawer} from "../drawers/ObjectDrawer";
import {AnimationFactory, AnimationKind} from "../factories/AnimationFactory";

export class ObjectDrawerBuilder {
  private options: {objects: Object3D[][], SCR: ScrService, animation: IAnimation[]};
  private animationFactory: AnimationFactory = new AnimationFactory();
  constructor(SCR: ScrService) {
    this.options = {objects: [], SCR: SCR, animation: []};
  }

  public withObjects(objects: Object3D[][]): this {
    this.options.objects = objects;
    return this;
  }

  public withSCR(SCR: ScrService): this {
    this.options.SCR = SCR;
    return this;
  }

  public withAnimations(animationKind: AnimationKind[]): this {
    animationKind.forEach((kind) => {
      this.options.animation.push(this.animationFactory.getAnimation(kind));
    });

    return this;
  }

  public build(): ObjectDrawer {
    return new ObjectDrawer(this.options.objects, this.options.SCR, this.options.animation);
  }
}
