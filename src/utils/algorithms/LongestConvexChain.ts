import {IAlgorithm} from "../interfaces/ialgorithms/IAlgorithm";
import {Nodes} from "../Nodes";
import {Edges} from "../Edges";
import {Line} from "../../models/Line";

export class LongestConvexChain implements IAlgorithm {
  private readonly nodes: Nodes;
  private edges: Edges;

  private outgoingEdges: Array<Array<number>> = new Array<Array<number>>();
  private incomingEdges: Array<Array<number>> = new Array<Array<number>>();
  private L: Array<Array<number>> = new Array<Array<number>>();

  public edgesToLabel: Edges = new Edges();

  constructor(_nodes: Nodes, _edges: Edges) {
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
      this.edges.filter(edge => edge.p1 == this.nodes[i]).forEach(edge => {
        this.outgoingEdges[i].push(this.nodes.findIndex(node => node == edge.p2));
      });
    }
  }

  private getIncomingEdges(): void {
    for(let i = 1; i < this.nodes.length; i++) {
      this.edges.filter(edge => edge.p2 == this.nodes[i]).forEach(edge => {
        this.incomingEdges[i].push(this.nodes.findIndex(node => node == edge.p1));
      });
    }
  }

  private addLabelToEdge(edge: Line, weight: number): void {
    edge.weight = weight + 1;
    this.edgesToLabel.push(edge);
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
      let edge = this.edges.find(line => line.p1 == this.nodes[this.incomingEdges[i][j]] && line.p2 == this.nodes[i])!;
      this.L[this.incomingEdges[i][j]][i] = m + 1;
      this.addLabelToEdge(edge, m);
      while(l >= 0 && this.nodes.cross(i, this.incomingEdges[i][j], this.outgoingEdges[i][l]) < 0) {
        if(this.L[i][this.outgoingEdges[i][l]] > m) {
          m = this.L[i][this.outgoingEdges[i][l]];
          this.L[this.incomingEdges[i][j]][i] = m + 1;
          this.addLabelToEdge(edge, m);
        }
        l--;
      }
    }
  }

  public runAlgorithm(): void {
    this.maxChain();
  }
}
