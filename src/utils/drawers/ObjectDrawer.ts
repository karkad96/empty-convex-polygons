import {ObjectAnimator} from "../animations/ObjectAnimator";
import {ScrService} from "../../services/ScrService";
import {IAnimation} from "../interfaces/ianimations/IAnimation";
import {Object3D} from "three";

export class ObjectDrawer extends ObjectAnimator {
  constructor(private objects: Object3D[][], SCR: ScrService, animations: IAnimation[]) {
    super(animations, SCR);
  }

  public drawObject(): void {
    this.executeAnimation(this.objects);
  }
}
