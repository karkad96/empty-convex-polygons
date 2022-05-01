import { Float32BufferAttribute } from 'three/src/core/BufferAttribute.js';
import { BufferGeometry } from 'three/src/core/BufferGeometry.js';
import {Mesh, MeshBasicMaterial, Vector3} from "three";
import {ColorRepresentation} from "three/src/utils";
import {Edge} from "./Edge";

let _triangleGeometry: BufferGeometry;

export class ArrowedEdge extends Edge {
  override type: string;
  private arrowHeadMaterial: MeshBasicMaterial;
  private readonly arrowHead;

  constructor(pFrom: Vector3 = new Vector3(0, 0, 0),
              pTo: Vector3 = new Vector3(0, 1, 0),
              weight: number = 0,
              color: number = 0xff0000,
              headLength: number = 0.2,
              headWidth: number = 0.2) {
    super(pFrom, pTo, weight, color);

    this.type = 'ArrowedEdge';

    if (_triangleGeometry === undefined) {
      _triangleGeometry = new BufferGeometry();
      _triangleGeometry.setAttribute('position', new Float32BufferAttribute([-0.5, 0, 0, 0.5, 0, 0, 0, 1, 0], 3));
    }

    this.position.copy(this.origin);

    this.arrowHead = new Mesh(_triangleGeometry, this.arrowHeadMaterial = new MeshBasicMaterial({color: color ? color : 0xff0000}));
    this.arrowHead.matrixAutoUpdate = false;
    this.add(this.arrowHead);

    this.setDirection(this.dir);
    this.setLength(this.length, headLength, headWidth);
  }

  public override setLength = (length: number, headLength = 0, headWidth = 0): void => {
    this.line.scale.set(1, length - headLength, 0);
    this.line.updateMatrix();

    this.arrowHead.scale.set(headWidth, headLength, 0);
    this.arrowHead.position.y = length - headLength;
    this.arrowHead.updateMatrix();
  }

  public override setColor = (color: ColorRepresentation): void => {
    super.setColor(color);
    this.arrowHeadMaterial.color.set(color);
  }

  public override copy = (source: this): this => {
    super.copy(source, false);
    this.arrowHead.copy(source.arrowHead);
    return this;
  }
}
