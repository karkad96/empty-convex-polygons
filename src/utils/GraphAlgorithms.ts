import {Queue} from "queue-typescript";
import {Nodes} from "./Nodes";
import {Edges} from "./Edges";

export class GraphAlgorithms {
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

  public visibilityGraph(): void {
    this.nodes.sortByAngle();

    for(let i = 0; i < this.nodes.length; i++) {
    this.queue.push(new Queue<number>());
    }
    for(let i = 1; i < this.nodes.length - 1; i++) {
      this.proceed(i, i + 1);
    }
  }

  public starShapedPolygon(): void {
    this.nodes.sortByAngle();

    this.edges.addEdge(this.nodes[0], this.nodes[1], 0x00ff00, false);
    this.edges.addEdge(this.nodes[0], this.nodes[this.nodes.length - 1], 0x00ff00, false);

    for(let i = 1; i < this.nodes.length - 1; i++) {
      this.edges.addEdge(this.nodes[i],this.nodes[i + 1], 0x00ff00, false);
    }
  }
}
