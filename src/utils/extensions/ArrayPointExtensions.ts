import {Vertex} from "../objects/vertices/Vertex";
export {};

declare global {
  interface Array<T = Vertex> {
    sortByAngle(): void;
    sortByPosition(): void;
    cross(i: number, j: number, k: number): number;
  }
}

Array.prototype.sortByAngle = function () {
  this.sortByPosition();
  this.forEach((vertex) => {
    vertex.angle = Math.atan2(vertex.center.y - this[0].center.y,
      vertex.center.x - this[0].center.x);
  });

  let firstElement = this.shift();
  this.sort((a,b) => a.angle - b.angle);
  this.unshift(firstElement!);

  return this;
};

Array.prototype.sortByPosition = function () {
  this.sort((a,b)=> a.center.x - b.center.x);
  return this;
};

Array.prototype.cross = function (i: number, j: number, k: number): number {
  return (this[j].center.x - this[i].center.x) *
         (this[k].center.y - this[i].center.y) -
         (this[k].center.x - this[i].center.x) *
         (this[j].center.y - this[i].center.y);
};
