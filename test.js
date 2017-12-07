

const fileInput = document.getElementById("file-input");
let currentFile;
let text;
let wordCounts = [];
let wordCountsObj = {};


const compareWordCounts = (word1, word2) => {
  if (wordCountsObj[word1] < wordCountsObj[word2]) {
    return -1;
  } else if (wordCountsObj[word1] > wordCountsObj[word2]) {
    return 1;
  } else {
    return 0;
  }
};


const splitText = (txt) => {
  let newText = txt.replace(/["”“‘.,\/#!$%\^&\*;:{}=\-_`\?~()]/g, "");
  newText = newText.replace(/('[^a-z])(’[^a-z])/g, " ");
  return newText.split(" ");
};

const hashWords = (txt) => {
  let words = splitText(txt);

  for (let i = 0; i < words.length; i++) {
    if (wordCountsObj[words[i]]) {
      wordCountsObj[words[i]]++;
    } else {
      wordCountsObj[words[i]] = 1;
    }
  }
};



const printFile = () => {
  currentFile = fileInput.files[0];
  loadAsText(currentFile);
};



const loadAsText = (file) => {
  const reader = new FileReader();
  
  reader.onload = (loadedEvent) => {
    text = loadedEvent.target.result;
    console.log(text);
    let split = splitText(text);
    console.log(split);
    document.write(split);
  };
  
  reader.readAsText(file);
};



window.printFile = printFile;
// window.loadAsText = loadAsText;