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
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
    var svg = d3.select("body")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

//Read the data
    d3.json(process.env.REACT_APP_API_ENTRYPOINT + '/bien_immobiliers/priceByMonthYear/' + typeBien, function(data) {
      // List of groups (here I have one group per column)
      var allGroup = ["Maison", "Appartement"];

      // add the options to the button
      d3.select("#selectButton")
        .selectAll('myOptions')
        .data(allGroup)
        .enter()
        .append('option')
        .text(function (d) { return d; }) // text showed in the menu
        .attr("value", function (d) { return d; }); // corresponding value returned by the button

      // Add X axis --> it is a date format
      var x = d3.scaleLinear()
        .domain([0,5])
        .range([ 0, width ]);
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

      // Add Y axis
      var y = d3.scaleLinear()
        .domain( [0,10])
        .range([ height, 0 ]);
      svg.append("g")
        .call(d3.axisLeft(y));

      // Initialize line with group a
      var line = svg
        .append('g')
        .append("path")
        .datum(data)
        .attr("d", d3.line()
          .x(function(d) { console.log(d);return x(+d.time) })
          .y(function(d) { return y(+d.valueA) })
        )
        .attr("stroke", "black")
        .style("stroke-width", 4)
        .style("fill", "none");

      // Initialize dots with group a
      var dot = svg
        .selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr("cx", function(d) { return x(+d.time) })
        .attr("cy", function(d) { return y(+d.valueA) })
        .attr("r", 7)
        .style("fill", "#69b3a2");


      // A function that update the chart
      function update(selectedGroup) {

        // Create new data with the selection?
        var dataFilter = data.map(function(d){return {time: d.time, value:d[selectedGroup]} });

        // Give these new data to update line
        line
          .datum(dataFilter)
          .transition()
          .duration(1000)
          .attr("d", d3.line()
            .x(function(d) { return x(+d.time) })
            .y(function(d) { return y(+d.value) })
          );
        dot
          .data(dataFilter)
          .transition()
          .duration(1000)
          .attr("cx", function(d) { return x(+d.time) })
          .attr("cy", function(d) { return y(+d.value) })
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
        {renderGraphique()}
      </div>
    </div>
  );
};

export default Lineaire;
