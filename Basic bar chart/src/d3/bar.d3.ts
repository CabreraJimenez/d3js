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

//Create the card

const card = select("#root")
  .append("div")
    .attr("class", "card");

//Where we are going to "paint"

const svg = card
    .append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", `${-padding} ${-padding} ${width + 2*padding} ${height + 2*padding}`);
      
//The yScale, extent is used for maximum and mimimum
const yScale = scaleLinear()
  .range([height, 0])
  .domain(extent(avgTemp))

const xScale = scaleBand()
  .domain(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"])
  .range([0,width])

// We are going to use a scale color for the bar chart. This is the reason why we use gradients here. See the documentation 
//for more information
const gradient = svg
    .append("defs")
      .append("linearGradient")
        .attr("id", "barGradient")
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", "0")
        .attr("y1", height)
        .attr("x2", "0")
        .attr("y2", "0");
gradient
    .append("stop")
      .attr("offset", "0")
      .attr("stop-color", "#185a9d");
gradient
    .append("stop")
      .attr("offset", "50%")
      .attr("stop-color", "#ff9900");
gradient
    .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#dc3912");


const barGroup = svg
  .append('g');

// Painting the bar chart
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
    .attr("fill", "url(#barGradient)");
    ;

//add x
barGroup.append('g')
  .attr('transform', `translate(0, ${height})`)
  .call(axisBottom(xScale));

//Add y
barGroup.append('g')
    .call(axisLeft(yScale));

//Comments, firstly y and later x
svg.append('text')
    .attr('x', -(height / 2) )//(height / 2) - margin
    .attr('y', -padding/2)
    .attr('transform', 'rotate(-90)')
    .attr('text-anchor', 'middle')
    .text('Avg temperature')

svg.append('text')
    .attr('x', width / 2 )
    .attr('y', height + padding)
    .attr('text-anchor', 'middle')
    .text('Months')
