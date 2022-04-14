import {ScrService} from "../services/ScrService";
import {GraphAlgorithmsFactory} from "./factories/GraphAlgorithmsFactory";
import {Edge} from "./objects/edges/Edge";
import {Vertex} from "./objects/vertices/Vertex";
import {Vector3} from "three";
import {EdgeAnimation} from "./animations/EdgeAnimation";
import {ObjectDrawer} from "./drawers/ObjectDrawer";
import {LabelAnimation} from "./animations/LabelAnimation";

export class Graph {
  private readonly vertices: Vertex[];
  private readonly edges: Edge[];
  private graphAlgorithmsFactory: GraphAlgorithmsFactory;
  private objectDrawer: ObjectDrawer;
  constructor(private SCR: ScrService) {
    this.vertices = [];
    this.edges = [];
    this.graphAlgorithmsFactory = new GraphAlgorithmsFactory(this.vertices, this.edges);
    this.objectDrawer = new ObjectDrawer(this.SCR);
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
      if(animate) {
        this.edges.setAnimations(new EdgeAnimation());
      }
      this.objectDrawer.draw(this.vertices, this.edges);
    }
    this.vertices.sortByPosition();
  }

  public visibilityGraph(draw: boolean = false, animate: boolean = false): void  {
    this.clearEdges();
    this.graphAlgorithmsFactory.getVisibilityGraph().runAlgorithm();
    if(draw) {
      if(animate) {
        this.edges.setAnimations(new EdgeAnimation());
      }
      this.objectDrawer.draw(this.vertices, this.edges);
    }
    this.vertices.sortByPosition();
  }

  public longestConvexChainLabels(draw: boolean = false, animate: boolean = false): void {
    this.visibilityGraph();
    this.graphAlgorithmsFactory.getLongestConvexChain().runAlgorithm();
    if(draw) {
      if(animate) {
        this.edges.setAnimations(new LabelAnimation());
      }
      this.objectDrawer.draw(this.vertices, this.edges);
    }
    this.vertices.sortByPosition();
  }
}
