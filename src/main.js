// Importation des librairies
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'dat.gui';
import { sphereObj } from "./sphere.js";
import { distance, sqrt } from 'three/examples/jsm/nodes/Nodes.js';

// 
// INITIALISATION
// 
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
const ambientLight = new THREE.AmbientLight(0x154c79); // Ambient light
scene.add(ambientLight);

// Counter
let informations = {
    posx:0,
    posy:0,
    posz:0,
    pas:0,
};
const gui = new GUI()
const ecran = gui.addFolder("marche de L'ISEP")

// variables
var px = ecran.add(informations, 'posx').name("position X: ")
var py = ecran.add(informations, 'posy').name("position Y: ")
var pz = ecran.add(informations, 'posz').name("position Z: ")
var pas = ecran.add(informations, 'pas').name("pas")
ecran.open()

// Initialize les variables
let iterations = 2000
// Creer l'objet
const color = new THREE.Color(1.,1.,1.);
const Materiel = new THREE.LineBasicMaterial({ color: color, linewidth: 200});
const geometrie = new THREE.BufferGeometry();
const ligne = new THREE.Line(geometrie, Materiel);

sphereObj(scene, 10)
scene.add(ligne);

// tableau des positions
let position1 = [0.,0.,0.]; // position initiale
let positions = new Float32Array(iterations * 3)

let i = 0
function animate() {
    marche(positions, position1)
    setTimeout(function() {
        px.setValue(informations.posx); 
        py.setValue(informations.posy); 
        pz.setValue(informations.posz);
        pas.setValue(i)
    }, 1000);
    
    canvas.render( scene, camera );
	requestAnimationFrame( animate );
	control.update();
}

function marche(positions, position1) {
    if (i < iterations) {
        positions.set(position1, 0);
        let position2 = nouveau_point(position1, 4); // ou 4 est le facteur
        // positions.set(position1, i * 3);
        positions.set(position2, (i * 3));
        position1 = position2.slice(); // copie le vecteur position1

        informations.posx = position2[0]
        informations.posy = position2[1]
        informations.posz = position2[2]
    }
    
    geometrie.setAttribute( 'position' , new THREE.BufferAttribute( positions, 3 ) );
    geometrie.attributes.position.needsUpdate = true;
    i += 1

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



function dist(x,y,z) {
    return sqrt(x^2+y^2+z^2)
}
control.update();
animate(canvas)