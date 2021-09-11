import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';

import { OrbitControls } from "https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer(
    {canvas: document.querySelector('#bg')}
);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera)

const geometry = new THREE.DodecahedronGeometry(10);
const material = new THREE.MeshStandardMaterial({color: 0xFF6347});
const dodecahedron = new THREE.Mesh( geometry, material );


scene.add(dodecahedron)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(10,10,10)

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function multiplyOranges() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({color: 0xFF6347});
    const orange = new THREE.Mesh( geometry, material );

    const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
    orange.position.set(x,y,z);
    scene.add(orange)
}

Array(200).fill().forEach(multiplyOranges)

const backgroundTexture = new THREE.TextureLoader().load('background.jpg');
scene.background = backgroundTexture;

function animate() {
    requestAnimationFrame( animate );

    dodecahedron.rotation.x += 0.01;
    dodecahedron.rotation.y +=0.005;
    dodecahedron.rotation.z +=0.01;

    controls.update();

    renderer.render( scene, camera);
}

animate()