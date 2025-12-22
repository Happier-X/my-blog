---
cover: https://t.alcy.cc/fj?t=20250401100000
order: 3
date: 2025-04-01 10:00:00
category: 开发
tag: Three.js
excerpt: false
---

# Three.js 深入理解透视相机与视锥体

要看到视锥体，我们需要创建另一个相机来观察。Three.js 提供了 `CameraHelper` 来帮助我们可视化相机的视锥体。

```javascript {13-15} title="index.js"
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
camera.position.set(200, 200, 200);
camera.lookAt(0, 0, 0);

const camera2 = new THREE.PerspectiveCamera(20, 16 / 9, 100, 300);
const cameraHelper = new THREE.CameraHelper(camera2);
scene.add(cameraHelper);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);

function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();

document.body.append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
```

![](https://happier-blog.oss-cn-qingdao.aliyuncs.com/Three.js深入理解透视相机与视锥体01.png)

这个视锥体的第一个参数是视野角度，第二个参数是宽高比，第三个参数是近裁剪面的距离，第四个参数是远裁剪面的距离。

这里可以通过可视化调试来调试一下相关参数。

```javascript {15,18-32} title="index.js"
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";

const scene = new THREE.Scene();

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
camera.position.set(200, 200, 200);
camera.lookAt(0, 0, 0);

const camera2 = new THREE.PerspectiveCamera(20, 16 / 9, 100, 300);
let cameraHelper = new THREE.CameraHelper(camera2);
scene.add(cameraHelper);

const gui = new GUI();
function onChange() {
  scene.remove(cameraHelper);
  cameraHelper = new THREE.CameraHelper(camera2);
  scene.add(cameraHelper);
}
gui.add(camera2, "fov", [30, 60, 10]).onChange(onChange);
gui
  .add(camera2, "aspect", {
    "16/9": 16 / 9,
    "4/3": 4 / 3,
  })
  .onChange(onChange);
gui.add(camera2, "near", 0, 300).onChange(onChange);
gui.add(camera2, "far", 300, 800).onChange(onChange);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);

function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();

document.body.append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
```

通过调试，我们可以看到视锥体的变化，得出以下结论：

- fov：影响可视范围角度、离物体远近，越大可视范围越大，物体越小。
- aspect：影响可视范围的宽高比，一般设置为窗口的宽高比。
- near：影响近裁剪面，一般保持默认值 0.1，当需要裁掉近处的物体时，可以设置为更大的值。
- far：影响远裁剪面，当需要裁掉远处的物体时，可以设置为更小的值，当远处的物体被裁掉时，需要设置为更大的值。
