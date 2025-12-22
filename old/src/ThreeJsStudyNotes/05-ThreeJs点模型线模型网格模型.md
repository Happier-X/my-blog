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

## 网格模型

### 正反面

网格模型还有正反面的概念。

```JavaScript title="mesh.js"
import * as THREE from "three";

const geometry = new THREE.BufferGeometry();

const vertices = new Float32Array([0, 0, 0, 100, 0, 0, 0, 100, 0, 100, 100, 0]);

const attribute = new THREE.BufferAttribute(vertices, 3);
geometry.attributes.position = attribute;

const indexes = new Uint16Array([0, 1, 2, 2, 1, 3]);
geometry.index = new THREE.BufferAttribute(indexes, 1);

const material = new THREE.MeshBasicMaterial({
  color: new THREE.Color("orange"),
});

const mesh = new THREE.Mesh(geometry, material);

export default mesh;
```

```JavaScript {3,6,12,13} title="index.js"
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import mesh from "./mesh.js";

const scene = new THREE.Scene();
scene.add(mesh);

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

可以看到如下效果。

![](https://happier-blog.oss-cn-qingdao.aliyuncs.com/Three.js点模型线模型网格模型04.png)

当我们旋转到反面时，会看到如下效果。

![](https://happier-blog.oss-cn-qingdao.aliyuncs.com/Three.js点模型线模型网格模型05.png)

然后我们更改一下顶点索引中最后两个顶点的顺序。

```JavaScript {10} title="mesh.js"
import * as THREE from "three";

const geometry = new THREE.BufferGeometry();

const vertices = new Float32Array([0, 0, 0, 100, 0, 0, 0, 100, 0, 100, 100, 0]);

const attribute = new THREE.BufferAttribute(vertices, 3);
geometry.attributes.position = attribute;

const indexes = new Uint16Array([0, 1, 2, 2, 3, 1]);
geometry.index = new THREE.BufferAttribute(indexes, 1);

const material = new THREE.MeshBasicMaterial({
  color: new THREE.Color("orange"),
});

const mesh = new THREE.Mesh(geometry, material);

export default mesh;
```

此时我们会看到如下效果。

![](https://happier-blog.oss-cn-qingdao.aliyuncs.com/Three.js点模型线模型网格模型06.png)

![](https://happier-blog.oss-cn-qingdao.aliyuncs.com/Three.js点模型线模型网格模型07.png)

这是因为在 Three.js 中，从相机看过去的方向，如果一个三角形是逆时针连接的顶点，就是正面；如果是顺时针连接的顶点，就是反面。

默认情况下是正面可见，反面不可见的，如果想要双面可见，可以在材质中设置 `side` 属性为 `THREE.DoubleSide`。

```JavaScript {15} title="mesh.js"
import * as THREE from "three";

const geometry = new THREE.BufferGeometry();

const vertices = new Float32Array([0, 0, 0, 100, 0, 0, 0, 100, 0, 100, 100, 0]);

const attribute = new THREE.BufferAttribute(vertices, 3);
geometry.attributes.position = attribute;

const indexes = new Uint16Array([0, 1, 2, 2, 3, 1]);
geometry.index = new THREE.BufferAttribute(indexes, 1);

const material = new THREE.MeshBasicMaterial({
  color: new THREE.Color("orange"),
  side: THREE.DoubleSide,
});

const mesh = new THREE.Mesh(geometry, material);

export default mesh;
```

### 分段

```JavaScript title="mesh.js"
import * as THREE from "three";

const geometry = new THREE.PlaneGeometry(100, 100, 2, 3); // 这里的第三个和第四个参数是分段数

const material = new THREE.MeshBasicMaterial({
  color: new THREE.Color("orange"),
  wireframe: true,
});

const mesh = new THREE.Mesh(geometry, material);

console.log(mesh);

export default mesh;
```

我们可以看到如下效果。

![](https://happier-blog.oss-cn-qingdao.aliyuncs.com/Three.js点模型线模型网格模型08.png)

我们看到它的宽被分成了 2 段，高被分成了 3 段。

在圆中，分段越多，看起来就越圆，但是性能也越差，所有我们需要取一个合适的值。

```JavaScript title="mesh.js"
import * as THREE from "three";

const geometry = new THREE.CylinderGeometry(50, 50, 80); // 第一个参数是底面半径，第二个参数是顶面半径，第三个参数是高度

const material = new THREE.MeshBasicMaterial({
  color: new THREE.Color("orange"),
  wireframe: true,
});

const mesh = new THREE.Mesh(geometry, material);

export default mesh;
```

我们可以看到如下效果。

![](https://happier-blog.oss-cn-qingdao.aliyuncs.com/Three.js点模型线模型网格模型09.png)

默认情况下，圆的分段数是 32，高度的分段数是 1。如果我们想要更改分段数，可以在创建圆时传入参数。

```JavaScript {3} title="mesh.js"
import * as THREE from "three";

const geometry = new THREE.CylinderGeometry(50, 50, 80, 5);

const material = new THREE.MeshBasicMaterial({
  color: new THREE.Color("orange"),
  wireframe: true,
});

const mesh = new THREE.Mesh(geometry, material);

export default mesh;
```

此时我们会看到没有那么圆了。

![](https://happier-blog.oss-cn-qingdao.aliyuncs.com/Three.js点模型线模型网格模型10.png)