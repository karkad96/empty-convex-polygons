import { BufferGeometry } from 'three/src/core/BufferGeometry.js';
import { Object3D } from 'three/src/core/Object3D.js';
import {CircleGeometry, Vector3} from "three";
import * as THREE from "three";

let _nodeGeometry: BufferGeometry;

export class Vertex extends Object3D {
  override type: string;
  public circle: THREE.Mesh;
  public angle: number = 0;
  constructor(public origin: Vector3 = new Vector3(0, 0, 0),
              private radius: number = 1,
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

    this.circle.position.x = origin.x; this.circle.position.y = origin.y; this.circle.position.z = origin.z;
    this.add(this.circle);
  }
}
