import {Arrow2DHelper} from "../helpers/Arrow2DHelper";
import {Line} from "../models/Line";
import {ScrService} from "../services/ScrService";
import * as THREE from "three";
import {Point} from "../models/Point";
import {IDrawable} from "./interfaces/IDrawable";

export class Edges extends Array<Line> implements IDrawable {
  constructor(private SCR: ScrService) {
    super();
  }

  public addEdge(a: Point, b: Point, color: number, isArrow: boolean = true): void {
    let p1 = new THREE.Vector3(a.mesh.position.x, a.mesh.position.y, 0);
    let p2 = new THREE.Vector3(b.mesh.position.x, b.mesh.position.y, 0);
    let dir = new THREE.Vector3(p2.x - p1.x, p2.y - p1.y, 0);

    const arrowHelper = new Arrow2DHelper(dir, p1, dir.length() - 0.12, color, isArrow ? 0.2 : 0, isArrow ? 0.2 : 0);
    arrowHelper.setDirection(dir.normalize());

    this.push({p1: a, p2: b, arrow: arrowHelper});
  }

  drawObjects(isAnimated: boolean = false): void {
    if(isAnimated) {
      let timeout = 1000;
      let delta = 1000;
      this.forEach(edge => {
        setTimeout(() => this.SCR.scene.add(edge.arrow), timeout);
        timeout += delta;
      });
    } else {
      this.forEach(edge => {
        this.SCR.scene.add(edge.arrow);
      });
    }
  }
}
