import {Point} from "./Point";
import {Arrow2DHelper} from "../helpers/Arrow2DHelper";

export interface Line {
  p1: Point;
  p2: Point;
  arrow: Arrow2DHelper;
}
