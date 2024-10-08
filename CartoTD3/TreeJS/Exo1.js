import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

//  Créez une scène + caméra + light + renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Créez un objet générique (sphère ou cube)
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Texturez cet objet
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 5;

let pinecone;

// Télécharger un objet 3D
const loader = new GLTFLoader();
loader.load( '../pine-cone-2-3d-model/scene.gltf', function (gltf) {
    pinecone = gltf.scene; 
    scene.add(gltf.scene);
    camera.position.set(0, 0, 15); // Recule un peu la caméra
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Lumière ambiante douce
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Lumière directionnelle
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);
    
}, undefined, function (error) {
    console.error(error);
});
  

const animate = function () {
  requestAnimationFrame(animate);
  pinecone.rotation.x += 0.01;
  pinecone.rotation.y += 0.01;
  renderer.render(scene, camera);
};

animate();
