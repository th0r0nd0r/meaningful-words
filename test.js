

window.printFile = printFile;
window.loadAsText = loadAsText;

const fileInput = document.getElementById("file-input");
let currentFile;

const printFile = () => {
  currentFile = fileInput.files[0];
  document.write(currentFile.size);
  loadAsText(currentFile);
};


const loadAsText = (file) => {
  const reader = new FileReader();

  reader.onload = () => {
    let fileContents = this.result;
    document.write(fileContents);
  };

  reader.readAsText(file);
};



