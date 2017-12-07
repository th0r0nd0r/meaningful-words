

const fileInput = document.getElementById("file-input");
let currentFile;
let text;


const splitText = (txt) => {
  txt.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
  txt.replace(/the/g,"armadillo");
};




const printFile = () => {
  currentFile = fileInput.files[0];
  loadAsText(currentFile);
};



const loadAsText = (file) => {
  const reader = new FileReader();
  
  reader.onload = (loadedEvent) => {
    text = loadedEvent.target.result;
    splitText(text);
    document.write(text);
  };
  
  reader.readAsText(file);
};



window.printFile = printFile;
// window.loadAsText = loadAsText;