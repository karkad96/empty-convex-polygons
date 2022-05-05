import { Component, OnInit } from '@angular/core';
import {ScrService} from "../../../services/ScrService";
import {Graph} from "../../../utils/Graph";
import {Vertex} from "../../../utils/objects/vertices/Vertex";
import {Raycaster, Vector2, Vector3} from "three";
import {Edge} from "../../../utils/objects/edges/Edge";

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

    graph.addVertices(...points);

    graph.starShapedPolygon(true);
    //graph.visibilityGraph(true, true);
    //graph.longestConvexChainLabels(true, true);
    graph.draw();

    let line = new Edge(new Vertex(new Vector3(5, 5, 0)), new Vertex(new Vector3(5, 7, 0)));
    let objects = [line];

    this.SCR.scene.add(...objects);

    let raycaster = new Raycaster();
    let mouse = new Vector2();

    window.addEventListener('click', (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, this.SCR.camera);

      let intersects = raycaster.intersectObjects(objects, false);

      if(intersects.length > 0 ) {
        console.log(intersects[0]);
      }
    });

    this.SCR.animate();
  }
}
