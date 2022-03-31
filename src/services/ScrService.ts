import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {Injectable} from "@angular/core";
import Stats from "three/examples/jsm/libs/stats.module";
import {CSS2DRenderer} from "three/examples/jsm/renderers/CSS2DRenderer";
import * as TWEEN from "@tweenjs/tween.js";

@Injectable({
  providedIn: 'root',
})
export class ScrService {
  public scene: THREE.Scene = new THREE.Scene();
  public camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  public renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
  public labelRenderer = new CSS2DRenderer();
  public orbitControls: OrbitControls;
  public tween!: TWEEN.Tween<{ x: number, y: number }>;
  private stats: Stats;

  constructor() {
    this.camera.position.set(0, 0, 10);

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.labelRenderer.setSize(window.innerWidth, window.innerHeight);
    this.labelRenderer.domElement.style.position = 'absolute';
    this.labelRenderer.domElement.style.top = '0px';
    document.body.appendChild(this.labelRenderer.domElement);

    this.orbitControls = new OrbitControls(this.camera, this.labelRenderer.domElement);
    this.orbitControls.enableRotate = false;

    let grid = new THREE.GridHelper(100, 100, new THREE.Color( 0x7a7a7a ), new THREE.Color( 0x3a3a3a ));
    grid.geometry.rotateX(Math.PI / 2);

    this.scene.add(grid);
    this.stats = Stats();
    document.body.appendChild(this.stats.dom);
  }

  public render(): void {
    this.renderer.render(this.scene, this.camera);
  }

  public renderLabels(): void {
    this.labelRenderer.render(this.scene, this.camera);
  }

  public animate = () => {
    requestAnimationFrame(this.animate);
    this.orbitControls.update();
    this.render();
    this.renderLabels();
    this.stats.update();
    TWEEN.update();
  }
}
