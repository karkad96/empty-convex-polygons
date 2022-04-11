import {IDrawable} from "../interfaces/idrawables/IDrawable";

export class ObjectDrawer {
  constructor(public drawable?: IDrawable) {
  }

  public drawObject(isAnimated: boolean = false): void {
    if(this.drawable) {
      this.drawable.drawObject(isAnimated);
    }
  }
}
