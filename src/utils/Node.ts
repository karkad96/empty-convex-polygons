import {PointBase} from "./objects/points/PointBase";

export class Node<T extends PointBase = PointBase> {
  public point: T;
  constructor(point: T) {
    this.point = point;
  }
}
