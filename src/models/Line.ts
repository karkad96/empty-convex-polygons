import {Point} from "./Point";
import {LineArrow} from "../utils/objects/lines/LineArrow";

export interface Line {
  p1: Point;
  p2: Point;
  arrow: LineArrow;
  weight: number;
}
