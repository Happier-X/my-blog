---
cover: https://t.alcy.cc/fj?t=20250402110000
order: 6
date: 2025-04-02 11:00:00
category: 开发
tag: Three.js
excerpt: false
---

# Three.js 实现随机山脉效果

## 代码

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
          "three/addons/": "https://unpkg.com/three@0.174.0/examples/jsm/",
          "simplex-noise": "https://unpkg.com/simplex-noise@4.0.3/dist/esm/simplex-noise.js"
        }
      }
    </script>
    <script type="module" src="./index.js"></script>
  </body>
</html>
```

```javascript title="index.js"
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import mesh, { updatePosition } from "./mesh.js";

const scene = new THREE.Scene();

scene.add(mesh);

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
camera.position.set(450, 150, 100);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);

function render() {
  updatePosition();
  mesh.rotateZ(0.003);
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();

document.body.append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
```

```javascript title="mesh.js"
import * as THREE from "three";
import { createNoise2D } from "simplex-noise";

const geometry = new THREE.PlaneGeometry(3000, 3000, 100, 100); // 3000x3000 的平面，分成 100 段

const noise2D = createNoise2D();

export function updatePosition() {
  const positions = geometry.attributes.position;

  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i);
    const y = positions.getY(i);
    const z = noise2D(x / 300, y / 300) * 50; // 使用噪声函数生成高度，如果想让山峰更高，可以增大这个值
    const sinNum = Math.sin(Date.now() * 0.002 + x * 0.05) * 10; // 添加一个正弦波动，使其不断变化
    positions.setZ(i, z + sinNum);
  }
  positions.needsUpdate = true;
}

const material = new THREE.MeshBasicMaterial({
  color: new THREE.Color("orange"),
  wireframe: true,
});

const mesh = new THREE.Mesh(geometry, material);
mesh.rotateX(Math.PI / 2); // 将平面旋转 90 度

console.log(mesh);

export default mesh;
```

## 效果

![](https://happier-blog.oss-cn-qingdao.aliyuncs.com/Three.js实现随机山脉效果01.gif)