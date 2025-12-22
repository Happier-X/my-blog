---
cover: https://t.alcy.cc/fj?t=20250401160000
order: 4
date: 2025-04-01 16:00:00
category: 开发
tag: Three.js
excerpt: false
---

# Three.js BufferGeometry

BufferGeometry 是所有几何体的父类。所有的物体都是由三角形构成的，也就是网格模型。

所有几何体都是由一堆顶点数据构成一堆三角形，三角形构成了任何几何体。

这里我们自己实现一个几何体。

```javascript {3,7} title="index.js"
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

```javascript title="mesh.js"
import * as THREE from "three";

const geometry = new THREE.BufferGeometry(); // 创建几何体

const vertices = new Float32Array([
  0, 0, 0, 100, 0, 0, 0, 100, 0, 0, 0, 10, 0, 0, 100, 100, 0, 10,
]);

const attribute = new THREE.BufferAttribute(vertices, 3); // 创建顶点数据，参数是顶点数组，3个元素为一组坐标
geometry.attributes.position = attribute; // 顶点数据

const material = new THREE.MeshBasicMaterial({
  color: new THREE.Color("orange"),
}); // 材质

const mesh = new THREE.Mesh(geometry, material);

export default mesh;
```

可以看到，六个顶点构成了两个三角形。

![](https://happier-blog.oss-cn-qingdao.aliyuncs.com/Three.jsBufferGeometry01.png)

再来实现一个平面几何体。

```javascript {6} title="mesh.js"
import * as THREE from "three";

const geometry = new THREE.BufferGeometry();

const vertices = new Float32Array([
  0, 0, 0, 100, 0, 0, 0, 100, 0, 0, 100, 0, 100, 0, 0, 100, 100, 0,
]);

const attribute = new THREE.BufferAttribute(vertices, 3);
geometry.attributes.position = attribute;

const material = new THREE.MeshBasicMaterial({
  color: new THREE.Color("orange"),
});

const mesh = new THREE.Mesh(geometry, material);

export default mesh;
```

可以看到如下效果。

![](https://happier-blog.oss-cn-qingdao.aliyuncs.com/Three.jsBufferGeometry02.png)

在材质中展示线框。

```javascript {14} title="mesh.js"
import * as THREE from "three";

const geometry = new THREE.BufferGeometry();

const vertices = new Float32Array([
  0, 0, 0, 100, 0, 0, 0, 100, 0, 0, 100, 0, 100, 0, 0, 100, 100, 0,
]);

const attribute = new THREE.BufferAttribute(vertices, 3);
geometry.attributes.position = attribute;

const material = new THREE.MeshBasicMaterial({
  color: new THREE.Color("orange"),
  wireframe: true,
});

const mesh = new THREE.Mesh(geometry, material);

export default mesh;
```

可以看到如下效果。

![](https://happier-blog.oss-cn-qingdao.aliyuncs.com/Three.jsBufferGeometry03.png)

我们可以看到，有两个顶点是重叠的，数据也是重复的。我们可以使用设置索引的方式，这样就可以避免重复数据。

```javascript {5，10,11} title="mesh.js"
import * as THREE from "three";

const geometry = new THREE.BufferGeometry();

const vertices = new Float32Array([0, 0, 0, 100, 0, 0, 0, 100, 0, 100, 100, 0]);

const attribute = new THREE.BufferAttribute(vertices, 3);
geometry.attributes.position = attribute;

const indexes = new Uint16Array([0, 1, 2, 2, 1, 3]);
geometry.index = new THREE.BufferAttribute(indexes, 1);

const material = new THREE.MeshBasicMaterial({
  color: new THREE.Color("orange"),
  wireframe: true,
});

const mesh = new THREE.Mesh(geometry, material);

export default mesh;
```

这样写就可以避免重复数据了。可以看到如下效果。

![](https://happier-blog.oss-cn-qingdao.aliyuncs.com/Three.jsBufferGeometry04.png)