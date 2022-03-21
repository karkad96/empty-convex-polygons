import { Component, OnInit } from '@angular/core';
import {ScrService} from "../../../services/ScrService";
import {Graph} from "../../../utils/Graph";

@Component({
  selector: 'app-runner',
  templateUrl: './runner.component.html',
  styleUrls: ['./runner.component.css']
})
export class RunnerComponent implements OnInit {
  constructor(private SCR: ScrService) {
  }

  ngOnInit(): void {
    let starShapedPolygon = new Graph(this.SCR);
    let visibilityGraph = new Graph(this.SCR);

    starShapedPolygon.addNode(5, 5);
    starShapedPolygon.addNode(-5, 7);
    starShapedPolygon.addNode(2, 1);
    starShapedPolygon.addNode(-3, 2);
    starShapedPolygon.addNode(-1, 1);
    starShapedPolygon.addNode(3, -3);
    starShapedPolygon.addNode(-11, 5);
    starShapedPolygon.addNode(4, 13);
    starShapedPolygon.addNode(21, 3);
    starShapedPolygon.addNode(15, -2);
    //starShapedPolygon.addNode(-18, 7);
    starShapedPolygon.addNode(3, 13);
    starShapedPolygon.addNode(-7, -7);

    visibilityGraph.addNode(5, 5);
    visibilityGraph.addNode(-5, 7);
    visibilityGraph.addNode(2, 1);
    visibilityGraph.addNode(-3, 2);
    visibilityGraph.addNode(-1, 1);
    visibilityGraph.addNode(3, -3);
    visibilityGraph.addNode(-11, 5);
    visibilityGraph.addNode(4, 13);
    visibilityGraph.addNode(21, 3);
    visibilityGraph.addNode(15, -2);
    //visibilityGraph.addNode(-18, 7);
    visibilityGraph.addNode(3, 13);
    visibilityGraph.addNode(-7, -7);

    starShapedPolygon.drawStarShapedPolygon();
    visibilityGraph.drawVisibilityGraph();

    this.SCR.animate();
  }
}
