import React from 'react';
import { Route } from 'react-router-dom';
import Circulaire from '../components/graphiques/circulaire/index';
import Lineaire from "../components/graphiques/lineaire";

export default [
  <Route path="/graphiques/circulaire" component={Circulaire} exact key="circulaire" />,
  <Route path="/graphiques/lineaire" component={Lineaire} exact key="lineaire" />,
  //TODO: Les deux autres routes pour les autres graphiques (série temporelle et diagramme à barre)
];
