---
cover: https://t.alcy.cc/fj?t=20250418170000
order: 12
date: 2025-04-18 17:00:00
category: 开发
tag: Three.js
excerpt: false
---

# Three.js 实现无限隧道穿梭

可以使用 uv 动画来实现无限隧道穿梭的效果。uv 动画是通过改变纹理坐标来实现的，可以让物体表面的纹理在一定范围内移动，从而产生穿梭的效果。

```javascript title="index.js"
import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import mesh from "./mesh.js";

const scene = new THREE.Scene();

scene.add(mesh);

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
camera.position.set(0.9, -520, 6.5);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
let H = 0;
function render() {
  H += 0.002;
  if (H > 1) {
    H = 0;
  }
  mesh.material.color.setHSL(H, 0.5, 0.5);
  mesh.material.alphaMap.offset.y += 0.01;
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();

document.body.append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
```

```javascript title="mesh.js"
import * as THREE from "three";

const geometry = new THREE.CylinderGeometry(30, 50, 1000, 32, 32, true);
const loader = new THREE.TextureLoader();
const texture = loader.load("./tube.jpg");
texture.colorSpace = THREE.SRGBColorSpace;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(1, 2);

const material = new THREE.MeshBasicMaterial({
  transparent: true,
  alphaMap: texture,
  side: THREE.BackSide,
});

const tunnel = new THREE.Mesh(geometry, material);

export default tunnel;
```

![](https://happier-blog.oss-cn-qingdao.aliyuncs.com/Three.js实现无限隧道穿梭01.gif)