import { Float32BufferAttribute } from 'three/src/core/BufferAttribute.js';
import { BufferGeometry } from 'three/src/core/BufferGeometry.js';
import { LineBasicMaterial } from 'three/src/materials/LineBasicMaterial.js';
import { Line } from 'three/src/objects/Line';
import {Vector3} from "three";
import {ColorRepresentation} from "three/src/utils";
import {IObject} from "../../interfaces/iobjects/IObject";

const _axis = new Vector3();
let _lineGeometry: BufferGeometry;

export class Edge extends IObject {
  override type: string;
  private lineMaterial: LineBasicMaterial;

  protected dir: Vector3 = new Vector3();
  protected origin: Vector3 = new Vector3();
  protected readonly line: Line;

  public length: number;

  constructor(public pFrom: Vector3 = new Vector3(0, 0, 0),
              public pTo: Vector3 = new Vector3(0, 1, 0),
              weight: number = 0,
              color: number = 0xff0000) {
    super();

    this.type = 'LineBase';

    if (_lineGeometry === undefined) {
      _lineGeometry = new BufferGeometry();
      _lineGeometry.setAttribute('position', new Float32BufferAttribute([0, 0, 0, 0, 1, 0], 3));
    }

    this.pFrom = pFrom; this.pTo = pTo; this.weight = weight;

    this.dir.subVectors(this.pTo, this.pFrom);
    this.origin.copy(this.pFrom);

    this.length = this.dir.length();
    this.dir.normalize();

    this.position.copy(this.origin);

    this.line = new Line(_lineGeometry, this.lineMaterial = new LineBasicMaterial({color: color}));
    this.line.matrixAutoUpdate = false;
    this.add(this.line);

    this.setDirection(this.dir);
    this.setLength(this.length);
  }

  public setDirection(dir: Vector3) {
    if (dir.y > 1) {
      this.quaternion.set(0, 0, 0, 1);
    } else if (dir.y < -1) {
      this.quaternion.set(1, 0, 0, 0);
    } else {
      _axis.set(0, 0, -dir.x).normalize();
      this.quaternion.setFromAxisAngle(_axis, Math.acos(dir.y));
    }
  }

  public setLength(length: number) {
    this.line.scale.set(1, length, 0);
    this.line.updateMatrix();
  }

  public setColor(color: ColorRepresentation) {
    this.lineMaterial.color.set(color);
  }

  public override copy(source: this, recursive: boolean = true): this {
    super.copy(source, recursive);
    this.line.copy(source.line);
    return this;
  }
}
