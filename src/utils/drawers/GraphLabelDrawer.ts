import {IGraphDrawableLabel} from "../interfaces/idrawables/IGraphDrawableLabel";
import {Nodes} from "../Nodes";
import {Edges} from "../Edges";
import {CSS2DObject} from "three/examples/jsm/renderers/CSS2DRenderer";
import {Line} from "../../models/Line";

export class GraphLabelDrawer implements IGraphDrawableLabel {
  private readonly nodes: Nodes;
  private edges: Edges;

  constructor(_nodes: Nodes, _edges: Edges) {
    this.nodes = _nodes;
    this.edges = _edges;
  }

  private makeLabel = (edge: Line): void => {
    let element = document.getElementById(edge.arrow.uuid);
    if(element && element.textContent == edge.weight.toString()) {
      return;
    }
    const edgeDiv = document.createElement('div');
    edgeDiv.className = 'label';
    edgeDiv.id = edge.arrow.uuid;
    edgeDiv.textContent = edge.weight.toString();
    const edgeLabel = new CSS2DObject(edgeDiv);
    edgeLabel.position.set(0, edge.arrow.length / 2, 0);
    edge.arrow.add(edgeLabel);
  };

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
