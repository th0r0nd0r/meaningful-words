
const writ = () => {document.write(" exports/imports working");};

export default writ;


const fileInput = document.getElementById("file-input");
let currentFile;

const printFile = () => {
  currentFile = fileInput.files[0];
  document.write(currentFile.size);
};


window.currentFile = currentFile;







// let fileList;
// let currentFile;

// const printFile = (event) => {
//   readFiles(event);
//   currentFile = fileList[0];
//   document.write("something happened");
// };

window.printFile = printFile;

// function readFiles(event) {
//   fileList = event.target.files;
// }

