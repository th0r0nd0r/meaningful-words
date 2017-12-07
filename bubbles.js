import * as d3 from "d3";
var canvas = document.getElementById("canvas");
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

const runSimulation = (orderedWords, wordCounts) => {
  let startX;
  let startY;

  const context = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const tau = 2 * Math.PI;
  
  var nodes = d3.range(50).map(function(i) {
    let word = orderedWords[i];
    return {
      r: wordCounts[word] * 4 + 4,
      word: word
    };
  });
  
  var simulation = d3
    .forceSimulation(nodes)
    .velocityDecay(0.2)
    .force("x", d3.forceX().strength(0.0002))
    .force("y", d3.forceY().strength(0.0002))
    .force(
      "collide",
      d3
        .forceCollide()
        .radius(function(d) {
          return d.r + 9.5;
        })
        .strength(0.1)
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
      context.fillStyle = "#6697e8";
      context.fill();
    });
  
    nodes.forEach(function(d) {
      context.fillStyle = "black";
      const textWidth = context.measureText(d.word).width;
      const diameter = d.r * 2;
      // console.log("text width");
      // console.log(textWidth);
      // console.log("radius");
      // console.log(d.r);
      // console.log("word");
      // console.log(d.word);
      if (textWidth < (diameter)) {
        startY = d.y + 0.1 * d.r;
      } else {
        startY = d.y + d.r + 10;
      }

      startX = (d.x - textWidth / 2) - 0.03 * d.r;
      context.fillText(d.word, startX, startY );
    });
    
    context.strokeStyle = "#333";
    context.stroke();
    context.restore();
  }
};

export default runSimulation;