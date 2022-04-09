import {IAlgorithm} from "../interfaces/ialgorithms/IAlgorithm";
import {Node} from "../Node";
import {Edge} from "../Edge";

export class LongestConvexChain implements IAlgorithm {
  private readonly nodes: Node[];
  private edges: Edge[];

  private outgoingEdges: Array<Array<number>> = new Array<Array<number>>();
  private incomingEdges: Array<Array<number>> = new Array<Array<number>>();
  private L: Array<Array<number>> = new Array<Array<number>>();

  constructor(_nodes: Node[], _edges: Edge[]) {
    this.nodes = _nodes;
    this.edges = _edges;

    this.nodes.forEach(_ => {
      this.outgoingEdges.push(new Array<number>());
      this.incomingEdges.push(new Array<number>());
      this.L.push(new Array(this.nodes.length).fill(0));
    });
  }

  private getOutgoingEdges(): void {
    for(let i = 1; i < this.nodes.length; i++) {
      this.edges.filter(edge => edge.line.pFrom == this.nodes[i].point.origin).forEach(edge => {
        this.outgoingEdges[i].push(this.nodes.findIndex(node => node.point.origin == edge.line.pTo));
      });
    }
  }

  private getIncomingEdges(): void {
    for(let i = 1; i < this.nodes.length; i++) {
      this.edges.filter(edge => edge.line.pTo == this.nodes[i].point.origin).forEach(edge => {
        this.incomingEdges[i].push(this.nodes.findIndex(node => node.point.origin == edge.line.pFrom));
      });
    }
  }

  private maxChain(): void {
    this.nodes.sortByAngle();

    this.getOutgoingEdges();
    this.getIncomingEdges();

    for (let i = this.nodes.length - 1; i >= 1; i--) {
      this.treat(i);
    }
  }

  private treat(i: number): void {
    let m = 0;
    for(let j = this.incomingEdges[i].length - 1, l = this.outgoingEdges[i].length - 1; j >= 0; j--) {
      let edge = this.edges.find(line => line.line.pFrom == this.nodes[this.incomingEdges[i][j]].point.origin && line.line.pTo == this.nodes[i].point.origin)!;
      this.L[this.incomingEdges[i][j]][i] = m + 1;
      while(l >= 0 && this.nodes.cross(i, this.incomingEdges[i][j], this.outgoingEdges[i][l]) < 0) {
        if(this.L[i][this.outgoingEdges[i][l]] > m) {
          m = this.L[i][this.outgoingEdges[i][l]];
          this.L[this.incomingEdges[i][j]][i] = m + 1;
        }
        l--;
      }
      edge.line.weight = m + 1;
    }
  }

  public runAlgorithm(): void {
    this.maxChain();
    this.edges.reverse();
  }
}
