const height = 480;
const width = 640;

const links = [
  { source: 'Baratheon', target:'Lannister' },
  { source: 'Baratheon', target:'Stark' },
  { source: 'Lannister', target:'Stark' },
  { source: 'Stark', target:'Bolton' }
];

 // create empty nodes array
const nodes = {};

// compute nodes from links data
links.forEach(function(link) {
    link.source = nodes[link.source] ||
        (nodes[link.source] = {name: link.source});
    link.target = nodes[link.target] ||
        (nodes[link.target] = {name: link.target});        
});

// add a SVG to the body for our viz
const svg=d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height);

// use the force
var force = d3.layout.force() //build the layout
    .size([width, height]) //specified earlier
    .nodes(d3.values(nodes)) //add nodes
    .links(links) //add links
    .on("tick", tick) //what to do
    .linkDistance(300) //set for proper svg size
    .start(); //kick the party off!

// add the links
var link = svg.selectAll('.link')
    .data(links)
    .enter().append('line')
    .attr('class', 'link'); 

// add the nodes
var node = svg.selectAll('.node')
    .data(force.nodes()) //add
    .enter().append('circle')
    .attr('class', 'node')
    .attr('r', width * 0.03); //radius of circle