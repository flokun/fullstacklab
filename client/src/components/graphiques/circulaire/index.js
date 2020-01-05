import React, {useState, useEffect} from 'react';
import * as d3 from 'd3';

const Circulaire = () => {
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

  const handleChangeAnee = e => {
    //Supprime l'ancien svg si il y en a un
    let lastSvg = document.querySelector('svg');

    if (lastSvg !== null) {
      lastSvg.parentNode.removeChild(lastSvg);
    }

    setAnnee(e.target.value);
    setSales({});
  };

  //TODO: à améliorer pour le centrage des divs, les noms qui sont superposés par moment et ajouter des couleurs
  const renderGraphique = () => {
    let width = 1000;
    let height = 500;
    let margin = 60;

    //The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    let radius = Math.min(width, height) / 2 - margin;

    //append the svg object to the div called 'my_dataviz'
    let svg = d3.select("body")
      .append("svg")
      .attr("width", document.body.clientWidth)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 1.5 + "," + height / 2 + ")");

    //Create dummy data
    let data = sales;

    //set the color scale
    let color = d3.scaleOrdinal()
      .domain(Object.keys(sales));
    //.range(d3.schemeDark2);

    //Compute the position of each group on the pie:
    let pie = d3.pie()
      .sort(null) // Do not sort group by size
      .value(function (d) {
        return d.value;
      });
    let data_ready = pie(d3.entries(data));

    //The arc generator
    let arc = d3.arc()
      .innerRadius(radius * 0.5)         // This is the size of the donut hole
      .outerRadius(radius * 0.8);

    //Another arc that won't be drawn. Just for labels positioning
    let outerArc = d3.arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9);

    //Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
      .selectAll('allSlices')
      .data(data_ready)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', function (d) {
        return (color(d.data.key))
      })
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .style("opacity", 0.7);

    //Add the polylines between chart and labels:
    svg
      .selectAll('allPolylines')
      .data(data_ready)
      .enter()
      .append('polyline')
      .attr("stroke", "black")
      .style("fill", "none")
      .attr("stroke-width", 1)
      .attr('points', function (d) {
        let posA = arc.centroid(d); // line insertion in the slice
        let posB = outerArc.centroid(d); // line break: we use the other arc generator that has been built only for that
        let posC = outerArc.centroid(d); // Label position = almost the same as posB
        let midangle = d.startAngle + (d.endAngle - d.startAngle) / 2; // we need the angle to see if the X position will be at the extreme right or extreme left
        posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
        return [posA, posB, posC]
      });

    //Add the polylines between chart and labels:
    svg
      .selectAll('allLabels')
      .data(data_ready)
      .enter()
      .append('text')
      .text(function (d) {
        //console.log(d.data.key);
        return d.data.key + "(" + d.data.value + " %)";
      })
      .attr('transform', function (d) {
        let pos = outerArc.centroid(d);
        let midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
        return 'translate(' + pos + ')';
      })
      .style('text-anchor', function (d) {
        let midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        return (midangle < Math.PI ? 'start' : 'end')
      })
  };

  useEffect(() => {
    document.title = 'Ventes par régions en ' + annee;
    getSalesByRegion();
  }, [annee]);

  return (
    <div className="container">
      {loading && <h1>Chargement....</h1>}

      {!loading && erreur === '' && Object.entries(sales).length > 0 && renderGraphique()}

      <h1>Année : {annee}</h1>

      <input type="number" min="2015" max="2019" defaultValue="2016" onChange={handleChangeAnee} disabled={loading}/>

      {!loading && Object.entries(sales).length === 0 && erreur === '' && <p>Pas de données disponible pour cette date.</p> }

      {!loading && erreur !== '' && <h3>{erreur}</h3>}
    </div>
  );
};

export default Circulaire;
