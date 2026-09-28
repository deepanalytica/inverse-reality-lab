import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.167.1/build/three.module.js";

const canvas = document.getElementById("decision-lattice");
const host = canvas?.closest("[data-atlas]");
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const narrow = matchMedia("(max-width: 760px)").matches;

if (canvas && host && !reduce && !narrow && "WebGLRenderingContext" in window) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 0, 10);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.setClearColor(0x000000, 0);

  const group = new THREE.Group();
  scene.add(group);

  const positions = [
    [-3.3, 1.7, 0.2],[-1.5, 2.0,-.7],[.3,1.55,.4],[2.3,2.1,-.5],[3.3,.7,.6],
    [-2.6,.0,-.4],[-.8,.5,.7],[1.2,.2,-.3],[2.8,-.4,.5],
    [-2.0,-1.7,.4],[.1,-1.4,-.6],[2.0,-1.8,.2],
    [-.1,-2.8,.3]
  ];

  const pointGeometry = new THREE.BufferGeometry().setFromPoints(positions.map(p => new THREE.Vector3(...p)));
  const pointMaterial = new THREE.PointsMaterial({ color:0xd8ff5f, size:.085, transparent:true, opacity:.72, sizeAttenuation:true });
  const points = new THREE.Points(pointGeometry, pointMaterial);
  group.add(points);

  const edges = [
    [0,1],[1,2],[2,3],[3,4],[0,5],[1,6],[2,6],[2,7],[3,7],[4,8],[5,6],[6,7],[7,8],
    [5,9],[6,9],[6,10],[7,10],[7,11],[8,11],[9,10],[10,11],[9,12],[10,12],[11,12]
  ];
  const lineVerts = [];
  edges.forEach(([a,b]) => lineVerts.push(...positions[a], ...positions[b]));
  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(lineVerts, 3));
  const lineMaterial = new THREE.LineBasicMaterial({ color:0x65cfff, transparent:true, opacity:.18 });
  group.add(new THREE.LineSegments(lineGeometry, lineMaterial));

  const ringMaterial = new THREE.LineBasicMaterial({ color:0xe4674f, transparent:true, opacity:.22 });
  [1.45,2.5,3.55].forEach((radius,index) => {
    const curve = new THREE.EllipseCurve(0,0,radius,radius*.58,0,Math.PI*2,false,index*.12);
    const ring = new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(96)), ringMaterial);
    ring.rotation.x = .82 + index*.08;
    ring.rotation.z = .18 * index;
    ring.position.z = -.4 - index*.18;
    group.add(ring);
  });

  let pointerX = 0;
  let pointerY = 0;
  let active = true;
  host.addEventListener("pointermove", (event) => {
    const rect = host.getBoundingClientRect();
    pointerX = ((event.clientX - rect.left) / rect.width - .5) * .35;
    pointerY = ((event.clientY - rect.top) / rect.height - .5) * .24;
  }, { passive:true });

  const observer = new IntersectionObserver((entries) => {
    active = entries[0]?.isIntersecting ?? true;
  }, { threshold:.05 });
  observer.observe(host);

  const resize = () => {
    const { width, height } = host.getBoundingClientRect();
    renderer.setSize(width, height, false);
    camera.aspect = width / Math.max(height, 1);
    camera.updateProjectionMatrix();
  };
  new ResizeObserver(resize).observe(host);
  resize();

  const clock = new THREE.Clock();
  const render = () => {
    requestAnimationFrame(render);
    if (!active) return;
    const t = clock.getElapsedTime();
    group.rotation.y += (pointerX - group.rotation.y) * .025;
    group.rotation.x += (-pointerY - group.rotation.x) * .025;
    group.rotation.z = Math.sin(t*.18) * .035;
    points.material.opacity = .62 + Math.sin(t*.7) * .09;
    renderer.render(scene, camera);
  };
  render();
}