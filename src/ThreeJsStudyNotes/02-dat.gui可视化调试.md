---
cover: https://t.alcy.cc/fj?t=20250328170000
order: 2
date: 2025-03-28 17:00:00
category: 开发
tag: Three.js
excerpt: false
---

# dat.gui 可视化调试

在 Three.js 中，dat.gui 是一个非常有用的工具，可以帮助我们在浏览器中创建一个简单的用户界面，以便于实时调整和调试场景中的参数。通过 dat.gui，我们可以轻松地创建滑块、颜色选择器等控件，从而动态地修改物体的属性，比如位置、旋转、缩放、颜色等。

## 引入并使用 dat.gui

```JavaScript {3,6,17-20,29-32} title="index.js"
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";

const scene = new THREE.Scene();
const gui = new GUI();

{
  const geometry = new THREE.BoxGeometry(100, 100, 100);
  const material = new THREE.MeshLambertMaterial({
    color: new THREE.Color("orange"),
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, 0, 0);
  scene.add(mesh);

  gui.addColor(mesh.material, "color");
  gui.add(mesh.position, "x").step(10);
  gui.add(mesh.position, "y").step(10);
  gui.add(mesh.position, "z").step(10);
}

{
  const pointLight = new THREE.PointLight(0xffffff, 10000);
  pointLight.position.set(80, 80, 80);
  scene.add(pointLight);

  gui.add(pointLight.position, "x").step(10);
  gui.add(pointLight.position, "y").step(10);
  gui.add(pointLight.position, "z").step(10);
  gui.add(pointLight, "intensity").step(1000);
}

{
  const axesHelper = new THREE.AxesHelper(200);
  scene.add(axesHelper);
}

{
  const width = window.innerWidth;
  const height = window.innerHeight;

  const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
  camera.position.set(200, 200, 200);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);

  function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  render();

  document.body.append(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
}
```

## 为控件创建分组

在 dat.gui 中，我们可以使用 `gui.addFolder` 方法为控件创建分组，这样可以更好地组织和管理控件。每个分组可以包含多个控件，并且可以折叠和展开，以便于查看和调整参数。

```JavaScript {17-21,29-33} title="index.js"
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";

const scene = new THREE.Scene();
const gui = new GUI();

{
  const geometry = new THREE.BoxGeometry(100, 100, 100);
  const material = new THREE.MeshLambertMaterial({
    color: new THREE.Color("orange"),
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, 0, 0);
  scene.add(mesh);

  const meshFolder = gui.addFolder("立方体");
  meshFolder.addColor(mesh.material, "color");
  meshFolder.add(mesh.position, "x").step(10);
  meshFolder.add(mesh.position, "y").step(10);
  meshFolder.add(mesh.position, "z").step(10);
}

{
  const pointLight = new THREE.PointLight(0xffffff, 10000);
  pointLight.position.set(80, 80, 80);
  scene.add(pointLight);

  const lightFolder = gui.addFolder("光源");
  lightFolder.add(pointLight.position, "x").step(10);
  lightFolder.add(pointLight.position, "y").step(10);
  lightFolder.add(pointLight.position, "z").step(10);
  lightFolder.add(pointLight, "intensity").step(1000);
}

{
  const axesHelper = new THREE.AxesHelper(200);
  scene.add(axesHelper);
}

{
  const width = window.innerWidth;
  const height = window.innerHeight;

  const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
  camera.position.set(200, 200, 200);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);

  function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  render();

  document.body.append(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
}
```
