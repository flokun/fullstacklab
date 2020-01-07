import React from 'react';
import { Route } from 'react-router-dom';
import {Circulaire} from '../components/graphiques/circulaire/index';
import Lineaire from "../components/graphiques/lineaire";
import Barres from '../components/graphiques/barres/index';

export default [
  <Route path="/graphiques/circulaire" component={Circulaire} exact key="circulaire" />,
  <Route path="/graphiques/lineaire" component={Lineaire} exact key="lineaire" />,
  <Route path="/graphiques/barres" component={Barres} exact key="barres" />
];
