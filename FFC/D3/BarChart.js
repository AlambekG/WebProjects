const margin = {top: 60, left: 60, bottom: 20, right: 50}
const width = 700 - margin.left - margin.right
const height = 600 - margin.top - margin.bottom
const Tick = 10
const zero_height = height - margin.top
const color = 'blue'

let data = [[4, 5], [2, 9], [0, 3], [7, 2]]

let x = d3.scaleBand().domain(d3.range(data[data.length - 1][0] + 1)).range([margin.left, width - margin.right]).padding(0.2)

let y = d3.scaleLinear().domain([Math.min(0, d3.min(data, d => d[1])), d3.max(data, d => d[1])]).range([zero_height, margin.top])

let xAxis = d3.axisBottom(x).ticks(Tick)
let yAxis = d3.axisLeft(y).ticks(Tick)


let svg = d3.select('body')
            .append('svg')
            .style('width', width)
            .style('height', height)

svg.append("text")
   .attr('x', width / 2)
   .attr('y', margin.top)
   .text("Hello world")

let gx = svg.append('g')
         .attr('transform', `translate(${0}, ${zero_height})`)
         .call(xAxis)       
let gy = svg.append('g')
         .attr('transform', `translate(${margin.left}, ${0})`)
         .call(yAxis)
console.log('y3 check', y(data[2][1]))
console.log('y1 check', y(data[0][1]))
console.log('y2 check', y(data[1][1]))
console.log(zero_height)


svg.selectAll('bars')
   .data(data)
   .enter()
   .append('rect')
   .attr('x', d => x(d[0]))
   .attr('y', d => y(d[1]))
   .attr('width', x.bandwidth())
   .attr('height', d => zero_height - y(d[1]))
   .attr('fill', color)

/*
 const req = new XMLHttpRequest();
 req.open('GET', 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
 req.send()

 req.onload = function(){
     const json = JSON.parse(req.responseText);
     let data = json['data'] 

 } 
 */