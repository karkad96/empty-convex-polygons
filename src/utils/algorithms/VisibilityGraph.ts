import {IAlgorithm} from "../interfaces/ialgorithms/IAlgorithm";
import {Queue} from "queue-typescript";
import {ArrowedEdge} from "../objects/edges/ArrowedEdge";
import {Edge} from "../objects/edges/Edge";
import {Vertex} from "../objects/vertices/Vertex";

export class VisibilityGraph implements IAlgorithm {
  private readonly vertices: Vertex[];
  protected edges: Edge[];
  private queue: Queue<number>[] = [];

  constructor(_nodes: Vertex[], _edges: Edge[]) {
    this.vertices = _nodes;
    this.edges = _edges;
  }

  private proceed(i: number, j: number) {
    while(this.queue[i].length && this.vertices.cross(this.queue[i].front, i, j) > 0) {
      this.proceed(this.queue[i].front, j);
      this.queue[i].dequeue();
    }
    this.edges.push(new ArrowedEdge(this.vertices[i].center, this.vertices[j].center, 0, 0x0000ff));
    this.queue[j].enqueue(i);
  }

  private visibilityGraph(): void {
    this.vertices.sortByAngle();

    for(let i = 0; i < this.vertices.length; i++) {
      this.queue.push(new Queue<number>());
    }
    for(let i = 1; i < this.vertices.length - 1; i++) {
      this.proceed(i, i + 1);
    }
  }

  public runAlgorithm(): void {
    this.visibilityGraph();
  }
}
