

const fileInput = document.getElementById("file-input");
let currentFile;
let text;

const printFile = () => {
  currentFile = fileInput.files[0];
  loadAsText(currentFile);
};



const loadAsText = (file) => {
  const reader = new FileReader();
  
  reader.onload = (loadedEvent) => {
    text = loadedEvent.target.result;
    document.write(text);
  };
  
  reader.readAsText(file);
};




window.printFile = printFile;
window.loadAsText = loadAsText;