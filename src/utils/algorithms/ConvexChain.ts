import {IAlgorithm} from "../interfaces/ialgorithms/IAlgorithm";
import {Vertex} from "../objects/vertices/Vertex";
import {Edge} from "../objects/edges/Edge";

export abstract class ConvexChain implements IAlgorithm {
  protected readonly vertices: Vertex[];
  protected edges: Edge[];

  protected outgoingEdges: Array<Array<number>> = new Array<Array<number>>();
  protected incomingEdges: Array<Array<number>> = new Array<Array<number>>();
  protected L: Array<Array<number>> = new Array<Array<number>>();

  protected constructor(_nodes: Vertex[], _edges: Edge[]) {
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
      this.edges.filter(edge => edge.pFrom == this.vertices[i]).forEach(edge => {
        this.outgoingEdges[i].push(this.vertices.findIndex(vertex => vertex == edge.pTo));
      });
    }
  }

  private getIncomingEdges(): void {
    for(let i = 1; i < this.vertices.length; i++) {
      this.edges.filter(edge => edge.pTo == this.vertices[i]).forEach(edge => {
        this.incomingEdges[i].push(this.vertices.findIndex(vertex => vertex == edge.pFrom));
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

  protected abstract treat(i: number): void;

  public runAlgorithm(): void {
    this.maxChain();
    this.edges.reverse();
  }
}
