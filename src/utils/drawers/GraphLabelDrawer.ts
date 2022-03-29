import {IGraphDrawableLabel} from "../interfaces/IGraphDrawableLabel";
import {Nodes} from "../Nodes";
import {Edges} from "../Edges";
import {ScrService} from "../../services/ScrService";
import {CSS2DObject} from "three/examples/jsm/renderers/CSS2DRenderer";
import {Line} from "../../models/Line";

export class GraphLabelDrawer implements IGraphDrawableLabel {
  private readonly nodes: Nodes;
  private edges: Edges;

  constructor(_nodes: Nodes, _edges: Edges, private SCR: ScrService) {
    this.nodes = _nodes;
    this.edges = _edges;
  }

  private makeLabel(edge: Line): void {
    const edgeDiv = document.createElement('div');
    edgeDiv.style.color = '#FFF';
    edgeDiv.id = edge.arrow.uuid;
    edgeDiv.style.fontFamily = 'sans-serif';
    edgeDiv.style.padding = '2px';
    edgeDiv.textContent = edge.weight.toString();
    const edgeLabel = new CSS2DObject(edgeDiv);
    let len = Math.sqrt(Math.pow(edge.p1.mesh.position.x - edge.p2.mesh.position.x,2) +
                           Math.pow(edge.p1.mesh.position.y - edge.p2.mesh.position.y,2));
    edgeLabel.position.set(0, len / 2, 0);
    edge.arrow.add(edgeLabel);
  }

  public drawLabels(isAnimated: boolean = false): void {
    if(isAnimated) {
      let timeout = 1000;
      let delta = 1000;
      this.edges.forEach(edge => {
        setTimeout(() => {
          this.makeLabel(edge);
        }, timeout);
        timeout += delta;
      });
    } else {
      this.edges.forEach(edge => {
        this.makeLabel(edge);
      });
    }
  }
}
