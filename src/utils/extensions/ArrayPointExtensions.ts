import {Node} from "../Node";
export {};

declare global {
  interface Array<T = Node> {
    sortByAngle(): void;
    sortByPosition(): void;
    cross(i: number, j: number, k: number): number;
  }
}

Array.prototype.sortByAngle = function () {
  let _self = this;
  for(let i = 0; i < _self.length; i++) {
    _self[i].point.angle = Math.atan2(_self[i].point.circle.position.y - _self[i].point.circle.position.y,
      _self[i].point.circle.position.x - _self[i].point.circle.position.x);
  }
  console.log(_self);
  let firstElement = _self.shift();
  _self.sort((a,b) => a.point.angle - b.point.angle);
  _self.unshift(firstElement!);

};

Array.prototype.sortByPosition = function () {
  let _self = this as Array<Node>;
  _self.sort((a,b)=> a.point.circle.position.x - b.point.circle.position.x);

  return _self;
};

Array.prototype.cross = function (i: number, j: number, k: number): number {
  let _self = this as Array<Node>;
  return (_self[j].point.circle.position.x - _self[i].point.circle.position.x) *
    (_self[k].point.circle.position.y - _self[i].point.circle.position.y) -
    (_self[k].point.circle.position.x - _self[i].point.circle.position.x) *
    (_self[j].point.circle.position.y - _self[i].point.circle.position.y);
};
