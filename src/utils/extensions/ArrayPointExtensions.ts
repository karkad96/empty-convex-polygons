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
    vertex.angle = Math.atan2(vertex.origin.y - this[0].origin.y,
      vertex.origin.x - this[0].origin.x);
  });

  let firstElement = this.shift();
  this.sort((a,b) => a.angle - b.angle);
  this.unshift(firstElement!);

  return this;
};

Array.prototype.sortByPosition = function () {
  this.sort((a,b)=> a.circle.position.x - b.circle.position.x);
  return this;
};

Array.prototype.cross = function (i: number, j: number, k: number): number {
  return (this[j].origin.x - this[i].origin.x) *
         (this[k].origin.y - this[i].origin.y) -
         (this[k].origin.x - this[i].origin.x) *
         (this[j].origin.y - this[i].origin.y);
};
