import React, {useState, useEffect} from 'react';
import * as d3 from 'd3';
import Navbar from "../../navbar";

const Barres = () => {
  const [startDate, setStartDate] = useState('2017-01-01');

  const [endDate, setEndDate] = useState('2017-12-31');

  const [erreur, setErreur] = useState('');

  const [loading, setLoading] = useState(false);

  const [sales, setSales] = useState({});

  const [periodType, setPeriodType] = useState('month');

  const getSalesByPeriod = () => {
    setLoading(true);

    fetch(process.env.REACT_APP_API_ENTRYPOINT + '/bien_immobiliers/ventes_period/' + periodType + '/' + startDate + '/' + endDate)
      .then(response => response.json())
      .then(sales => {
        if (sales instanceof Object) {
          setSales(Object.assign({}, sales));
          setErreur('');
        } else {
          setErreur(sales);
        }

        setLoading(false);
      });
  };

  const handleChangeStartDate = e => {
    if (e.target.value !== '') {
      let barChart = document.querySelector('#bar-chart');
      let labels = document.querySelector('#label-chart');

      if (barChart !== null) {
        barChart.innerHTML = '';
        labels.innerHTML = '';
      }

      if (!loading) {
        setStartDate(e.target.value);
        setSales({});
      }
    }
  };

  const handleChangeEndDate = e => {
    if (e.target.value !== '') {
      let barChart = document.querySelector('#bar-chart');
      let labels = document.querySelector('#label-chart');

      if (barChart !== null) {
        barChart.innerHTML = '';
        labels.innerHTML = '';
      }

      if (!loading) {
        setEndDate(e.target.value);
        setSales({});
      }
    }
  };

  const handleChangePeriodType = e => {
    let barChart = document.querySelector('#bar-chart');
    let labels = document.querySelector('#label-chart');

    if (barChart !== null) {
      barChart.innerHTML = '';
      labels.innerHTML = '';
    }

    if (!loading) {
      setPeriodType(e.target.value);
      setSales({});
    }
  };

  const renderGraphique = () => {
    let data = sales;
    let x = [], y = [];

    for (let d in data) {
      x.push(data[d].periode);
      y.push(data[d].nb_ventes);
    }

    let margin = 100;
    let width = 1300 - 2 * margin;
    let height = 600 - 2 * margin;
    let barWidth = width / x.length;
    let maxLabels = 12;
    let maxData = d3.max(y);
    let basicColor = '#3c763d';
    let hoverColor = '#3fbb3d';

    let tooltip = d3.select("#bar-chart")
      .append("div")
      .style("position", "absolute")
      .style("bottom", "20px")
      .style("left", "50%")
      .style("transform", "translateX(-50%)")
      .style("z-index", "10")
      .style("padding", "10px 20px")
      .style("visibility", "hidden")
      .style("background", "#fff");

    d3.select('#bar-chart')
      .style("text-align", "center")
      .style("margin", "30px 0")
      .style("position", "relative").append('svg')
      .attr('width', width)
      .attr('height', height)
      .style('background', '#dff0d8')
      .selectAll('rect').data(y)
      .enter().append('rect')
      .style('fill', basicColor)
      .style('stroke', '#d6e9c6')
      .style('stroke-width', 5)
      .attr('width', barWidth)
      .attr('height', function (data_in) {
        return height - (((maxData - data_in) / maxData) * height);
      })
      .attr('x', function (data_in, i) {
        return i * barWidth;
      })
      .attr('y', function (data_in) {
        return ((maxData - data_in) / maxData) * height;
      })
      .on('mouseover', function (data_in) {
        d3.select(this)
          .style('fill', hoverColor);
        tooltip.text(data_in);
        return tooltip.style("visibility", "visible");
      })
      .on('mouseout', function (data_in) {
        d3.select(this)
          .style('fill', basicColor);
        return tooltip.style("visibility", "hidden");
      });

    d3.select('#label-chart')
      .style("text-align", "center")
      .style("display", "flex")
      .attr('width', width)
      .attr('height', height)
      .selectAll('div').data(x)
      .enter().append('div')
      .style("background-color", "grey")
      .style("position", "absolute")
      .style("color", "white")
      .style("border", "1px solid white")
      .style("margin", "5px")
      .style("padding", "5px")
      .style('max-width', barWidth + "px")
      .attr('y', 0)
      .style('margin-left', function (data_in, i) {
        return ((i * barWidth) + 5) + "px";
      })
      .text(function (data_in) {
        return data_in;
      });
  };

  useEffect(() => {
    document.title = 'Ventes par période de ' + startDate + ' à ' + endDate + '.';
    getSalesByPeriod();
  }, [startDate, endDate, periodType]);

  return (
    <div>
      <Navbar/>

      <div className="container">

        {loading && <div className="mt-2 alert alert-info">Chargement...</div>}

        {!loading && erreur === '' && Object.entries(sales).length > 0 && renderGraphique()}

        <h3>Période : {startDate} à {endDate}</h3>

        <input type="date" className="form-control" id="start-date" name="start-date"
               defaultValue="2017-01-01"
               min="2015-01-01" max="2019-12-31"
               onChange={handleChangeStartDate}/>

        <input type="date" className="form-control" id="end-date" name="end-date"
               defaultValue="2017-12-31"
               min="2015-01-01" max="2019-12-31"
               onChange={handleChangeEndDate}/>

        <select name="period-type" id="period-type" onChange={handleChangePeriodType}>
          <option value="month">Mois</option>
          <option value="week">Semaine</option>
          <option value="day">Jour</option>
        </select>

        <div id="bar-chart"></div>
        <div id="label-chart"></div>

        {!loading && Object.entries(sales).length === 0 && erreur === '' &&
        <p>Pas de données disponible pour cette date.</p>}

        {!loading && erreur !== '' && <h5 className="text-danger">{erreur}</h5>}
      </div>
    </div>
  );
};

export default Barres;
