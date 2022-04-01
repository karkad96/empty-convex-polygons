import {IAlgorithm} from "../interfaces/ialgorithms/IAlgorithm";
import {Nodes} from "../Nodes";
import {Edges} from "../Edges";
import {Queue} from "queue-typescript";

export class VisibilityGraph implements IAlgorithm {
  private readonly nodes: Nodes;
  private edges: Edges;
  private queue: Queue<number>[] = [];

  constructor(_nodes: Nodes, _edges: Edges) {
    this.nodes = _nodes;
    this.edges = _edges;
  }

  private proceed(i: number, j: number) {
    while(this.queue[i].length && this.nodes.cross(this.queue[i].front, i, j) > 0) {
      this.proceed(this.queue[i].front, j);
      this.queue[i].dequeue();
    }
    this.edges.addEdge(this.nodes[i], this.nodes[j], 0x0000ff);
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
