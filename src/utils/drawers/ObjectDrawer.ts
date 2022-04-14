import {ObjectAnimator} from "../animations/ObjectAnimator";
import {ScrService} from "../../services/ScrService";
import {IObject} from "../interfaces/iobjects/IObject";

export class ObjectDrawer extends ObjectAnimator {
  constructor(SCR: ScrService) {
    super(SCR);
  }

  public draw(...objects: IObject[][]): void {
    objects.forEach((object) => {
      this.executeAnimation(object);
    });
  }
}
