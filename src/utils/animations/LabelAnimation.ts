import * as TWEEN from "@tweenjs/tween.js";
import {IAnimation} from "../interfaces/ianimations/IAnimation";
import {IObject} from "../interfaces/iobjects/IObject";
import {CSS2DObject} from "three/examples/jsm/renderers/CSS2DRenderer";
import * as THREE from "three";
import {Tween} from "../../types/Types";

export class LabelAnimation implements IAnimation {
  constructor(private duration: number = 500, private easing: (x: number) => number = TWEEN.Easing.Circular.Out) {
  }

  private makeLabel = (object: IObject): CSS2DObject => {
    const objectDiv = document.createElement('div');
    objectDiv.className = 'label';
    objectDiv.id = object.uuid;
    objectDiv.textContent = object.weight.toString();

    const objectLabel = new CSS2DObject(objectDiv);
    new THREE.Box3().setFromObject(object).getCenter(objectLabel.position);

    object.worldToLocal(objectLabel.position);

    return objectLabel;
  };

  public prepareAnimation(object: IObject): Tween {
    let objectLabel = this.makeLabel(object);
    return new TWEEN.Tween({x: 0, y: 0, z: 0})
      .to({x: 1, y: 1, z: 1}, this.duration)
      .onUpdate((coords) => {
        objectLabel.element.style.opacity = (100 * coords.x).toString() + '%';
      }).onComplete(() => {
        object.add(objectLabel);
      }).easing(this.easing);
  }
}
