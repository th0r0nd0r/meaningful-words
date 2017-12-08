import * as d3 from "d3";
var canvas = document.getElementById("canvas");

const runSimulation = (orderedWords, wordCounts) => {
  // const offsets = [4,3.5,2.5,6,6.5,8,9.5]
  // let offset = offsets[Math.floor(Math.random() * 6)];
  let offset = Math.random() * 10;

  function getColor(value, max) {
    let newValue = ((max)/(max)*(value-max) + max) / 100;
    //value from 0 to 1
    let hue = ((offset - newValue) * 90).toString(10);
    return ["hsl(", hue, ",50%,70%)"].join("");
  }

  canvas.addEventListener("mousemove", updatePointer);

  function updatePointer(e) {
    pointer.x = e.x;
    pointer.y = e.y;
  }

  let startX;
  let startY;

  const context = canvas.getContext("2d");

  const width = canvas.width;
  const height = canvas.height;
  const tau = 2 * Math.PI;
  const nodeCount = 80;
  
  const firstWord = orderedWords[0];
  const highestCount = wordCounts[firstWord];
  
  function avgCount(words, counts) {
    let totalCount = 0;
    words.slice(0,nodeCount).forEach((word) => {
      totalCount += counts[word];
    }); 
    return totalCount / nodeCount;
  }

  const avg = avgCount(orderedWords, wordCounts);
  console.log("average count");
  console.log(avg);

  const modifier = (1 / highestCount) * 100 * (1.5 / Math.pow(1.3, avg / 4));

  const nodes = d3.range(nodeCount).map(function(i) {
    let word = orderedWords[i];
    return {
      r: wordCounts[word] * modifier + 4,
      word: word
    };
  });

  nodes.push({r: 10});

  const nonPointerNodes = nodes.slice(0, nodes.length - 1);
  const pointer = nodes.slice(nodes.length - 1);
  


  const simulation = d3
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

    context.font = '12pt Arial';
    context.clearRect(0, 0, width, height);
    context.save();
    context.translate(width / 2, height / 2);

    
    context.beginPath();
    nonPointerNodes.forEach(function(d) {
      context.moveTo(d.x + d.r, d.y);
      context.beginPath();
      context.arc(d.x, d.y, d.r, 0, tau);
      context.fillStyle = getColor(d.r, highestCount);
      context.fill();
      // context.strokeStyle = "#333";
      // context.stroke();
      context.closePath();
    });
  
    nonPointerNodes.forEach(function(d) {
      context.fillStyle = "black";
      const textWidth = context.measureText(d.word).width;
      const diameter = d.r * 2;

      if (textWidth < (diameter)) {
        startY = d.y + 0.1 * d.r;
      } else {
        startY = d.y + d.r + 10;
      }

      startX = (d.x - textWidth / 2) - 0.03 * d.r;
      context.fillText(d.word, startX, startY );
    });
    
    context.restore();
  }
};

export default runSimulation;