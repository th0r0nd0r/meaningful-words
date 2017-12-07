

const fileInput = document.getElementById("file-input");
let currentFile;
let text;
let wordCounts = [];
let wordPresence = {};


const splitText = (txt) => {
  let newText = txt.replace(/["”“‘.,\/#!$%\^&\*;:{}=\-_`\?~()]/g, "");
  newText = newText.replace(/('[^a-z])(’[^a-z])/g, " ");
  return newText.split(" ");
};

const hashWords = (words) => {
  for (i = 0; i < words.length; i++) {

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