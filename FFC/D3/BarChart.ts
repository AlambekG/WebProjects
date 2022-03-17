import * as d3 from "https://unpkg.com/d3?module"

const margin = {top: 60, left: 60, bottom: 20, right: 50}
const width = 700 - margin.left - margin.right
const height = 600 - margin.top - margin.bottom
const Tick = 10
const zero_height = height - margin.top
const color = 'blue'

const createBar = (allData) => {
   let min = 999999, mx = 0
   allData.forEach(d => {
       if(d[0] < min) min = d[0]
       if(d[0] > mx) mx = d[0]
   })
  console.log(min, mx)
   const x = d3.scaleLinear().domain([min, mx]).range([margin.left, width - margin.right]).padding(0.2)
   console.log(x)
   const y = d3.scaleLinear().domain([Math.min(0, d3.min(allData, d => d[1])), d3.max(allData, d => d[1])]).range([zero_height, margin.top])
   let xAxis = d3.axisBottom(x).ticks(Tick)
   let yAxis = d3.axisLeft(y).ticks(Tick)
   const svg = d3.select('body')
               .append('svg')
               .style('width', width)
               .style('height', height)

   svg.append("text")
      .attr('x', width / 2)
      .attr('y', margin.top)
      .text("Hello world")
   let gX = svg.append('g')
            .attr('transform', `translate(${0}, ${zero_height})`)
            .call(xAxis)       
   let gY = svg.append('g')
            .attr('transform', `translate(${margin.left}, ${0})`)
            .call(yAxis)
/*
   svg.selectAll('bars')
      .data(allData)
      .enter()
      .append('rect')
      .attr('x', d => x(d[0]))
      .attr('y', d => y(d[1]))
      .attr('width', 5)
      .attr('height', d => zero_height - y(d[1]))
      .attr('fill', color)*/

}

let data = [[4, 5], [2, 9], [0, 3], [7, 2]]

async function load() {
  const response = await fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json');
  const names = await response.json();
  console.log(names.data); 
  let allData = []
  names.data.forEach(d => {
         allData.push([parseInt(d[0]), d[1]])
  })
  console.log(allData)
  createBar(allData)
  // logs [{ name: 'Joker'}, { name: 'Batman' }]
}
load();
/*
 const req = new XMLHttpRequest();
 req.open('GET', 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
 req.send()

 req.onload = function(){
     const json = JSON.parse(req.responseText);
     let data = json['data'] 

 } 
 */