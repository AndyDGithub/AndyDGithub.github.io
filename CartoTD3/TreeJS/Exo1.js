import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Créez une scène + caméra + light + renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 5;

let pinecone;

// Télécharger un objet 3D
const loader = new GLTFLoader();
loader.load('/CartoTD3/pine-cone-2-3d-model/scene.gltf', function (gltf) {
    pinecone = gltf.scene; 
    scene.add(pinecone);
    camera.position.set(0, 0, 25); // Positionner la caméra
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Lumière ambiante douce
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Lumière directionnelle
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);
    
}, undefined, function (error) {
    console.error(error);
});

// Fonction pour mettre à jour la rotation en fonction de l'orientation du téléphone
function handleOrientation(event) {
  const alpha = event.alpha; // Rotation autour de l'axe Z
  const beta = event.beta;   // Rotation autour de l'axe X
  const gamma = event.gamma; // Rotation autour de l'axe Y

  if (pinecone) {
    // Appliquer la rotation du téléphone au modèle
    pinecone.rotation.x = THREE.MathUtils.degToRad(beta);
    pinecone.rotation.y = THREE.MathUtils.degToRad(gamma);
    pinecone.rotation.z = THREE.MathUtils.degToRad(alpha);
  }
}

// Ajouter l'événement listener pour l'orientation du téléphone
if (window.DeviceOrientationEvent) {
  window.addEventListener('deviceorientation', handleOrientation, true);
}

// Boucle d'animation
const animate = function () {
  requestAnimationFrame(animate);

  // Rendu de la scène
  renderer.render(scene, camera);
};

animate();
