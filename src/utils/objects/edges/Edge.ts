import { Float32BufferAttribute } from 'three/src/core/BufferAttribute.js';
import { BufferGeometry } from 'three/src/core/BufferGeometry.js';
import { LineBasicMaterial } from 'three/src/materials/LineBasicMaterial.js';
import { Line } from 'three/src/objects/Line';
import {Intersection, Ray, Raycaster, Vector3} from "three";
import {ColorRepresentation} from "three/src/utils";
import {IObject} from "../../interfaces/iobjects/IObject";
import {Vertex} from "../vertices/Vertex";
import {Sphere} from "three/src/math/Sphere";

const _axis = new Vector3();
let _lineGeometry: BufferGeometry;
const _ray = new Ray();
const _sphere = new Sphere();

export class Edge extends IObject {
  override type: string;
  private lineMaterial: LineBasicMaterial;

  protected dir: Vector3 = new Vector3();
  protected origin: Vector3 = new Vector3();
  protected readonly line: Line;

  public length: number;

  constructor(public pFrom: Vertex = new Vertex(),
              public pTo: Vertex = new Vertex(),
              weight: number = 0,
              color: number = 0xff0000) {
    super();

    this.type = 'Edge';

    if (_lineGeometry === undefined) {
      _lineGeometry = new BufferGeometry();
      _lineGeometry.setAttribute('position', new Float32BufferAttribute([0, 0, 0, 0, 1, 0], 3));
    }

    this.pFrom = pFrom; this.pTo = pTo; this.weight = weight;

    this.dir.subVectors(this.pTo.center, this.pFrom.center);
    this.origin.copy(this.pFrom.center);

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

  public override raycast(raycaster: Raycaster, intersects: Intersection[]) {
    const threshold = 0.2;

    let center = new Vector3();

    center.addVectors(this.pTo.center, this.pFrom.center);
    center.divideScalar(2);
    _sphere.set(center, this.length / 2 + threshold);

    if (!raycaster.ray.intersectsSphere(_sphere)) {
      return;
    }

    _ray.copy(raycaster.ray);

    const localThreshold = threshold / ( ( this.scale.x + this.scale.y + this.scale.z ) / 3 );
    const localThresholdSq = localThreshold * localThreshold;

    const vStart = this.pFrom.center;
    const vEnd = this.pTo.center;
    const interSegment = new Vector3();
    const interRay = new Vector3();

    const distSq = _ray.distanceSqToSegment(vStart, vEnd, interRay, interSegment);

    if (distSq > localThresholdSq) {
      return;
    }

    interRay.applyMatrix4(this.matrixWorld);

    const distance = raycaster.ray.origin.distanceTo(interRay);

    if (distance < raycaster.near || distance > raycaster.far) {
      return;
    }

    intersects.push({
      distance: distance,
      point: interSegment,
      index: 0,
      face: null,
      faceIndex: undefined,
      object: this
    });
  }
}
