import {ScrService} from "../services/ScrService";
import {GraphAlgorithmsFactory} from "./factories/GraphAlgorithmsFactory";
import {GraphDrawer} from "./drawers/GraphDrawer";
import {GraphLabelDrawer} from "./drawers/GraphLabelDrawer";
import {Edge} from "./objects/edges/Edge";
import {Vertex} from "./objects/vertices/Vertex";
import {Vector3} from "three";

export class Graph {
  private readonly vertices: Vertex[];
  private readonly edges: Edge[];
  private graphAlgorithmsFactory: GraphAlgorithmsFactory;
  private graphDrawer: GraphDrawer;
  constructor(private SCR: ScrService) {
    this.vertices = [];
    this.edges = [];
    this.graphAlgorithmsFactory = new GraphAlgorithmsFactory(this.vertices, this.edges);
    this.graphDrawer = new GraphDrawer(this.vertices, this.edges, this.SCR);
  }

  private clearEdges(): void {
    while(this.edges.length) {
      this.edges.pop();
    }
  }

  public addNodes(x: number | number[][], y: number = 0): void {
    if(typeof(x) == 'number') {
      this.vertices.push(new Vertex(new Vector3(x, y, 0), 0.15));
    } else {
      x.forEach(row => {
        this.vertices.push(new Vertex(new Vector3(row[0], row[1], 0), 0.15));
      });
    }
  }

  public starShapedPolygon(draw: boolean = false, animate: boolean = false): void {
    this.clearEdges();
    this.graphAlgorithmsFactory.getStarShapedPolygon().runAlgorithm();
    if(draw) {
      this.graphDrawer.drawGraph(animate);
    }
    this.vertices.sortByPosition();
  }

  public visibilityGraph(draw: boolean = false, animate: boolean = false): void  {
    this.clearEdges();
    this.graphAlgorithmsFactory.getVisibilityGraph().runAlgorithm();
    if(draw) {
      this.graphDrawer.drawGraph(animate);
    }
    this.vertices.sortByPosition();
  }

  public longestConvexChainLabels(draw: boolean = false, animate: boolean = false): void {
    this.visibilityGraph();
    let algorithm = this.graphAlgorithmsFactory.getLongestConvexChain();
    algorithm.runAlgorithm();
    if(draw) {
      let labelDrawer = new GraphLabelDrawer(this.vertices, this.edges, this.SCR);
      labelDrawer.drawLabels(animate);
    }
    this.vertices.sortByPosition();
  }
}
