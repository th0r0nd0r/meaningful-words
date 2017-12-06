
const writ = () => {document.write(" exports/imports working");};

export default writ;

let fileList;
let currentFile;

const printFile = (event) => {
  readFiles(event);
  currentFile = fileList[0];
  document.write("something happened");
};

window.printFile = printFile;

function readFiles(event) {
  fileList = event.target.files;
}

