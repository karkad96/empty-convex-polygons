import {Mesh, MeshBasicMaterial, Shape, ShapeGeometry, Vector2} from "three";
import {IObject} from "../../interfaces/iobjects/IObject";
import {ColorRepresentation} from "three/src/utils";

export class Polygon extends IObject {
  override type: string;
  private polygonMaterial: MeshBasicMaterial;
  public polygon: Mesh;

  constructor(...vertices: Vector2[]) {
    super();
    this.type = 'Polygon';

    let shapeGeometry = new ShapeGeometry(new Shape(vertices));

    this.polygon = new Mesh(shapeGeometry, this.polygonMaterial = new MeshBasicMaterial( { color: 0xff0000 } ));

    this.add(this.polygon);
  }

  public setColor(color: ColorRepresentation) {
    this.polygonMaterial.color.set(color);
  }
}
