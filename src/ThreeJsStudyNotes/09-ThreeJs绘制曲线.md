---
cover: https://t.alcy.cc/fj?t=20250407150000
order: 9
date: 2025-04-07 15:00:00
category: 开发
tag: Three.js
excerpt: false
---

# Three.js 绘制曲线

## EllipseCurve

```javascript title="mesh.js"
import * as THREE from "three";

const arc = new THREE.EllipseCurve(0, 0, 100, 50); // 画一个椭圆曲线，椭圆中心是（0,0），长短轴分别是100和50
const pointsList = arc.getPoints(20); // 取20段，也就是21个点

const geometry = new THREE.BufferGeometry();
geometry.setFromPoints(pointsList); // 将点坐标设置为几何体的顶点

const material = new THREE.PointsMaterial({
  color: new THREE.Color("orange"),
  size: 10,
});

const points = new THREE.Points(geometry, material);

console.log(points.geometry.attributes.position.count); // 21

export default points;
```

可以看到如下效果。

![](https://happier-blog.oss-cn-qingdao.aliyuncs.com/Three.js绘制曲线01.png)

也就是说曲线 API 就是一些计算曲线坐标的公式，从中取出一些点用点模型或者线模型画出来。

使用线模型画一下。

```javascript {9-17} title="mesh.js"
import * as THREE from "three";

const arc = new THREE.EllipseCurve(0, 0, 100, 50); // 画一个椭圆曲线，椭圆中心是（0,0），长短轴分别是100和50
const pointsList = arc.getPoints(20); // 取20段，也就是21个点

const geometry = new THREE.BufferGeometry();
geometry.setFromPoints(pointsList); // 将点坐标设置为几何体的顶点

const material = new THREE.LineBasicMaterial({
  color: new THREE.Color("orange"),
});

const line = new THREE.Line(geometry, material);

console.log(line.geometry.attributes.position.count); // 21

export default line;
```

可以看到如下效果。

![](https://happier-blog.oss-cn-qingdao.aliyuncs.com/Three.js绘制曲线02.png)

也可以指定绘制的角度。

```javascript {3} title="mesh.js"
import * as THREE from "three";

const arc = new THREE.EllipseCurve(0, 0, 100, 100, 0, Math.PI / 2); // 长短轴一样就可以画圆， 弧度范围是0到Math.PI/2
const pointsList = arc.getPoints(20); // 取20段，也就是21个点

const geometry = new THREE.BufferGeometry();
geometry.setFromPoints(pointsList); // 将点坐标设置为几何体的顶点

const material = new THREE.LineBasicMaterial({
  color: new THREE.Color("orange"),
});
const line = new THREE.Line(geometry, material);
console.log(line.geometry.attributes.position.count); // 21
export default line;
```

![](https://happier-blog.oss-cn-qingdao.aliyuncs.com/Three.js绘制曲线03.png)

## SplineCurve

使用 SplineCurve 可以画不规则的曲线。

```javascript title="mesh.js"
import * as THREE from "three";

const arr = [
  new THREE.Vector2(-100, 0),
  new THREE.Vector2(-50, 50),
  new THREE.Vector2(0, 0),
  new THREE.Vector2(50, -50),
  new THREE.Vector2(100, 0),
];
const curve = new THREE.SplineCurve(arr);
const pointsArr = curve.getPoints(20);

const geometry = new THREE.BufferGeometry();
geometry.setFromPoints(pointsArr);

const material = new THREE.LineBasicMaterial({
  color: new THREE.Color("orange"),
});

const line = new THREE.Line(geometry, material);

const pointMaterial = new THREE.PointsMaterial({
  color: new THREE.Color("pink"),
  size: 5,
});

const points = new THREE.Points(geometry, pointMaterial);
line.add(points);

export default line;
```

可以看到如下效果，曲线会经过所有的点。

![](https://happier-blog.oss-cn-qingdao.aliyuncs.com/Three.js绘制曲线04.png)

## QuadraticBezierCurve

如果想自己控制曲率，可以使用贝塞尔曲线。

```javascript title="mesh.js"
import * as THREE from "three";

const p1 = new THREE.Vector2(0, 0);
const p2 = new THREE.Vector2(50, 100); // 第二个点为控制点，通过它来控制曲线的曲率
const p3 = new THREE.Vector2(100, 0);

const curve = new THREE.QuadraticBezierCurve(p1, p2, p3);
const pointsArr = curve.getPoints(20);

const geometry = new THREE.BufferGeometry();
geometry.setFromPoints(pointsArr);

const material = new THREE.LineBasicMaterial({
  color: new THREE.Color("orange"),
});

const line = new THREE.Line(geometry, material);

const geometry2 = new THREE.BufferGeometry();
geometry2.setFromPoints([p1, p2, p3]);
const material2 = new THREE.PointsMaterial({
  color: new THREE.Color("pink"),
  size: 5,
});
const points2 = new THREE.Points(geometry2, material2);
const line2 = new THREE.Line(geometry2, new THREE.LineBasicMaterial());
line.add(points2, line2);

export default line;
```

可以看到如下效果。

![](https://happier-blog.oss-cn-qingdao.aliyuncs.com/Three.js绘制曲线05.png)

## CubicBezierCurve3

二次贝塞尔曲线是在一个平面上弯曲，如果是三次贝塞尔曲线，就是在三维空间内弯曲。

```javascript title="mesh.js"
import * as THREE from "three";

const p1 = new THREE.Vector3(-100, 0, 0);
const p2 = new THREE.Vector3(50, 100, 0); // 中间两个点是控制点
const p3 = new THREE.Vector3(100, 0, 100); // 中间两个点是控制点
const p4 = new THREE.Vector3(100, 0, 0);

const curve = new THREE.CubicBezierCurve3(p1, p2, p3, p4);
const pointsArr = curve.getPoints(20);

const geometry = new THREE.BufferGeometry();
geometry.setFromPoints(pointsArr);

const material = new THREE.LineBasicMaterial({
  color: new THREE.Color("orange"),
});

const line = new THREE.Line(geometry, material);

const geometry2 = new THREE.BufferGeometry();
geometry2.setFromPoints([p1, p2, p3, p4]);
const material2 = new THREE.PointsMaterial({
  color: new THREE.Color("pink"),
  size: 5,
});
const points2 = new THREE.Points(geometry2, material2);
const line2 = new THREE.Line(geometry2, new THREE.LineBasicMaterial());
line.add(points2, line2);

export default line;
```

可以看到如下效果。

![](https://happier-blog.oss-cn-qingdao.aliyuncs.com/Three.js绘制曲线06.gif)

## CurvePath

有的时候，一条曲线可能是由多条曲线复合而成的，如果你想组合多条曲线，就可以用 CurvePath。

```javascript title="mesh.js"
import * as THREE from "three";

const p1 = new THREE.Vector2(0, 0);
const p2 = new THREE.Vector2(50, 50);
const line1 = new THREE.LineCurve(p1, p2);

const arc = new THREE.EllipseCurve(0, 50, 50, 50, 0, Math.PI);

const p3 = new THREE.Vector2(-50, 50);
const p4 = new THREE.Vector2(0, 0);
const line2 = new THREE.LineCurve(p3, p4);

const curvePath = new THREE.CurvePath();
curvePath.add(line1);
curvePath.add(arc);
curvePath.add(line2);

const pointsArr = curvePath.getPoints(20);
const geometry = new THREE.BufferGeometry();
geometry.setFromPoints(pointsArr);

const material = new THREE.LineBasicMaterial({
  color: new THREE.Color("pink"),
});

const line = new THREE.Line(geometry, material);

export default line;
```

可以看到如下效果。

![](https://happier-blog.oss-cn-qingdao.aliyuncs.com/Three.js绘制曲线07.png)