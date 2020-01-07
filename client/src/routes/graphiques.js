import React from 'react';
import { Route } from 'react-router-dom';
import Circulaire from '../components/graphiques/circulaire/index';
import Barres from '../components/graphiques/barres/index';

export default [
  <Route path="/graphiques/circulaire" component={Circulaire} exact key="circulaire" />,
  <Route path="/graphiques/barres" component={Barres} exact key="barres" />,
  //TODO: Les deux autres routes pour les autres graphiques (série temporelle et diagramme à barre)
];
