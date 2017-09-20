const btn = document.querySelector('button')
btn.addEventListener('click', function(){
  let newNode = {
    id: "gina",
    group: 1,
    label: "Gina",
    level: 2
  };
  let newLink = {
    target: "burger king",
    source: "gina",
    strength: 0.3
  };
  nodes.push(newNode);
  links.push(newLink);
})

var nodes = [{
  id: "john",
  group: 0,
  label: "John",
  level: 1
}, {
  id: "dog",
  group: 1,
  label: "Dog",
  level: 1
}, {
  id: "bill",
  group: 1,
  label: "Bill",
  level: 1
}, {
  id: "burger king",
  group: 1,
  label: "Burger King",
  level: 1
},]
var links = [{
  target: "dog",
  source: "john",
  strength: 0.3
}, {
  target: "burger king",
  source: "john",
  strength: 0.3
}, {
  target: "burger king",
  source: "bill",
  strength: 0.3
}]

function getNodeColor(node) {
  return node.group === 0 ? 'red' : 'gray'
}
var width = window.innerWidth
var height = window.innerHeight
var svg = d3.select('svg')
svg.attr('width', width).attr('height', height)
// simulation setup with all forces
var linkForce = d3
  .forceLink()
  .id(function(link) {
    return link.id
  })
  .strength(function(link) {
    return link.strength
  })
var simulation = d3
  .forceSimulation()
  .force('link', linkForce)
  .force('charge', d3.forceManyBody().strength(-120))
  .force('center', d3.forceCenter(width / 2, height / 2))
var linkElements = svg.append("g")
  .attr("class", "links")
  .selectAll("line")
  .data(links)
  .enter().append("line")
  .attr("stroke-width", 1)
  .attr("stroke", "rgba(50, 50, 50, 0.2)")
var nodeElements = svg.append("g")
  .attr("class", "nodes")
  .selectAll("circle")
  .data(nodes)
  .enter().append("circle")
  .attr("r", 10)
  .attr("fill", getNodeColor)
var textElements = svg.append("g")
  .attr("class", "texts")
  .selectAll("text")
  .data(nodes)
  .enter().append("text")
  .text(function(node) {
    return node.label
  })
  .attr("font-size", 15)
  .attr("dx", 15)
  .attr("dy", 4)
simulation.nodes(nodes).on('tick', () => {
  nodeElements
    .attr('cx', function(node) {
      return node.x
    })
    .attr('cy', function(node) {
      return node.y
    })
  textElements
    .attr('x', function(node) {
      return node.x
    })
    .attr('y', function(node) {
      return node.y
    })
  linkElements
    .attr('x1', function(link) {
      return link.source.x
    })
    .attr('y1', function(link) {
      return link.source.y
    })
    .attr('x2', function(link) {
      return link.target.x
    })
    .attr('y2', function(link) {
      return link.target.y
    })
})
simulation.force("link").links(links)
