---
cover: https://t.alcy.cc/fj?t=20250418153000
order: 10
date: 2025-04-18 15:30:00
category: 开发
tag: Three.js
excerpt: false
---

# Three.js 按规律生成几何体

按照顶点坐标生成几何体的方式太原始了，我们可以按规律生成几何体。

## LatheGeometry

LatheGeometry 是一个旋转成型的几何体。

```javascript title="mesh.js"
import * as THREE from "three";

const pointsArr = [
  new THREE.Vector2(0, 0),
  new THREE.Vector2(50, 50),
  new THREE.Vector2(20, 80),
  new THREE.Vector2(0, 150),
];

const geometry = new THREE.LatheGeometry(pointsArr);

const material = new THREE.MeshLambertMaterial({
  color: new THREE.Color("pink"),
  side: THREE.DoubleSide,
});

const mesh = new THREE.Mesh(geometry, material);

const geometry2 = new THREE.BufferGeometry();
geometry2.setFromPoints(pointsArr);
const material2 = new THREE.PointsMaterial({
  color: new THREE.Color("blue"),
  size: 10,
});
const points2 = new THREE.Points(geometry2, material2);
const line2 = new THREE.Line(geometry2, new THREE.LineBasicMaterial());
mesh.add(points2, line2);

export default mesh;
```

这里我们创建了四个点，让它用这条曲线绕 y 轴旋转一周，生成一个几何体。

同时用点和线展示了这四个点和形成的曲线。

可以看到如下效果。

![](https://happier-blog.oss-cn-qingdao.aliyuncs.com/Three.js按规律生成几何体01.png)

可以在第二个参数中设置旋转的分段数。

```javascript {10} title="mesh.js"
import * as THREE from "three";

const pointsArr = [
  new THREE.Vector2(0, 0),
  new THREE.Vector2(50, 50),
  new THREE.Vector2(20, 80),
  new THREE.Vector2(0, 150),
];

const geometry = new THREE.LatheGeometry(pointsArr, 5);

const material = new THREE.MeshLambertMaterial({
  color: new THREE.Color("pink"),
  side: THREE.DoubleSide,
});

const mesh = new THREE.Mesh(geometry, material);

const geometry2 = new THREE.BufferGeometry();
geometry2.setFromPoints(pointsArr);
const material2 = new THREE.PointsMaterial({
  color: new THREE.Color("blue"),
  size: 10,
});
const points2 = new THREE.Points(geometry2, material2);
const line2 = new THREE.Line(geometry2, new THREE.LineBasicMaterial());
mesh.add(points2, line2);

export default mesh;
```

这样就不会很圆了。

![](https://happier-blog.oss-cn-qingdao.aliyuncs.com/Three.js按规律生成几何体02.png)

## TubeGeometry

TubeGeometry 是一个管道几何体。

```javascript title="mesh.js"
import * as THREE from "three";

const p1 = new THREE.Vector3(-100, 0, 0);
const p2 = new THREE.Vector3(50, 100, 0);
const p3 = new THREE.Vector3(100, 0, 100);
const p4 = new THREE.Vector3(100, 0, 0);

const curve = new THREE.CubicBezierCurve3(p1, p2, p3, p4);

const geometry = new THREE.TubeGeometry(curve, 50, 20, 20); // 后面的参数分别代表管道的分段数、半径、圆的分段数

const material = new THREE.MeshLambertMaterial({
  color: new THREE.Color("orange"),
  side: THREE.DoubleSide,
  wireframe: true,
});

const mesh = new THREE.Mesh(geometry, material);

const geometry2 = new THREE.BufferGeometry();
geometry2.setFromPoints([p1, p2, p3, p4]);
const material2 = new THREE.PointsMaterial({
  color: new THREE.Color("blue"),
  size: 10,
});
const points2 = new THREE.Points(geometry2, material2);
const line2 = new THREE.Line(geometry2, new THREE.LineBasicMaterial());
mesh.add(points2, line2);

export default mesh;
```

可以看到如下效果。

![](https://happier-blog.oss-cn-qingdao.aliyuncs.com/Three.js按规律生成几何体03.png)

## Shape 和 ShapeGeometry

可以通过 Shape 定义多边形。

```javascript title="mesh.js"
import * as THREE from "three";

const pointsArr = [
  new THREE.Vector2(100, 0),
  new THREE.Vector2(50, 20),
  new THREE.Vector2(0, 0),
  new THREE.Vector2(0, 50),
  new THREE.Vector2(50, 100),
];

const shape = new THREE.Shape(pointsArr);

const geometry = new THREE.ShapeGeometry(shape);
const material = new THREE.MeshLambertMaterial({
  color: new THREE.Color("lightgreen"),
});

const mesh = new THREE.Mesh(geometry, material);

export default mesh;
```

五个点定义了一个多边形，然后用 ShapeGeometry 生成了一个几何体。

![](https://happier-blog.oss-cn-qingdao.aliyuncs.com/Three.js按规律生成几何体04.png)

除了传入点，还有如下方式。

```javascript {3-16} title="mesh.js"
import * as THREE from "three";

// const pointsArr = [
//   new THREE.Vector2(100, 0),
//   new THREE.Vector2(50, 20),
//   new THREE.Vector2(0, 0),
//   new THREE.Vector2(0, 50),
//   new THREE.Vector2(50, 100),
// ];

// const shape = new THREE.Shape(pointsArr);
const shape = new THREE.Shape();
shape.moveTo(100, 0);
shape.lineTo(0, 0);
shape.lineTo(0, 50);
shape.lineTo(80, 100);

const geometry = new THREE.ShapeGeometry(shape);
const material = new THREE.MeshLambertMaterial({
  color: new THREE.Color("lightgreen"),
});

const mesh = new THREE.Mesh(geometry, material);

export default mesh;
```

![](https://happier-blog.oss-cn-qingdao.aliyuncs.com/Three.js按规律生成几何体05.png)

也可以在上面挖孔。

```javascript {9-11} title="mesh.js"
import * as THREE from "three";

const shape = new THREE.Shape();
shape.moveTo(100, 0);
shape.lineTo(0, 0);
shape.lineTo(0, 50);
shape.lineTo(80, 100);

const path = new THREE.Path();
path.arc(50, 50, 10);
shape.holes.push(path);

const geometry = new THREE.ShapeGeometry(shape);
const material = new THREE.MeshLambertMaterial({
  color: new THREE.Color("lightgreen"),
});

const mesh = new THREE.Mesh(geometry, material);

export default mesh;
```

![](https://happier-blog.oss-cn-qingdao.aliyuncs.com/Three.js按规律生成几何体06.png)

## Shape 和 ExtrudeGeometry

有了多边形以后可以在某个方向拉伸一下，就可以生成一个新的几何体了。

```javascript {13-16} title="mesh.js"
import * as THREE from "three";

const shape = new THREE.Shape();
shape.moveTo(100, 0);
shape.lineTo(0, 0);
shape.lineTo(0, 50);
shape.lineTo(80, 100);

const path = new THREE.Path();
path.arc(50, 50, 10);
shape.holes.push(path);

// const geometry = new THREE.ShapeGeometry(shape);
const geometry = new THREE.ExtrudeGeometry(shape, {
  depth: 100,
});
const material = new THREE.MeshLambertMaterial({
  color: new THREE.Color("lightgreen"),
});

const mesh = new THREE.Mesh(geometry, material);

export default mesh;
```

![](https://happier-blog.oss-cn-qingdao.aliyuncs.com/Three.js按规律生成几何体07.png)