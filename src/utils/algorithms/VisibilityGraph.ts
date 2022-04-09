import {IAlgorithm} from "../interfaces/ialgorithms/IAlgorithm";
import {Node} from "../Node";
import {Edge} from "../Edge";
import {Queue} from "queue-typescript";
import {LineArrow} from "../objects/lines/LineArrow";

export class VisibilityGraph implements IAlgorithm {
  private readonly nodes: Node[];
  protected edges: Edge[];
  private queue: Queue<number>[] = [];

  constructor(_nodes: Node[], _edges: Edge[]) {
    this.nodes = _nodes;
    this.edges = _edges;
  }

  private proceed(i: number, j: number) {
    while(this.queue[i].length && this.nodes.cross(this.queue[i].front, i, j) > 0) {
      this.proceed(this.queue[i].front, j);
      this.queue[i].dequeue();
    }
    this.edges.push(new Edge(new LineArrow(this.nodes[i].point.origin, this.nodes[j].point.origin, 0, 0x0000ff)));
    this.queue[j].enqueue(i);
  }

  private visibilityGraph(): void {
    this.nodes.sortByAngle();

    for(let i = 0; i < this.nodes.length; i++) {
      this.queue.push(new Queue<number>());
    }
    for(let i = 1; i < this.nodes.length - 1; i++) {
      this.proceed(i, i + 1);
    }
  }

  public runAlgorithm(): void {
    this.visibilityGraph();
  }
}
