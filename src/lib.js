import {OrbitControls} from 'https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js'
import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';

// crée la scene 3D
export function init_scene() {
    const scene = new THREE.Scene();
    const canvas = new THREE.WebGLRenderer(); 
    canvas.setSize( window.innerWidth, window.innerHeight ); // modifie la taille de la toile
    document.getElementById("marche").appendChild( canvas.domElement ); // ajoute la toile au document HTML

    // initialize le monde
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 500)
    camera.position.set( 0, -20, -100 );
    camera.lookAt( 0, 0, 0 );

    // En utilisant une sous-librarie Orbit-Controls on peut déplacer la caméra 
    const control = new OrbitControls( camera, canvas.domElement );
    var Axes = new THREE.AxesHelper(20);
    var ambientLight = new THREE.AmbientLight(0x154c79); // Ambient light
    scene.add(Axes)
    scene.add(ambientLight);

    return { scene, canvas, camera, control };
}

export function nouveau_point(point1, facteur) {
    /*
    point: Un tableau sous la forme [x, y, z]
    facteur: Un reel

    La renvoie le point1 suite a un déplacement aléatoire dans les trois dimensions (x, y, z) en utilisant un facteur donné
    Les coordonnées du point initial sont mises à jour en ajoutant le déplacement
    
    (point: Array, facteur: Number) -> Array
    */
    
    let dx = entierAleatoire(-1,1)*facteur
    let dy = entierAleatoire(-1,1)*facteur
    let dz = entierAleatoire(-1,1)*facteur
    
    let deltaPos = [dx, dy, dz];
    let choix = (Math.floor(entierAleatoire(3,1))) - 1

    let point2 = point1
    point2[choix] += deltaPos[choix]
    return point2
}



function entierAleatoire(min, max) {
    /*
    min : borne inferieur (entier relatif)
    max : borne superieur (entier relatif)
    
    Renvoie un entier relatif aléatoire dans l'intervalle [min, max]
    
    (min: Number, max: Number) -> Number
    */

    let difference = max - min;
    let valAleatoire = Math.random();

    valAleatoire = Math.round( valAleatoire * difference);
    valAleatoire = valAleatoire + min;
    return valAleatoire;
}

export function dist(point) {
    return Math.sqrt(point[0]**2+point[1]**2+point[2]**2)
}