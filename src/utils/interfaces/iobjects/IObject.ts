import {IAnimation} from "../ianimations/IAnimation";
import {Object3D} from "three";
import {Tween} from "../../../types/Types";
import {CSS2DObject} from "three/examples/jsm/renderers/CSS2DRenderer";
import * as THREE from "three";

export abstract class IObject extends Object3D {
  tweens: Tween[] = [];
  weight: number | string = 0;
  protected constructor() {
    super();
  }

  public setAnimation(...animations: IAnimation[]) {
    animations.forEach((animation) => {
      this.tweens.push(animation.prepareAnimation(this));
    });
  }

  public addLabel(label: string = ""): void {
    const objectDiv = document.createElement('div');
    objectDiv.className = 'label';
    objectDiv.id = this.uuid;
    objectDiv.textContent = label == "" ? this.weight.toString() : label;

    const objectLabel = new CSS2DObject(objectDiv);
    objectLabel.name = "Label";
    new THREE.Box3().setFromObject(this).getCenter(objectLabel.position);

    this.worldToLocal(objectLabel.position);
    this.add(objectLabel);
  }
}
