import {IObject} from "../utils/interfaces/iobjects/IObject";
import {CSS2DObject} from "three/examples/jsm/renderers/CSS2DRenderer";
import * as THREE from "three";

export function addLabel(object: IObject): void {
  const objectDiv = document.createElement('div');
  objectDiv.className = 'label';
  objectDiv.id = object.uuid;
  objectDiv.textContent = object.weight.toString();

  const objectLabel = new CSS2DObject(objectDiv);
  new THREE.Box3().setFromObject(object).getCenter(objectLabel.position);

  object.worldToLocal(objectLabel.position);
  object.add(objectLabel);
}
