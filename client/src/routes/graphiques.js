import React from 'react';
import { Route } from 'react-router-dom';
import Circulaire from '../components/graphiques/circulaire/index';

export default [
  <Route path="/graphiques/circulaire" component={Circulaire} exact key="circulaire" />,
  //TODO: Les deux autres routes pour les autres graphiques (série temporelle et diagramme à barre)
];
