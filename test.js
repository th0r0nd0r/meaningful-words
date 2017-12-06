

window.printFile = printFile;

const fileInput = document.getElementById("file-input");
let currentFile;

const printFile = () => {
  currentFile = fileInput.files[0];
  document.write(currentFile.size);
};

const reader = new FileReader();

reader.onload = () => {
  let fileContents = this.result;
};

