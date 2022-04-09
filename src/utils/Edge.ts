import {LineBase} from "./objects/lines/LineBase";

export class Edge<T extends LineBase = LineBase> {
  public line: T;
  constructor(line: T) {
    this.line = line;
  }
}
