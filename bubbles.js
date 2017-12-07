var data = [
  { source: 'Baratheon', target:'Lannister' },
  { source: 'Baratheon', target:'Stark' },
  { source: 'Lannister', target:'Stark' },
  { source: 'Stark', target:'Bolton' }
];

 // create empty nodes array
var nodes = {};

// compute nodes from links data
links.forEach(function(link) {
    link.source = nodes[link.source] ||
        (nodes[link.source] = {name: link.source});
    link.target = nodes[link.target] ||
        (nodes[link.target] = {name: link.target});        
});

// add a SVG to the body for our viz
var svg=d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height);

