import React, {useState, useEffect} from 'react';
import * as d3 from 'd3';
import Navbar from "../../navbar";

const Lineaire = () => {
  const [typeBien, setTypeBien] = useState(1);

  const [erreur, setErreur] = useState('');

  const [loading, setLoading] = useState(false);

  const [sales, setSales] = useState({});

  const getPrixByMonth = () => {
    setLoading(true);

    fetch(process.env.REACT_APP_API_ENTRYPOINT + '/bien_immobiliers/priceByMonthYear/' + typeBien)
      .then(response => response.json())
      .then(prix => {
        if (prix instanceof Object) {
          setSales(Object.assign({}, prix));
          setErreur('');
        } else {
          setErreur(prix);
        }

        setLoading(false);
      });
  };

  const handleChangeTypeBien = e => {
    //Supprime l'ancien svg si il y en a un
    let lastSvg = document.querySelector('svg');

    if (lastSvg !== null) {
      lastSvg.parentNode.removeChild(lastSvg);
    }

    if (!loading) {
      setTypeBien(e.target.value);
      setSales({});
    }
  };

  const renderGraphique = () => {

  };

  useEffect(() => {
    document.title = 'Ventes prix du m²';
    getPrixByMonth();
  }, [typeBien]);

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
