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
    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 100, bottom: 30, left: 30},
      width = 800 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;
    const parseTime = d3.timeParse("%Y-%m-%d %H:%M:%S");

    var Color = {
      "MaisonStroke" : "#2471a3",
      "MaisonFill" : "#2e86c1",
      "AppartementStroke" : "#1e8449",
      "AppartementFill" : "#28b463"
    }
// append the svg object to the body of the page
    var svg = d3.select("body")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

//Read the data
    d3.json(process.env.REACT_APP_API_ENTRYPOINT + '/bien_immobiliers/priceByMonthYear/', function(data) {
      // List of groups (here I have one group per column)
      var allGroup = ["Maison", "Appartement"];


      data.forEach(function(d) {
        d.time = parseTime(d.time);
        d.Maison = +d.Maison;
        d.Appartement = +d.Appartement;
      });

      // add the options to the button
      d3.select("#selectButton")
        .selectAll('myOptions')
        .data(allGroup)
        .enter()
        .append('option')
        .text(function (d) { return d; }) // text showed in the menu
        .attr("value", function (d) { return d; }); // corresponding value returned by the button

      // Add X axis
      var x = d3.scaleTime()
        .range([ 0, width ])
        .domain(d3.extent(data, function(d) { return d.time; }));
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

      // Add Y axis
      var y = d3.scaleLinear()
        .domain( [0,d3.max(data, function (d) { return d.Maison;})])
        .range([ height, 0 ]);
      svg.append("g")
        .attr("class", "yaxis")
        .call(d3.axisLeft(y));



      // Initialize line with group a
      var line = svg
        .append("path")
        .datum(data)
        .attr("d", d3.area()
          .x(function(d) { return x(d.time) })
          .y0(y(0))
          .y1(function(d) { return y(d.Maison) })
        )
        .attr("fill", Color["MaisonFill"])
        .attr("stroke", Color["MaisonStroke"])
        .style("stroke-width", 1.5);

      // A function that update the chart
      function update(selectedGroup) {

        // Create new data with the selection?
        var dataFilter = data.map(function(d){return {time: d.time, value:d[selectedGroup]} });

        y.domain( [0,d3.max(dataFilter, function (d) { return d.value;})])
          .range([ height, 0 ]);

        console.log(y);
        svg.select(".yaxis")
          .call(d3.axisLeft(y));
        // Give these new data to update line
        line
          .datum(dataFilter)
          .attr("d", d3.area()
            .x(function(d) { return x(d.time) })
            .y0(y(0))
            .y1(function(d) { return y(d.value) })
          )
          .attr("fill", Color[selectedGroup + "Fill"])
          .attr("stroke", Color[selectedGroup + "Stroke"])
          .style("stroke-width", 1.5);
      }
      // When the button is changed, run the updateChart function
      d3.select("#selectButton").on("change", function(d) {
        // recover the option that has been chosen
        var selectedOption = d3.select(this).property("value");
        // run the updateChart function with this selected option
        update(selectedOption)
      })

    })
  };

  useEffect(() => {
    document.title = 'Ventes prix du m²';
    //getPrixByMonth();
  }, [typeBien]);

  return (
    <div>
      <Navbar />

      <div className="container">
        <select id="selectButton"></select>
        <script src="https://d3js.org/d3-scale-chromatic.v1.min.js"></script>
        {renderGraphique()}
      </div>
    </div>
  );
};

export default Lineaire;
