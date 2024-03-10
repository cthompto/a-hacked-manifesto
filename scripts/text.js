var manifesto;
fetch('./text/hacker-text.json')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    manifesto = data;
})
  .catch(error => console.error('Error fetching JSON:', error));

  //console.log(manifesto);

const ranBut = document.getElementById("rb");
ranBut.addEventListener("click", randomText);

function randomText() {
    let ranSec = Math.floor(Math.random() * ((Object.keys(manifesto.sections).length)-1));
    let ranPar = Math.floor(Math.random() * (Object.keys(manifesto.sections[ranSec].paragraphs).length));
    let ranLin = Math.floor(Math.random() * (Object.keys(manifesto.sections[ranSec].paragraphs[ranPar].sentences).length));
    console.log("Section: " + manifesto.sections[ranSec].name);
    console.log("Paragraph: " + manifesto.sections[ranSec].paragraphs[ranPar].number);
    console.log("Line: " + manifesto.sections[ranSec].paragraphs[ranPar].sentences[ranLin]);
}