import * as d3 from "d3";

// const links = [
//   { source: 'Baratheon', target:'Lannister' },
//   { source: 'Baratheon', target:'Stark' },
//   { source: 'Lannister', target:'Stark' },
//   { source: 'Stark', target:'Bolton' }
// ];

//  // create empty nodes array
// const nodes = {};

// // compute nodes from links data
// links.forEach(function(link) {
//     link.source = nodes[link.source] ||
//         (nodes[link.source] = {name: link.source});
//     link.target = nodes[link.target] ||
//         (nodes[link.target] = {name: link.target});        
// });

var canvas = document.querySelector("canvas"),
  context = canvas.getContext("2d"),
  width = canvas.width,
  height = canvas.height,
  tau = 2 * Math.PI;

var nodes = d3.range(1000).map(function(i) {
  return {
    r: Math.random() * 14 + 4
  };
});

var simulation = d3
  .forceSimulation(nodes)
  .velocityDecay(0.2)
  .force("x", d3.forceX().strength(0.002))
  .force("y", d3.forceY().strength(0.002))
  .force(
    "collide",
    d3
      .forceCollide()
      .radius(function(d) {
        return d.r + 0.5;
      })
      .iterations(2)
  )
  .on("tick", ticked);

function ticked() {
  context.clearRect(0, 0, width, height);
  context.save();
  context.translate(width / 2, height / 2);

  context.beginPath();
  nodes.forEach(function(d) {
    context.moveTo(d.x + d.r, d.y);
    context.arc(d.x, d.y, d.r, 0, tau);
  });
  context.fillStyle = "#ddd";
  context.fill();
  context.strokeStyle = "#333";
  context.stroke();

  context.restore();
}