---
cover: https://t.alcy.cc/fj?t=20250402113000
order: 7
date: 2025-04-02 11:30:00
category: 开发
tag: Three.js
excerpt: false
---

# Three.js 材质颜色与纹理贴图

## 虚线材质

线模型想要渲染几何体需要先用 `EdgesGeometry` 包裹来处理下顶点，之后可以设置 `LineDashedMaterial` 来画虚线，但要调用 `line.computeLineDistances()` 做相关计算。

```javascript title="index.js"
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

const boxGeometry = new THREE.BoxGeometry(100, 100, 100);

const geometry = new THREE.EdgesGeometry(boxGeometry); // BoxGeometry要渲染线模型不能直接使用，需要使用EdgesGeometry转换

const material = new THREE.LineDashedMaterial({
  color: new THREE.Color("orange"),
  dashSize: 10,
  gapSize: 10,
}); // 虚线材质

const line = new THREE.Line(geometry, material);
line.computeLineDistances(); // 计算虚线

console.log(line);

export default line;
```

可以看到如下效果。

![](https://happier-blog.oss-cn-qingdao.aliyuncs.com/Three.js材质颜色与纹理贴图01.png)

## 网格模型材质颜色

```javascript title="mesh.js"
import * as THREE from "three";

const geometry = new THREE.PlaneGeometry(100, 100);

const material = new THREE.MeshBasicMaterial({
  color: new THREE.Color("orange"),
});

const mesh = new THREE.Mesh(geometry, material);

console.log(mesh);

const color = mesh.material.color;
console.log(color.getHexString()); // "ffa500"
console.log(color.getStyle()); // "rgb(255, 165, 0)"
color.setStyle("blue"); // 设置颜色为蓝色

export default mesh;
```

可以看到如下效果。

![](https://happier-blog.oss-cn-qingdao.aliyuncs.com/Three.js材质颜色与纹理贴图02.png)

## 网格模型材质透明度

设置透明度需要设置 `transparent` 为 `true`，并且设置 `opacity` 的值。

```javascript {7,8} title="mesh.js"
import * as THREE from "three";

const geometry = new THREE.PlaneGeometry(100, 100);

const material = new THREE.MeshBasicMaterial({
  color: new THREE.Color("orange"),
  transparent: true,
  opacity: 0.5,
});

const mesh = new THREE.Mesh(geometry, material);

export default mesh;
```

可以看到如下效果。

![](https://happier-blog.oss-cn-qingdao.aliyuncs.com/Three.js材质颜色与纹理贴图03.png)

## 纹理贴图

`map` 是颜色贴图也叫纹理贴图，用 `TextureLoader` 加载纹理图片后设置到 `map`。纹理贴图可以设置水平、竖直方向的重复次数，重复多次后再作为网格模型的纹理。如果纹理贴图颜色不对，可以设置下 `texture.colorSpace`。还可以再设置 `aoMap`，它会基于环境对贴图的影响做计算，加上凹凸感。

```javascript title="mesh.js"
import * as THREE from "three";

const loader = new THREE.TextureLoader();
const texture = loader.load("./earth.jpg");

const geometry = new THREE.SphereGeometry(100); // 创建一个球体几何体，半径为100

const material = new THREE.MeshBasicMaterial({
  // color: new THREE.Color("orange"), // 还可以设置颜色
  map: texture,
});

const mesh = new THREE.Mesh(geometry, material);

export default mesh;
```

![](https://happier-blog.oss-cn-qingdao.aliyuncs.com/Three.js材质颜色与纹理贴图04.png)

再实现一个墙面的效果。

```javascript title="index.js"
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import mesh from "./mesh.js";

const scene = new THREE.Scene();

scene.add(mesh);

const pointLight = new THREE.PointLight(0xffffff, 10000);
pointLight.position.set(80, 80, 80);
scene.add(pointLight);

const axesHelper = new THREE.AxesHelper(200);
// scene.add(axesHelper);

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
camera.position.set(90, 230, 1175);
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

// 可以用于调试相机位置
controls.addEventListener("change", () => {
  console.log(camera.position);
});
```

```javascript title="mesh.js"
import * as THREE from "three";

const loader = new THREE.TextureLoader();
const texture = loader.load("./brick.jpg");
texture.wrapS = THREE.RepeatWrapping; // 设置水平方向重复
texture.wrapT = THREE.RepeatWrapping; // 设置垂直方向重复
texture.repeat.set(3, 3); // 设置重复次数
texture.colorSpace = THREE.SRGBColorSpace; // 设置颜色空间，如果不设置，颜色会偏灰

const geometry = new THREE.PlaneGeometry(1000, 1000);

const material = new THREE.MeshBasicMaterial({
  map: texture,
  aoMap: texture, // 设置环境光贴图
});

const mesh = new THREE.Mesh(geometry, material);

export default mesh;
```

可以看到如下效果。

![](https://happier-blog.oss-cn-qingdao.aliyuncs.com/Three.js材质颜色与纹理贴图05.png)
