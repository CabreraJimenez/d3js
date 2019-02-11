import {select} from "d3-selection";
import {malagaStats, avgTemp, TempStat} from "./bar.data";
import{extent} from "d3-array";
import{line} from "d3-shape";
import {scaleTime, scaleLinear, scaleOrdinal, scaleBand} from "d3-scale";
import {schemeCategory10} from "d3-scale-chromatic";
import { axisBottom, axisLeft } from "d3-axis";

//Alturas y márgenes 

const width = 500;
const height = 300;
const padding = 50;
const margin = 0;

//Creación de la tarjeta

const card = select("#root")
  .append("div")
    .attr("class", "card");

//Zona donde vamos a pintar

const svg = card
    .append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", `${-padding} ${-padding} ${width + 2*padding} ${height + 2*padding}`);

const yScale = scaleLinear()
  .range([height, 0])
  .domain(extent(avgTemp))

const xScale = scaleBand()
  .domain(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"])
  .range([0,width])

const barGroup = svg
    .append('g');

// Very basic barGroup
barGroup
  .selectAll('rect')
  .data(avgTemp)
  .enter()
  .append("rect")
    //.attr("x", function(d,i){ return i*(width / avgTemp.length)})
    .attr("x", (s,i) => xScale.bandwidth()*i)
    //.attr("y", function(d){return (height - d*7 )})
    .attr("y", (d) => yScale(d) )
    //.attr("width", width / avgTemp.length  )
    .attr("width", xScale.bandwidth()  )
    .attr("height", (d) => height - yScale(d) )
    .attr("fill", function(d) {
      return "rgb(178, " + (+255- 8*d) + ", 0)";
      })
    ;

//Añadir eje yclc
barGroup.append('g')
  .attr('transform', `translate(0, ${height})`)
  .call(axisBottom(xScale));

//Añadir eje y
barGroup.append('g')
    .call(axisLeft(yScale));

//Añadir Texto (Comentario eje x e y)
svg.append('text')
    .attr('x', -(height / 2) - margin)//(height / 2) - margin
    .attr('y', -padding/2)
    .attr('transform', 'rotate(-90)')
    .attr('text-anchor', 'middle')
    .text('Avg temperature')

svg.append('text')
    .attr('x', width / 2 )
    .attr('y', -padding/2)
    .attr('text-anchor', 'middle')
    .text('Month')

