// Importation des librairies
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'dat.gui'
import { RapierPhysics } from 'three/examples/jsm/Addons.js';

export function sphereObj(scene, rayon) {
    const material = new THREE.MeshPhongMaterial({
        color: new THREE.Color(171,219,227),
        transparent: true,
        opacity: 0.5
    });

    // crée la geometrie du sphere
    const geometrie = new THREE.SphereGeometry(rayon, 64, 64);

    const sphere = new THREE.Mesh(geometrie, material);
    scene.add(sphere);

}