import * as THREE from "three";

export interface Point {
  mesh: THREE.Mesh<THREE.CircleGeometry, THREE.MeshBasicMaterial>;
  angle: number;
}
