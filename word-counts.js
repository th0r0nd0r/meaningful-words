const fileInput = document.getElementById("file-input");
let currentFile;
let text;
let wordCounts = [];
let wordCountsObj = {};
const allWords = [];


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
  "a", "to", "too", "if", "not", "but", "or", "and", "as", "the", "of", "be", "is", "that",
  "in", "I", "by", "for"
];


const splitText = (txt) => {
  let newText = txt.replace(/["”“‘.,\/#!$%\^&\*;:{}=\-_`\?~()]/g, "");
  newText = newText.replace(/('[^a-z])(’[^a-z])/g, " ");
  newText = newText.replace(/\n/g," ");
  return newText.split(" ");
  
};

const hashWords = (txt) => {
  let words = splitText(txt);
  console.log("unsorted words");
  console.log(words);

  for (let i = 0; i < words.length; i++) {
    if (wordCountsObj[words[i]]) {
      wordCountsObj[words[i]]++;
    } else {
      wordCountsObj[words[i]] = 1;
    }
  }
  console.log("word counts");
  console.log(wordCountsObj);

  // const allWords = Object.keys(wordCountsObj);

  for (var property in wordCountsObj) {
    if  (!nonsenseWords.includes(property)) {
      allWords.push(property);
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