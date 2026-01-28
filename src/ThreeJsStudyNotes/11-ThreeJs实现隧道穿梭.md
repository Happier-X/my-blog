---
cover: https://t.alcy.cc/fj?t=20250418163000
order: 11
date: 2025-04-18 16:30:00
category: 开发
tag: Three.js
excerpt: false
---

# Three.js 实现隧道穿梭

```javascript title="index.js"
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import mesh, { tubePoints } from "./mesh.js";

const scene = new THREE.Scene();

scene.add(mesh);

const pointLight = new THREE.PointLight(0xffffff, 200);
pointLight.position.set(80, 80, 80);
scene.add(pointLight);

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
camera.position.set(200, 200, 200);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);

let i = 0;
function render() {
  if (i < tubePoints.length - 1) {
    camera.position.copy(tubePoints[i]); // 相机位置放到管道中的点上，copy方法用于复制传入点的坐标
    camera.lookAt(tubePoints[i + 1]); // 看向下一个点
    i = i + 1;
  } else {
    i = 0;
  }
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();

document.body.append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
```

```javascript title="mesh.js"
import * as THREE from "three";

const path = new THREE.CatmullRomCurve3([
  new THREE.Vector3(-100, 20, 90),
  new THREE.Vector3(-40, 80, 100),
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(60, -60, 0),
  new THREE.Vector3(100, -40, 80),
  new THREE.Vector3(150, 60, 60),
]);

const geometry = new THREE.TubeGeometry(path, 100, 5, 30);

const loader = new THREE.TextureLoader();
const texture = loader.load("./tube.jpg");
texture.wrapS = THREE.RepeatWrapping;
texture.colorSpace = THREE.SRGBColorSpace;
texture.repeat.x = 20;

const material = new THREE.MeshBasicMaterial({
  map: texture,
  aoMap: texture,
  side: THREE.DoubleSide,
});

const mesh = new THREE.Mesh(geometry, material);

export const tubePoints = path.getSpacedPoints(1000); // 从曲线上获取1000个点

export default mesh;
```

![](https://happier-blog.oss-cn-qingdao.aliyuncs.com/Three.js实现隧道穿梭01.gif)