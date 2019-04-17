import { select } from "d3-selection";
import { malagaStats, avgTemp, TempStat } from "./bar.data";
import { extent } from "d3-array";
import { line } from "d3-shape";
import { scaleTime, scaleLinear, scaleOrdinal, scaleBand } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";
import { axisBottom, axisLeft } from "d3-axis";
import { max, min } from "d3-array";
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
  .attr("viewBox", `${-padding} ${-padding} ${width + 2 * padding} ${height + 2 * padding}`);

//Domain and range for the y scale
const yScale = scaleLinear()
  .range([height, 0])
  .domain([min(extent(avgTemp)) - 3, max(extent(avgTemp)) + 2])//Select the minimun in the y axis and the maximum
var Months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const xScale = scaleBand()
  .domain(Months)
  .range([0, width])
  .paddingInner(0.03)// Space beetwen bars (Range 0-1)

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
  .attr("x", (d, i) => i * (width / Months.length)) //The point when you start to paint
  .attr("y", (d) => yScale(d))
  .attr("width", xScale.bandwidth()) //Lenght x paint
  .attr("height", (d) => height - yScale(d))
  .attr("fill", "url(#barGradient)");
;

//add x
barGroup.append('g')
  .attr('transform', `translate(0, ${height})`)
  .call(axisBottom(xScale));

//Add y
barGroup.append('g')
  .call(axisLeft(yScale));

//Axis y
svg.append('text')
  .attr('x', -(height / 2))//(height / 2) - margin
  .attr('y', -padding / 2)
  .attr('transform', 'rotate(-90)')
  .attr('text-anchor', 'middle')
  .text('Avg temperature')
//Axis
svg.append('text')
  .attr('x', width / 2)
  .attr('y', height + padding)
  .attr('text-anchor', 'middle')
  .text('Months')

//Adding a title
svg.append("text")
  .attr("x", (width / 2))
  .attr("y", -20)
  .attr("text-anchor", "middle")
  .style("font-size", "16px")
  .style("text-decoration", "underline")
  .text("Avg Temperatures vs Months");
