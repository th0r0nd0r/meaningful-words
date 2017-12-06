
const writ = () => {document.write(" exports/imports working");};

export default writ;

let fileList;
let currentFile;

const printFile = (event) => {
  readFiles(event);

}

function readFiles(event) {
  fileList = event.target.files;
}

