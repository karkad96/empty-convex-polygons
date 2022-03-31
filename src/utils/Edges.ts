import {Arrow2DHelper} from "../helpers/Arrow2DHelper";
import {Line} from "../models/Line";
import * as THREE from "three";
import {Point} from "../models/Point";

export class Edges extends Array<Line> {
  constructor(lines?: Line[]) {
    super();
    if(lines) {
      lines.forEach(line => {
        this.AddEdgeByLine(line);
      });
    }
  }

  public addEdge(a: Point, b: Point, color: number = 0x000000, isArrow: boolean = true, weight: number = 0): void {
    let p1 = new THREE.Vector3(a.mesh.position.x, a.mesh.position.y, 0);
    let p2 = new THREE.Vector3(b.mesh.position.x, b.mesh.position.y, 0);
    let dir = new THREE.Vector3(p2.x - p1.x, p2.y - p1.y, 0);

    const arrowHelper = new Arrow2DHelper(dir, p1, dir.length() - 0.12, color, isArrow ? 0.2 : 0, isArrow ? 0.2 : 0);
    arrowHelper.setDirection(dir.normalize());

    this.push({p1: a, p2: b, arrow: arrowHelper, weight});
  }

  public AddEdgeByLine(line: Line): void {
    this.push(line);
  }
}
