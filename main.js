// Importation des librairies
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'dat.gui'
import { pass } from 'three/examples/jsm/nodes/Nodes.js';


// crée la scene 3D
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
scene.add(Axes)

// Counter
let informations = {
    counter: 0
};

// Initialize les variables
let iterations = 1000;


// Creer l'objet
const color = new THREE.Color(1.,1.,1.);
const Materiel = new THREE.LineBasicMaterial({ color: color, linewidth: 200});
const geometrie = new THREE.BufferGeometry();
const ligne = new THREE.Line(geometrie, Materiel);
scene.add(ligne);


// tableau des positions
let position1 = [0.,0.,0.]; // position initiale
const positions = new Float32Array(iterations * 3)
let i = 0

function animate() {
    if (i < iterations) {
        let position2 = nouveau_point(position1, 4); // ou 4 est le facteur
        positions.set(position1, i * 3);
        positions.set(position2, i * 3);
        position1 = position2

        if (position2 == [0.,0.,0.] || position1 == [0.,0.,0.]) {
            color = THREE.Color(0.5, 0.5, 0.5)
            informations = informations.counter + 1
        }
    
        console.log(informations.counter)
    }

    geometrie.setAttribute( 'position' , new THREE.BufferAttribute( positions, 3 ) );
    i += 1

    canvas.render( scene, camera );
	requestAnimationFrame( animate );
	control.update();
}

function nouveau_point(point1, facteur) {
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

const gui = new GUI()
const ecran = gui.addFolder("marche de L'ISEP")
var passages = ecran.add(informations, 'counter').name("Passages par l'origine")
ecran.open()
setTimeout(function() {
    passages.setValue(informations.counter); // Change the value after 1 second
}, 1000);

control.update();
animate(canvas)