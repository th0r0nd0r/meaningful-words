

window.printFile = printFile;
window.loadAsText = loadAsText;

const fileInput = document.getElementById("file-input");
let currentFile;

const printFile = () => {
  currentFile = fileInput.files[0];
  document.write(currentFile.size);
};

const reader = new FileReader();

const loadAsText = (file) => {
  reader.readAsText(currentFile);
};


reader.onload = () => {
  let fileContents = this.result;
};

