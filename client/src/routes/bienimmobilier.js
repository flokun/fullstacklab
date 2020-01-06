import React from 'react';
import { Route } from 'react-router-dom';
import { List, Create, Update, Show } from '../components/bienimmobilier/';

export default [
  <Route path="/bien_immobiliers/show/:id" component={Show} exact key="show" />,
  <Route path="/bien_immobiliers/" component={List} exact strict key="list" />,
  <Route path="/bien_immobiliers/:page" component={List} exact strict key="page" />
];
