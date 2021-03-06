import React from 'react';

import 'bootstrap/dist/js/bootstrap.bundle.min';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="#">Fullstack Lab</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="/">Accueil <span className="sr-only">(current)</span></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/bien_immobiliers/">Liste des biens immobilier</a>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
               aria-haspopup="true" aria-expanded="false">
              Graphique
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="/graphiques/circulaire">Diagramme circulaire</a>
              <a className="dropdown-item" href="/graphiques/barres">Diagramme à barres</a>
              <a className="dropdown-item" href="/graphiques/lineaire">Diagramme lineaire</a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  )
};

export default Navbar;
