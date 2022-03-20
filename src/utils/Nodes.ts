import * as THREE from 'three';
import {ScrService} from "../services/ScrService";
import {Point} from "../models/Point";
import {IDrawable} from "./interfaces/IDrawable";

export class Nodes extends Array<Point> implements IDrawable {
  private geometry: THREE.CircleGeometry = new THREE.CircleGeometry(0.15,15);
  constructor(private SCR: ScrService) {
    super();
  }

  public addNode(x: number, y: number): void {
    let material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
      color: 0x1f6b15,
      transparent: true,
    });

    let circle = new THREE.Mesh(this.geometry, material);

    circle.position.x = x;
    circle.position.y = y;

    this.push({mesh: circle, angle: 0});
    this.sort((a, b) => a.mesh.position.x - b.mesh.position.x);
  }

  public sortByAngle(): void {
    this.forEach(node => {
      node.angle = Math.atan2(node.mesh.position.y - this[0].mesh.position.y,
                              node.mesh.position.x - this[0].mesh.position.x);
    });

    let firstElement = this.shift();
    this.sort((a,b) => a.angle - b.angle);
    this.unshift(firstElement!);
  }

  public sortByPosition(): void {
    this.sort((a,b)=> a.mesh.position.x - b.mesh.position.x);
  }

  drawObjects(): void {
    this.forEach(node => {
      this.SCR.scene.add(node.mesh);
    });
  }
}
