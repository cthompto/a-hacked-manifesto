// Main text modification and generation script
// For "A Hacked Manifesto"

// Universal data, variables and constants
var manifesto;
fetch('./text/hacker-text.json')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    manifesto = data;})
  .catch(error => console.error('Error fetching JSON:', error)
);

var manifesto2;
fetch('./text/Wark_McKenzie_A_Hacker_Manifesto.txt')
  .then(response => response.text())
  .then(data => {manifesto2 = data;})
  .catch(error => console.error('Error fetching text:', error)
);

const results = document.getElementById("result-text");

// BUTTONS

// Random Sentence Button
const ranBut = document.getElementById("rs");
ranBut.addEventListener("click", randomText);

function randomText() {
    let ranSec = Math.floor(Math.random() * ((Object.keys(manifesto.sections).length)-1));
    let ranPar = Math.floor(Math.random() * (Object.keys(manifesto.sections[ranSec].paragraphs).length));
    let ranLin = Math.floor(Math.random() * (Object.keys(manifesto.sections[ranSec].paragraphs[ranPar].sentences).length));
    console.log("Section: " + manifesto.sections[ranSec].name);
    console.log("Paragraph: " + manifesto.sections[ranSec].paragraphs[ranPar].number);
    console.log("Line: " + manifesto.sections[ranSec].paragraphs[ranPar].sentences[ranLin]);

    let sentence = manifesto.sections[ranSec].paragraphs[ranPar].sentences[ranLin];
    results.innerText = sentence;
}

// Sentence Combiner Button
const combBut = document.getElementById("sc");
combBut.addEventListener("click", sentenceCombiner);

function sentenceCombiner() {
    let rm = RiTa.markov(4);
    rm.addText(manifesto2);
    sentences = rm.generate(3);
    console.log(sentences);
    results.innerText = sentences[0]+"\n"+"\n"+"\n"+sentences[1]+"\n"+"\n"+"\n"+sentences[2];
}