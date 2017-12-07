/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__word_counts__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__word_counts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__word_counts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bubbles__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bubbles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__bubbles__);



document.write("hello");



/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports) {

const fileInput = document.getElementById("file-input");
let currentFile;
let text;
let wordCounts = [];
let wordCountsObj = {};
const allWords = [];
let minLength = 5;


const compareWordCounts = (word1, word2) => {
  if (wordCountsObj[word1] > wordCountsObj[word2]) {
    return -1;
  } else if (wordCountsObj[word1] < wordCountsObj[word2]) {
    return 1;
  } else {
    return 0;
  }
};

const nonsenseWords = [
  "A", "To", "Too", "If", "Not", "But", "Or", "And", "As", "The", "Of", "Be", "Is", "That",
  "In", "I", "By", "For", "On", "But", "At", "It", "An", "With", "Are", "From", "Let", "can", 
  "Its", "Has", "Off", "Was"
];


const splitText = (txt) => {
  let newText = txt.replace(/["”“‘.,\/#!$%\^&\*;:{}=\-_`\?~()]/g, "");
  newText = newText.replace(/('[^a-z])(’[^a-z])/g, " ");
  newText = newText.replace(/\n/g," ");
  return newText.split(" ");
  
};

const capitalize = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

const hashWords = (txt) => {
  let words = splitText(txt);
  console.log("unsorted words");
  console.log(words);

  for (let i = 0; i < words.length; i++) {
    let word = capitalize(words[i]);
    if (word.slice(-2) === "'s" || word.slice(-2) === "’s") {
      word = word.slice(0, -2);
    }

    if (wordCountsObj[word]) {
      wordCountsObj[word]++;
    } else {
      wordCountsObj[word] = 1;
    }
  }
  console.log("word counts");
  console.log(wordCountsObj);

  // const allWords = Object.keys(wordCountsObj);

  for (var word in wordCountsObj) {
    if  (wordCountsObj.hasOwnProperty(word) && !nonsenseWords.includes(word) && word.length >= minLength) {
      allWords.push(word);
    }
  }
  return allWords.sort(compareWordCounts);
};



const printFile = () => {
  currentFile = fileInput.files[0];
  loadAsText(currentFile);
};



const loadAsText = (file) => {
  const reader = new FileReader();
  
  reader.onload = (loadedEvent) => {
    text = loadedEvent.target.result;
    // console.log(text);
    let sorted = hashWords(text);

    console.log("sorted");
    console.log(sorted);
    document.write(sorted);
  };
  
  reader.readAsText(file);
};



window.printFile = printFile;
// window.loadAsText = loadAsText;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

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

/***/ })
/******/ ]);