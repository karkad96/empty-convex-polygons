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
    let graph = new Graph(this.SCR);
    let points = [[5, 5],  [-5, 7], [2, 1],
                 [-3, 2],  [-1, 1], [3, -3],
                 [-11, 5], [4, 13], [21, 3],
                 [15, -2], [3, 13], [-7, -7]];

    graph.addNodes(points);

    //graph.starShapedPolygon(true, true);
    graph.visibilityGraph(true, true);
    //graph.longestConvexChainLabels(true, true);

    this.SCR.animate();
  }
}
