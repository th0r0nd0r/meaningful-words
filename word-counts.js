import runSimulation from "./bubbles";

const fileInput = document.getElementById("file-input");
let currentFile;
let text;
let wordCounts = [];
let wordCountsObj = {};
const allWords = [];
let minLength = 5;

// this function gets used to sort words by word count
const compareWordCounts = (word1, word2) => {
  if (wordCountsObj[word1] > wordCountsObj[word2]) {
    return -1;
  } else if (wordCountsObj[word1] < wordCountsObj[word2]) {
    return 1;
  } else {
    return 0;
  }
};


// list of words not to include in the final array
const nonsenseWords = [
  "A", "To", "Too", "If", "Not", "But", "Or", "And", "As", "The", "Of", "Be", "Is", "That",
  "In", "I", "By", "For", "On", "But", "At", "It", "An", "With", "Are", "From", "Let", "can", 
  "Its", "Has", "Off", "Was", "Which", "Would", "Their", "They're", "There"
];


// uses regex to split a file into an array of capitalized words
const splitText = (txt) => {
  let newText = txt.replace(/["”“‘.,\/#!$%\^&\*;:{}=_`\?~()]/g, "");
  newText = newText.replace(/('[^a-z])(’[^a-z])/g, " ");
  newText = newText.replace(/\n/g," ");
  newText = newText.replace(/-+/g, " ");
  return newText.split(" ");
};

const capitalize = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};


// this function, named after Ruby's hash, not a hashing function, creates an object
// whose keys are words, and whose values are word counts
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


// this function gets called when a user uploads a file
const analyze = () => {
  currentFile = fileInput.files[0];
  loadAsText(currentFile);
};


// this uses the File API to read a file asynchronously, then onload
// it calls hashWords to turn the text into a sorted word array. 
// wordCountsObj is globally declared in this file.
const loadAsText = (file) => {
  const reader = new FileReader();
  
  reader.onload = (loadedEvent) => {
    text = loadedEvent.target.result;
    // console.log(text);
    let sorted = hashWords(text);

    console.log("sorted");
    console.log(sorted);
    // document.write(sorted);

    // imported from bubbles, this renders the bubbles to the canvas
    runSimulation(sorted, wordCountsObj);
  };
  
  reader.readAsText(file);
};



window.analyze = analyze;
// window.loadAsText = loadAsText;

// the functions get called in this order, with this data respectively:
// fileinput.onclick => analyze => loadAsText => readAsText => hashWords => splitText => runSimiulation
//         File      =>   File  =>    File    =>    File    =>   text    =>    text   =>  array, POJO


