import {Nodes} from "./Nodes";
import {Edges} from "./Edges";
import {ScrService} from "../services/ScrService";
import {Point} from "../models/Point";
import {GraphAlgorithms} from "./GraphAlgorithms";

export class Graph {
  private readonly nodes: Nodes;
  private readonly edges: Edges;
  private graphAlgorithms: GraphAlgorithms;

  constructor(private SCR: ScrService) {
    this.nodes = new Nodes(SCR);
    this.edges = new Edges(SCR);
    this.graphAlgorithms = new GraphAlgorithms(this.nodes, this.edges);
  }

  public addNode(x: number, y: number): void {
    this.nodes.addNode(x, y);
  }

  public addEdge(a: Point, b: Point, color: number, isArrow: boolean = true): void {
    this.edges.addEdge(a, b, color, isArrow);
  }

  public drawStarShapedPolygon(): void {
    this.graphAlgorithms.starShapedPolygon();
    this.drawGraph();
    this.nodes.sortByPosition();
  }

  public drawVisibilityGraph(): void {
    this.graphAlgorithms.visibilityGraph();
    this.drawGraph(true);
    this.nodes.sortByPosition();
  }

  private drawGraph(isAnimated: boolean = false): void {
    this.nodes.drawObjects();
    this.edges.drawObjects(isAnimated);
  }
}
