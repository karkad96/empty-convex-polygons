import {IAlgorithm} from "../interfaces/IAlgorithm";
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

  private turn(i: number, j: number, k: number): boolean {
    return ((this.nodes[j].mesh.position.x - this.nodes[i].mesh.position.x) *
      (this.nodes[k].mesh.position.y - this.nodes[i].mesh.position.y) -
      (this.nodes[k].mesh.position.x - this.nodes[i].mesh.position.x) *
      (this.nodes[j].mesh.position.y - this.nodes[i].mesh.position.y)) > 0;
  }

  private proceed(i: number, j: number) {
    while(this.queue[i].length && this.turn(this.queue[i].front, i, j)) {
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
