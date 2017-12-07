import runSimulation from "./bubbles";

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
    // document.write(sorted);

    runSimulation(sorted, wordCountsObj);
  };
  
  reader.readAsText(file);
};



window.printFile = printFile;
// window.loadAsText = loadAsText;