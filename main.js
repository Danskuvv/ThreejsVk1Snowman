import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; // Enable shadow maps
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

// Add an axis helper
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// Add a light source
const light = new THREE.PointLight(0xffffff, 200, 100);
light.position.set(0, 10, 0);
light.castShadow = true; // Enable shadows for the light
scene.add(light);

// add a point light to the side
const light2 = new THREE.PointLight(0xded799, 50, 100);
light2.position.set(0, 2, 10);
light2.castShadow = true; // Enable shadows for the light
scene.add(light2);

// add a point light to the side
const light3 = new THREE.PointLight(0xded799, 50, 100);
light3.position.set(0, 2, -10);
light3.castShadow = true; // Enable shadows for the light
scene.add(light3);

// add a point light to the side
const light4 = new THREE.PointLight(0xded799, 50, 100);
light4.position.set(10, 2, 0);
light4.castShadow = true; // Enable shadows for the light
scene.add(light4);

// add a point light to the side
const light5 = new THREE.PointLight(0xded799, 50, 100);
light5.position.set(-10, 2, 0);
light5.castShadow = true; // Enable shadows for the light
scene.add(light5);

// Add ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

//controls.update() must be called after any manual changes to the camera's transform
camera.position.set(0, 20, 100);
controls.update();

// Create the floor
const floorGeometry = new THREE.PlaneGeometry(30, 30);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xc5dfe0 });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2; // Rotate the floor to be horizontal
floor.position.y = -2; // Position the floor under the cube
floor.receiveShadow = true; // Enable shadow receiving for the floor
scene.add(floor);

// Create the snowman
const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
const wireframeMaterial = new THREE.MeshBasicMaterial({
  color: 0x000000,
  wireframe: true,
});

// Bottom sphere
const bottomSphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const bottomSphere = new THREE.Mesh(bottomSphereGeometry, bodyMaterial);
bottomSphere.position.y = -1; // Position the bottom sphere
bottomSphere.castShadow = true;
scene.add(bottomSphere);

const bottomSphereWireframe = new THREE.Mesh(
  bottomSphereGeometry,
  wireframeMaterial
);
bottomSphereWireframe.position.y = -1;
bottomSphereWireframe.position.x = 2; // Move the wireframe version to the right
scene.add(bottomSphereWireframe);

// Middle sphere
const middleSphereGeometry = new THREE.SphereGeometry(0.75, 32, 32);
const middleSphere = new THREE.Mesh(middleSphereGeometry, bodyMaterial);
middleSphere.position.y = 0.25; // Position the middle sphere
middleSphere.castShadow = true;
scene.add(middleSphere);

const middleSphereWireframe = new THREE.Mesh(
  middleSphereGeometry,
  wireframeMaterial
);
middleSphereWireframe.position.y = 0.25;
middleSphereWireframe.position.x = 2; // Move the wireframe version to the right
scene.add(middleSphereWireframe);

// Top sphere
const topSphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const topSphere = new THREE.Mesh(topSphereGeometry, bodyMaterial);
topSphere.position.y = 1.25; // Position the top sphere
topSphere.castShadow = true;
scene.add(topSphere);

const topSphereWireframe = new THREE.Mesh(topSphereGeometry, wireframeMaterial);
topSphereWireframe.position.y = 1.25;
topSphereWireframe.position.x = 2; // Move the wireframe version to the right
scene.add(topSphereWireframe);

// Create eyes
const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
const eyeGeometry = new THREE.SphereGeometry(0.05, 32, 32);

const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
leftEye.position.set(-0.1, 1.35, 0.45); // Position the left eye
scene.add(leftEye);

const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
rightEye.position.set(0.1, 1.35, 0.45); // Position the right eye
scene.add(rightEye);

// Create nose
const noseMaterial = new THREE.MeshStandardMaterial({ color: 0xffa500 });
const noseGeometry = new THREE.ConeGeometry(0.05, 0.2, 32);

const nose = new THREE.Mesh(noseGeometry, noseMaterial);
nose.position.set(0, 1.25, 0.5); // Position the nose
nose.rotation.x = Math.PI / 2; // Rotate the nose to point outward
// Change the scale of the nose
nose.scale.set(3, 4.5, 3); // Scale the nose (x, y, z)

scene.add(nose);

camera.position.z = 5;

function animate() {
  // required if controls.enableDamping or controls.autoRotate are set to true
  controls.update();

  renderer.render(scene, camera);
}
