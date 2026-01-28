---
cover: https://t.alcy.cc/fj?t=20250402143000
order: 8
date: 2025-04-02 14:30:00
category: 开发
tag: Three.js
excerpt: false
---

# Three.js uv 坐标与 uv 动画

## uv 坐标

uv 坐标是纹理贴图的坐标系，通常是一个二维坐标系，范围在 0-1 之间。uv 坐标的原点在左下角，x 轴向右，y 轴向上。uv 坐标可以用来指定纹理贴图在几何体上的位置。

首先我们渲染一个贴图。

```javascript title="index.js"
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import mesh from "./mesh.js";

const scene = new THREE.Scene();

scene.add(mesh);

const axesHelper = new THREE.AxesHelper(200);
scene.add(axesHelper);

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
camera.position.set(0, 0, 200);
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

const geometry = new THREE.PlaneGeometry(200, 100);

const loader = new THREE.TextureLoader();
const texture = loader.load("./bg.png");
texture.colorSpace = THREE.SRGBColorSpace;

const material = new THREE.MeshBasicMaterial({
  map: texture,
});

const mesh = new THREE.Mesh(geometry, material);

console.log(mesh);

export default mesh;
```

可以看到如下效果。

![](https://happier-blog.oss-cn-qingdao.aliyuncs.com/Three.jsuv坐标与uv动画01.png)

设置一下 uv 坐标。

```javascript {5,6} title="mesh.js"
import * as THREE from "three";

const geometry = new THREE.PlaneGeometry(200, 100);

const uvs = new Float32Array([0, 0.5, 0.5, 0.5, 0, 0, 0.5, 0]);
geometry.attributes.uv = new THREE.BufferAttribute(uvs, 2);

const loader = new THREE.TextureLoader();
const texture = loader.load("./bg.png");
texture.colorSpace = THREE.SRGBColorSpace;

const material = new THREE.MeshBasicMaterial({
  map: texture,
});

const mesh = new THREE.Mesh(geometry, material);

console.log(mesh);

export default mesh;
```

此时我们可以看到如下效果，这样我们就只取了贴图的一部分来渲染。

![](https://happier-blog.oss-cn-qingdao.aliyuncs.com/Three.jsuv坐标与uv动画02.png)

## uv 动画

纹理对象 `Texture` 有一个 `offset` 属性，可以用来设置纹理的偏移量。这相当于在 uv 坐标上加上一个偏移量。我们可以通过设置 `offset` 属性来实现纹理的动画效果。

```javascript title="index.js"
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import mesh from "./mesh.js";

const scene = new THREE.Scene();

scene.add(mesh);

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
camera.position.set(0, 0, 200);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);

function render() {
  mesh.material.map.offset.y += 0.001; // 让 texture.offset.y 逐渐增加
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();

document.body.append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
```

```javascript title="mesh.js"
import * as THREE from "three";

const loader = new THREE.TextureLoader();
const texture = loader.load("./Jupiter.jpg");
texture.colorSpace = THREE.SRGBColorSpace;
texture.wrapT = THREE.RepeatWrapping; // 让纹理在y轴上重复，防止滚动时后面贴纸消失

const geometry = new THREE.SphereGeometry(50);

const material = new THREE.MeshBasicMaterial({
  map: texture,
});

const mesh = new THREE.Mesh(geometry, material);

export default mesh;
```

此时我们可以看到如下效果。

![](https://happier-blog.oss-cn-qingdao.aliyuncs.com/Three.jsuv坐标与uv动画03.gif)
