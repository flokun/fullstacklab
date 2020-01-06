import React, {useState, useEffect} from 'react';
import * as d3 from 'd3';
import Navbar from "../../navbar";

const Lineaire = () => {
  const [annee, setAnnee] = useState(2016);

  const [erreur, setErreur] = useState('');

  const [loading, setLoading] = useState(false);

  const [sales, setSales] = useState({});

  const getSalesByRegion = () => {
    setLoading(true);

    fetch(process.env.REACT_APP_API_ENTRYPOINT + '/bien_immobiliers/ventes_regions/' + annee)
      .then(response => response.json())
      .then(regions => {
        if (regions instanceof Object) {
          setSales(Object.assign({}, regions));
          setErreur('');
        } else {
          setErreur(regions);
        }

        setLoading(false);
      });
  };

  const handleChangeAnnee = e => {
    //Supprime l'ancien svg si il y en a un
    let lastSvg = document.querySelector('svg');

    if (lastSvg !== null) {
      lastSvg.parentNode.removeChild(lastSvg);
    }

    if (!loading) {
      setAnnee(e.target.value);
      setSales({});
    }
  };

  const renderGraphique = () => {

  };

  useEffect(() => {
    document.title = 'Ventes par régions en ' + annee;
   // getSalesByRegion();
  }, [annee]);

  return (
    <div>
      <Navbar />

      <div className="container">
        todo
      </div>
    </div>
  );
};

export default Lineaire;
