// Importation des librairies
import * as THREE from 'three';
import { GUI } from 'dat.gui';
import { sphereObj } from "./sphere.js";
import { nouveau_point, dist, init_scene } from './lib.js';

// 
// Initialisation
// 

// Initialisation des variables
const seuil = 40; // seuil de distance pour arrêter la marche
const pasMax = 800; // nombre maximum de pas
const epaisseur = 4; // épaisseur des segments de la marche

// Initialisation de la scène, de la caméra et des contrôles
const { scene, canvas, camera, control } = init_scene();
sphereObj(scene, seuil + 1); // ajout de la sphère à la scène

// Initialisation des informations pour l'interface graphique (GUI)
let informations = {
    posx: 0, // position x actuelle
    posy: 0, // position y actuelle
    posz: 0, // position z actuelle
    pas: 0, // nombre de pas effectués 
};

// Configuration de l'interface graphique (GUI)
const gui = new GUI();
const ecran = gui.addFolder('Marche Aléatoire');
const simule = { add: function() { location.reload(); }};
ecran.add(simule, 'add').name('Recommencer la Simulation');

// Variables GUI pour afficher les positions et le nombre de pas
var px = ecran.add(informations, 'posx').name("Position X: ")
var py = ecran.add(informations, 'posy').name("Position Y: ")
var pz = ecran.add(informations, 'posz').name("Position Z: ")
var pas = ecran.add(informations, 'pas').name("Pas")
ecran.open()



// 
// Scéne
// 

// Création du matériau pour les lignes de la marche
const color = new THREE.Color(0.9, 0.9, 0.9);
const materiel = new THREE.LineBasicMaterial({ color: color, linewidth: 200 });

// Tableau des positions pour stocker les points de la marche
let position1 = [0, 0, 0]; // position initiale
let position2 = nouveau_point(position1, epaisseur); // première nouvelle position
let positions = new Float32Array(pasMax * 3); // tableau pour toutes les positions
positions.set(position1, 0); // définir la position initiale

let i = 0; // compteur de pas

// Fonction d'animation pour simuler la marche aléatoire
function animate() {
    if (i < pasMax) {
        position2 = nouveau_point(position1, epaisseur); // générer une nouvelle position

        // Vérifier si la nouvelle position est à l'intérieur du seuil
        if (dist(position2) < seuil) {
            // Vérifier si nous pouvons encore ajouter des positions au tableau
            if ((i + 1) * 3 < positions.length) {
                positions.set(position2, (i + 1) * 3); // ajouter la nouvelle position au tableau

                // Créer la géométrie et la ligne pour la nouvelle position
                const geometrie = new THREE.BufferGeometry();
                geometrie.setAttribute('position', new THREE.BufferAttribute(positions.slice(0, (i + 1) * 3), 3));
                geometrie.attributes.position.needsUpdate = true;

                const ligne = new THREE.Line(geometrie, materiel); // créer la ligne avec le matériau
                scene.add(ligne); // ajouter la ligne à la scène

                position1 = position2.slice(); // mettre à jour position1

                // Mise à jour des informations pour l'interface graphique (GUI)
                informations.posx = position2[0];
                informations.posy = position2[1];
                informations.posz = position2[2];
                i += 1; // incrémenter le compteur de pas
            }
        }
    }

    // Mise à jour de l'interface graphique (GUI) avec les nouvelles valeurs
    setTimeout(function() {
        px.setValue(informations.posx); 
        py.setValue(informations.posy); 
        pz.setValue(informations.posz);
        pas.setValue(i)
    }, 1000);
    
    // Rendu de la scène
    canvas.render( scene, camera );
	requestAnimationFrame( animate );
	control.update();
}

// Démarrage des contrôles et de l'animation
control.update();
animate(canvas)