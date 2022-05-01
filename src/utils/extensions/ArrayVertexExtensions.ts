import {Vertex} from "../objects/vertices/Vertex";
export {};

declare global {
  interface Array<T> {
    sortByAngle(): Array<T>;
    sortByPosition(): Array<T>;
    cross(i: number, j: number, k: number): number;
  }
}

Array.prototype.sortByAngle = function (): Array<Vertex> {
  let self = this as Array<Vertex>
  self.sortByPosition();
  self.forEach((vertex) => {
    vertex.angle = Math.atan2(vertex.center.y - self[0].center.y,
      vertex.center.x - self[0].center.x);
  });

  let firstElement = self.shift();
  self.sort((a,b) => a.angle - b.angle);
  self.unshift(firstElement!);

  return self;
};

Array.prototype.sortByPosition = function (): Array<Vertex> {
  let self = this as Array<Vertex>
  self.sort((a,b)=> a.center.x - b.center.x);
  return self;
};

Array.prototype.cross = function (i: number, j: number, k: number): number {
  let self = this as Array<Vertex>
  return (self[j].center.x - self[i].center.x) *
         (self[k].center.y - self[i].center.y) -
         (self[k].center.x - self[i].center.x) *
         (self[j].center.y - self[i].center.y);
};

