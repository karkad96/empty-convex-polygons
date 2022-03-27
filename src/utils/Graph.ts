import {Nodes} from "./Nodes";
import {Edges} from "./Edges";
import {ScrService} from "../services/ScrService";
import {Point} from "../models/Point";
import {GraphAlgorithmsFactory} from "./factories/GraphAlgorithmsFactory";
import {GraphDrawer} from "./GraphDrawer";

export class Graph {
  private readonly nodes: Nodes;
  private readonly edges: Edges;
  private graphAlgorithmsFactory: GraphAlgorithmsFactory;
  private graphDrawer: GraphDrawer;
  constructor(private SCR: ScrService) {
    this.nodes = new Nodes();
    this.edges = new Edges();
    this.graphAlgorithmsFactory = new GraphAlgorithmsFactory(this.nodes, this.edges);
    this.graphDrawer = new GraphDrawer(this.nodes, this.edges, this.SCR);
  }

  public addNodes(x: number | number[][], y: number = 0): void {
    if(typeof(x) == 'number') {
      this.nodes.addNode(x, y);
    } else {
      x.forEach(row => {
        this.nodes.addNode(row[0], row[1]);
      });
    }
  }

  public addEdge(a: Point, b: Point, color: number, isArrow: boolean = true): void {
    this.edges.addEdge(a, b, color, isArrow);
  }

  public drawStarShapedPolygon(): void {
    this.graphAlgorithmsFactory.getStarShapedPolygon().runAlgorithm();
    this.graphDrawer.drawGraph();
    this.nodes.sortByPosition();
  }

  public drawVisibilityGraph(): void {
    this.graphAlgorithmsFactory.getVisibilityGraph().runAlgorithm();
    this.graphAlgorithmsFactory.getLongestConvexChain().runAlgorithm();
    this.graphDrawer.drawGraph(true);
    this.nodes.sortByPosition();
  }
}
