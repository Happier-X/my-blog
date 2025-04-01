---
cover: https://t.alcy.cc/fj?t=20250401163000
order: 5
date: 2025-04-01 16:30:00
category: 开发
tag: Three.js
excerpt: false
---

# Three.js 点模型、线模型、网格模型

点模型、线模型、网格模型是 Three.js 支持的三种渲染物体的方式。

## 点模型

```JavaScript {3,6} title="index.js"
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import points from "./points.js";

const scene = new THREE.Scene();
scene.add(points);

const pointLight = new THREE.PointLight(0xffffff, 10000);
pointLight.position.set(80, 80, 80);
scene.add(pointLight);

const axesHelper = new THREE.AxesHelper(200);
scene.add(axesHelper);

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
```

```JavaScript title="points.js"
import * as THREE from "three";

const geometry = new THREE.BufferGeometry(); // 创建几何体

const vertices = new Float32Array([
  0, 0, 0, 100, 0, 0, 0, 100, 0, 0, 0, 100, 100, 100, 0,
]);
const attribute = new THREE.BufferAttribute(vertices, 3);
geometry.attributes.position = attribute; // 添加顶点数据

const material = new THREE.PointsMaterial({
  color: new THREE.Color("orange"),
  size: 10,
});
const points = new THREE.Points(geometry, material); // 创建点

export default points;
```

可以看到如下效果。

![](https://happier-blog.oss-cn-qingdao.aliyuncs.com/Three.js点模型线模型网格模型01.png)

## 线模型

```JavaScript {3,6,12,13} title="index.js"
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import line from "./line.js";

const scene = new THREE.Scene();
scene.add(line);

const pointLight = new THREE.PointLight(0xffffff, 10000);
pointLight.position.set(80, 80, 80);
scene.add(pointLight);

// const axesHelper = new THREE.AxesHelper(200);
// scene.add(axesHelper);

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
```

```JavaScript title="line.js"
import * as THREE from "three";

const geometry = new THREE.BufferGeometry(); // 创建几何体

const vertices = new Float32Array([
  0, 0, 0, 100, 0, 0, 0, 100, 0, 0, 0, 100, 100, 100, 0,
]);
const attribute = new THREE.BufferAttribute(vertices, 3);
geometry.attributes.position = attribute;

const material = new THREE.PointsMaterial({
  color: new THREE.Color("orange"),
});
const line = new THREE.Line(geometry, material); // 创建线

export default line;
```

可以看到如下效果。

![](https://happier-blog.oss-cn-qingdao.aliyuncs.com/Three.js点模型线模型网格模型02.png)

如果想要线首尾相连，可以在创建线模型时传入 `THREE.LineLoop`。

```JavaScript {14} title="line.js"
import * as THREE from "three";

const geometry = new THREE.BufferGeometry(); // 创建几何体

const vertices = new Float32Array([
  0, 0, 0, 100, 0, 0, 0, 100, 0, 0, 0, 100, 100, 100, 0,
]);
const attribute = new THREE.BufferAttribute(vertices, 3);
geometry.attributes.position = attribute;

const material = new THREE.PointsMaterial({
  color: new THREE.Color("orange"),
});
const line = new THREE.LineLoop(geometry, material); // 创建线

export default line;
```

如果想要线段连接，可以在创建线模型时传入 `THREE.LineSegments`。

```JavaScript {14} title="line.js"
import * as THREE from "three";

const geometry = new THREE.BufferGeometry(); // 创建几何体

const vertices = new Float32Array([
  0, 0, 0, 100, 0, 0, 0, 100, 0, 0, 0, 100, 100, 100, 0,
]);
const attribute = new THREE.BufferAttribute(vertices, 3);
geometry.attributes.position = attribute;

const material = new THREE.PointsMaterial({
  color: new THREE.Color("orange"),
});
const line = new THREE.LineSegments(geometry, material); // 创建线

export default line;
```

此时可以看到两条线段。

![](https://happier-blog.oss-cn-qingdao.aliyuncs.com/Three.js点模型线模型网格模型03.png)
