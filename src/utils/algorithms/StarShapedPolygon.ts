import {IAlgorithm} from "../interfaces/ialgorithms/IAlgorithm";
import {Vertex} from "../objects/vertices/Vertex";
import {Edge} from "../objects/edges/Edge";
import "../extensions/ArrayVertexExtensions";

export class StarShapedPolygon implements IAlgorithm {
  private vertices: Vertex[];
  protected edges: Edge[];

  constructor(_nodes: Vertex[], _edges: Edge[]) {
    this.vertices = _nodes;
    this.edges = _edges;
  }

  private starShapedPolygon(): void {
    this.vertices.sortByAngle();

    this.edges.push(new Edge(this.vertices[0].center, this.vertices[1].center, 0, 0x00ff00));
    this.edges.push(new Edge(this.vertices[0].center, this.vertices[this.vertices.length - 1].center, 0, 0x00ff00));

    for(let i = 1; i < this.vertices.length - 1; i++) {
      this.edges.push(new Edge(this.vertices[i].center, this.vertices[i + 1].center, 0, 0x00ff00));
    }
  }

  public runAlgorithm(): void {
    this.starShapedPolygon();
  }
}
