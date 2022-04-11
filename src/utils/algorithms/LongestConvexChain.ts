import {IAlgorithm} from "../interfaces/ialgorithms/IAlgorithm";
import {Vertex} from "../objects/vertices/Vertex";
import {Edge} from "../objects/edges/Edge";

export class LongestConvexChain implements IAlgorithm {
  private readonly vertices: Vertex[];
  private edges: Edge[];

  private outgoingEdges: Array<Array<number>> = new Array<Array<number>>();
  private incomingEdges: Array<Array<number>> = new Array<Array<number>>();
  private L: Array<Array<number>> = new Array<Array<number>>();

  constructor(_nodes: Vertex[], _edges: Edge[]) {
    this.vertices = _nodes;
    this.edges = _edges;

    this.vertices.forEach(_ => {
      this.outgoingEdges.push(new Array<number>());
      this.incomingEdges.push(new Array<number>());
      this.L.push(new Array(this.vertices.length).fill(0));
    });
  }

  private getOutgoingEdges(): void {
    for(let i = 1; i < this.vertices.length; i++) {
      this.edges.filter(edge => edge.pFrom == this.vertices[i].center).forEach(edge => {
        this.outgoingEdges[i].push(this.vertices.findIndex(vertex => vertex.center == edge.pTo));
      });
    }
  }

  private getIncomingEdges(): void {
    for(let i = 1; i < this.vertices.length; i++) {
      this.edges.filter(edge => edge.pTo == this.vertices[i].center).forEach(edge => {
        this.incomingEdges[i].push(this.vertices.findIndex(vertex => vertex.center == edge.pFrom));
      });
    }
  }

  private maxChain(): void {
    this.vertices.sortByAngle();

    this.getOutgoingEdges();
    this.getIncomingEdges();

    for (let i = this.vertices.length - 1; i >= 1; i--) {
      this.treat(i);
    }
  }

  private treat(i: number): void {
    let m = 0;
    for(let j = this.incomingEdges[i].length - 1, l = this.outgoingEdges[i].length - 1; j >= 0; j--) {
      let edge = this.edges.find(line => line.pFrom == this.vertices[this.incomingEdges[i][j]].center && line.pTo == this.vertices[i].center)!;
      this.L[this.incomingEdges[i][j]][i] = m + 1;
      while(l >= 0 && this.vertices.cross(i, this.incomingEdges[i][j], this.outgoingEdges[i][l]) < 0) {
        if(this.L[i][this.outgoingEdges[i][l]] > m) {
          m = this.L[i][this.outgoingEdges[i][l]];
          this.L[this.incomingEdges[i][j]][i] = m + 1;
        }
        l--;
      }
      edge.weight = m + 1;
    }
  }

  public runAlgorithm(): void {
    this.maxChain();
    this.edges.reverse();
  }
}
