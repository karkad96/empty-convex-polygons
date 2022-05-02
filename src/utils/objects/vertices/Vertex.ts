import { BufferGeometry } from 'three/src/core/BufferGeometry.js';
import {CircleGeometry, Vector3} from "three";
import * as THREE from "three";
import {IObject} from "../../interfaces/iobjects/IObject";

let _nodeGeometry: BufferGeometry;

export class Vertex extends IObject {
  override type: string;
  private readonly circle: THREE.Mesh;
  public angle: number = 0;
  constructor(public center: Vector3 = new Vector3(0, 0, 0),
              public radius: number = 1,
              private segments: number = 15) {
    super();

    this.type = 'Vertex';

    if (_nodeGeometry === undefined) {
      _nodeGeometry = new CircleGeometry(this.radius, this.segments);
    }

    let material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
      color: 0x1f6b15,
      transparent: true,
    });

    this.circle = new THREE.Mesh(_nodeGeometry, material);
    this.circle.position.set(center.x, center.y, center.z);

    this.add(this.circle);
  }
}
