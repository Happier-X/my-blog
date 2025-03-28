---
cover: https://t.alcy.cc/fj?t=20250328153000
order: 1
date: 2025-03-28 15:30:00
category: 开发
tag: Three.js
excerpt: false
---

# Three.js 第一个 3D 场景

## 基本概念

Three.js 通过场景 (Scene) 来管理各个物体，这些物体组成一个树形结构。每个物体 (通常是 Mesh) 都有几何体 (Geometry) 和材质 (Material) 来描述形状、颜色等。通过相机 (Camera) 在不同的角度来观察，通过灯光 (Light) 来照亮这个三维世界。最后通过渲染器 (Renderer) 将场景 (Scene) 渲染到画布 (Canvas) 上，把返回的 Canvas 元素挂载到 HTML 的 DOM 中。

## 代码演示

首先初始化一个项目。

```sh
npm init -y
```

可以下载一下 Three.js 的类型包，这样在使用时会有提示。

```sh
npm i -D @types/three
```

新建一个 `index.html` 文件和 `index.js` 文件，内容如下。

```html title="index.html"
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body {
        margin: 0;
      }
    </style>
  </head>
  <body>
    <script type="importmap">
      {
        "imports": {
          "three": "https://unpkg.com/three@0.174.0/build/three.module.js",
          "three/addons/": "https://unpkg.com/three@0.174.0/examples/jsm/"
        }
      }
    </script>
    <script type="module" src="./index.js"></script>
  </body>
</html>
```

```JavaScript title="index.js"
import * as THREE from "three";

// 创建一个场景
const scene = new THREE.Scene();

{
  const geometry = new THREE.BoxGeometry(100, 100, 100);
  const material = new THREE.MeshLambertMaterial({
    color: new THREE.Color("orange"),
  });
  // 这个几何体是一个立方体，它的材质是一个漫反射材质，颜色为橙色。
  const mesh = new THREE.Mesh(geometry, material);
  // 设置物体的坐标
  mesh.position.set(0, 0, 0);
  // 往场景中添加物体
  scene.add(mesh);
}

{
  // 点光源，白色，强度为10000
  const pointLight = new THREE.PointLight(0xffffff, 10000);
  // 位置在(80, 80, 80)
  pointLight.position.set(80, 80, 80);
  // 往场景中添加灯光
  scene.add(pointLight);
}

{
  // 展示坐标系，红绿蓝三色分别表示x、y、z轴，传入的值是坐标轴的长度
  const axesHelper = new THREE.AxesHelper(200);
  scene.add(axesHelper);
}

{
  const width = window.innerWidth;
  const height = window.innerHeight;

  // 创建一个透视相机，视野为60度，近裁剪面为1，远裁剪面为1000
  const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
  // 从(200, 200, 200)位置观察物体
  camera.position.set(200, 200, 200);
  // 观察方向为(0, 0, 0)
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  // 用渲染器渲染场景和相机
  renderer.render(scene, camera);
  // 将渲染器的canvas元素添加到页面中
  document.body.append(renderer.domElement);
}
```

整个流程是：在 Scene 中添加各种 Mesh，每个 Mesh 都是由几何体 Geometry 和材质 Material 构成，设置相机 Camera 的角度和可视范围，设置灯光 Light 的位置，然后通过渲染器 Renderer 渲染到 Canvas 元素上，把这个 Canvas 挂载到 DOM。

实现通过鼠标拖拽来旋转物体。

```JavaScript {2,49-54,59} title="index.js"
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// 创建一个场景
const scene = new THREE.Scene();

{
  const geometry = new THREE.BoxGeometry(100, 100, 100);
  const material = new THREE.MeshLambertMaterial({
    color: new THREE.Color("orange"),
  });
  // 这个几何体是一个立方体，它的材质是一个漫反射材质，颜色为橙色。
  const mesh = new THREE.Mesh(geometry, material);
  // 设置物体的坐标
  mesh.position.set(0, 0, 0);
  // 往场景中添加物体
  scene.add(mesh);
}

{
  // 点光源，白色，强度为10000
  const pointLight = new THREE.PointLight(0xffffff, 10000);
  // 位置在(80, 80, 80)
  pointLight.position.set(80, 80, 80);
  // 往场景中添加灯光
  scene.add(pointLight);
}

{
  // 展示坐标系，红绿蓝三色分别表示x、y、z轴，传入的值是坐标轴的长度
  const axesHelper = new THREE.AxesHelper(200);
  scene.add(axesHelper);
}

{
  const width = window.innerWidth;
  const height = window.innerHeight;

  // 创建一个透视相机，视野为60度，近裁剪面为1，远裁剪面为1000
  const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
  // 从(200, 200, 200)位置观察物体
  camera.position.set(200, 200, 200);
  // 观察方向为(0, 0, 0)
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);

  function render() {
    // 用渲染器渲染场景和相机
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  render();

  // 将渲染器的canvas元素添加到页面中
  document.body.append(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
}
```
