

const fileInput = document.getElementById("file-input");
let currentFile;
let text;


const splitText = (txt) => {
  let newText = txt.replace(/[.,\/#!$%\^&\*;:{}=\-_`"\?~()]/g,"");
  // let newText = txt.replace(/the/g,"armadillo");
  return newText;
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