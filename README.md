# FullStack Lab [![pipeline status](https://travis-ci.org/flokun/fullstacklab.svg?branch=master)](https://travis-ci.org/flokun/fullstacklab) [![codecov](https://codecov.io/gh/flokun/fullstacklab/branch/master/graph/badge.svg)](https://codecov.io/gh/flokun/fullstacklab)

- Année : M2 IWOCS
- Matière: WEB
- TP : n°4

## Auteur(s)

|Nom|Prénom|login|email|
|--|--|--|--|
| Duflo | Raphaël | dr150837 | raphael.duflo@etu.univ-lehavre.fr |
| Joublin | Antoine | pa151510 | antoine.prevost@etu.univ-lehavre.fr |
| Lambour | Anthony | la150040 | anthony.lambour@etu.univ-lehavre.fr |
| Ramos | Corentin | rc150846 | corentin.ramos@etu.univ-lehavre.fr |
| Val | Florent | vf150232 | florent.val@etu.univ-lehavre.fr |

## Travail à réaliser

Détail du tp : <https://pigne.org/teaching/webdev2/lab/FullStackLab>

## Installation

1. Installer les dépendances et l'environnement Docker

        docker-compose up -d
        
2. Créer un dossier *resources* dans api/
3. Télécharger et déplacer les fichiers .txt dans api/resources
4. Ouvrir un terminal à la racine du projet et exécuter la commande ci-dessous

        docker-compose exec php bin/console doctrine:fixtures:load

## Tests

(...)
