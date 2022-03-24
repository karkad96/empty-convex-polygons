import {Nodes} from "./Nodes";
import {Edges} from "./Edges";
import {ScrService} from "../services/ScrService";
import {Point} from "../models/Point";
import {GraphAlgorithmsFactory} from "./factories/GraphAlgorithmsFactory";
import {GraphDrawer} from "./GraphDrawer";

export class Graph {
  private readonly nodes: Nodes;
  private readonly edges: Edges;
  private graphAlgorithmsFactory: GraphAlgorithmsFactory =  new GraphAlgorithmsFactory();
  private graphDrawer: GraphDrawer;
  constructor(private SCR: ScrService) {
    this.nodes = new Nodes();
    this.edges = new Edges();
    this.graphDrawer = new GraphDrawer(this.nodes, this.edges, this.SCR);
  }

  public addNode(x: number, y: number): void {
    this.nodes.addNode(x, y);
  }

  public addEdge(a: Point, b: Point, color: number, isArrow: boolean = true): void {
    this.edges.addEdge(a, b, color, isArrow);
  }

  public drawStarShapedPolygon(): void {
    let algorithm = this.graphAlgorithmsFactory.getAlgorithm(this.nodes, this.edges, "StarShapedPolygon");
    algorithm.runAlgorithm();
    this.graphDrawer.drawGraph();
    this.nodes.sortByPosition();
  }

  public drawVisibilityGraph(): void {
    let algorithm = this.graphAlgorithmsFactory.getAlgorithm(this.nodes, this.edges, "VisibilityGraph");
    algorithm.runAlgorithm();
    this.graphDrawer.drawGraph(true);
    this.nodes.sortByPosition();
  }
}
