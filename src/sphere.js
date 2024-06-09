// Importation des librairies
import * as THREE from 'three';
export function sphereObj(scene, rayon) {
    const material = new THREE.MeshPhongMaterial({
        color: new THREE.Color(171,171,171),
        transparent: true,
        opacity: 0.15
    });

    // crée la geometrie du sphere
    const geometrie = new THREE.SphereGeometry(rayon, 64, 64);

    const sphere = new THREE.Mesh(geometrie, material);
    scene.add(sphere);
}