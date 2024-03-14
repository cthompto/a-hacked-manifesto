// Main text modification and generation script
// For "A Hacked Manifesto"

// Global data, variables, and constants
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
  .then(response2 => response2.text())
  .then(data2 => {manifesto2 = data2;})
  .catch(error => console.error('Error fetching text:', error)
);

const results = document.getElementById("result-text");

// Underlay Loading
const underLay = document.getElementById("underlay");

// BUTTONS

// About Button
const aboutBut = document.getElementById("ab");
aboutBut.addEventListener("click", aboutDisplay);

function aboutDisplay() {
    var aboutContainer = document.getElementById("about"),
        aboutStyle = window.getComputedStyle(aboutContainer),
        aboutDisplay = aboutStyle.getPropertyValue("display");
    if (aboutDisplay == "none") {
        aboutContainer.style.display = "block";
    } else if (aboutDisplay == "block") {
        aboutContainer.style.display = "none";
    }
    if(aboutBut.innerHTML == "About +") {
        aboutBut.innerHTML = "About -";
    } else if (aboutBut.innerHTML == "About -"){
        aboutBut.innerHTML = "About +";
    }
}

// Random Sentence Button
const ranBut = document.getElementById("rs");
ranBut.addEventListener("click", randomSentence);

function randomSentence() {
    let ranSec = Math.floor(Math.random() * ((Object.keys(manifesto.sections).length)-1));
    let ranPar = Math.floor(Math.random() * (Object.keys(manifesto.sections[ranSec].paragraphs).length));
    let ranLin = Math.floor(Math.random() * (Object.keys(manifesto.sections[ranSec].paragraphs[ranPar].sentences).length));
    console.log("Section: " + manifesto.sections[ranSec].name);
    console.log("Paragraph: " + manifesto.sections[ranSec].paragraphs[ranPar].number);
    console.log("Line: " + manifesto.sections[ranSec].paragraphs[ranPar].sentences[ranLin]);

    let sentence = manifesto.sections[ranSec].paragraphs[ranPar].sentences[ranLin];
    results.innerText = sentence;
}

// Random Paragraph Button
const ranBut2 = document.getElementById("rp");
ranBut2.addEventListener("click", randomParagraph)

function randomParagraph() {
    let ranSec = Math.floor(Math.random() * ((Object.keys(manifesto.sections).length)-1));
    let ranPar = Math.floor(Math.random() * (Object.keys(manifesto.sections[ranSec].paragraphs).length));
    let paragraphLength = manifesto.sections[ranSec].paragraphs[ranPar].sentences.length;
    let paragraphContent = "";

    for (let j = 0; j < paragraphLength; j++) {
        let sentenceContent = manifesto.sections[ranSec].paragraphs[ranPar].sentences[j]+" ";
        paragraphContent += sentenceContent;
    }
    results.innerText = paragraphContent;

}

// Paragraph Shuffle Button
const shuffleBut = document.getElementById("ps");
shuffleBut.addEventListener("click", paragraphShuffler);

function paragraphShuffler() {
    let shuffledPar = "";
    let lineBreaks = "\n\n\n";
    let ranSec = Math.floor(Math.random() * ((Object.keys(manifesto.sections).length)-1));
    let sectionName = manifesto.sections[ranSec].name;
    let ranPar = Math.floor(Math.random() * (Object.keys(manifesto.sections[ranSec].paragraphs).length));
    let paragraphLength = manifesto.sections[ranSec].paragraphs[ranPar].sentences.length;
    let unshuffled = manifesto.sections[ranSec].paragraphs[ranPar].sentences;
    console.log(unshuffled);

    let shuffled = unshuffled
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
    
    console.log(shuffled);

    shuffledPar += sectionName;
    shuffledPar += lineBreaks;

    for (let i = 0; i < paragraphLength; i++) {
        shuffledPar += shuffled[i]+" ";
    }

    results.innerText = shuffledPar;
}

// Sentence Combiner Button
const combBut = document.getElementById("sc");
combBut.addEventListener("click", sentenceCombiner);

function sentenceCombiner() {
    let rm = RiTa.markov(3);
    rm.addText(manifesto2);
    sentences = rm.generate(3);
    console.log(sentences);
    results.innerText = sentences[0]+"\n"+"\n"+"\n"+sentences[1]+"\n"+"\n"+"\n"+sentences[2];
}

// 17 Paragraph Manifesto
const seventeenPar = document.getElementById("17p");
seventeenPar.addEventListener("click", seventeenParagraphs);

function seventeenParagraphs() {
    let lineBreaks = "\n\n\n";
    let sectionLength = manifesto.sections.length;
    console.log(sectionLength);
    let shortManifesto = "";

    for (let i = 0; i < sectionLength; i++) {
        let ranParagraph = Math.floor(Math.random() * (Object.keys(manifesto.sections[i].paragraphs).length));
        let paragraphName = manifesto.sections[i].name;
        let paragraphLength = manifesto.sections[i].paragraphs[ranParagraph].sentences.length;
        let paragraphContent = "";

        for (let j = 0; j < paragraphLength; j++) {
            let sentenceContent = manifesto.sections[i].paragraphs[ranParagraph].sentences[j]+" ";
            paragraphContent += sentenceContent;
        }

        console.log(paragraphName);
        console.log(paragraphContent);
        shortManifesto += paragraphName;
        shortManifesto += lineBreaks;
        shortManifesto += paragraphContent;
        shortManifesto += lineBreaks;
    }
    results.innerText = shortManifesto;

}

// 17 Sentence Manifesto

const seventeenSent = document.getElementById("17s");
seventeenSent.addEventListener("click", seventeenSentences);

function seventeenSentences() {
    let sectionLength = manifesto.sections.length;
    let shortManifesto = "";
    let lineBreaks = "\n\n\n";

    for (let i = 0; i < sectionLength; i++) {
        let ranParagraph = Math.floor(Math.random() * (Object.keys(manifesto.sections[i].paragraphs).length));
        let paragraphName = manifesto.sections[i].name;
        let ranSent = Math.floor(Math.random() * (Object.keys(manifesto.sections[i].paragraphs[ranParagraph].sentences).length));
        let paragraphContent = manifesto.sections[i].paragraphs[ranParagraph].sentences[ranSent]; 

        console.log(paragraphName);
        console.log(paragraphContent);
        shortManifesto += paragraphName;
        shortManifesto += lineBreaks;
        shortManifesto += paragraphContent;
        shortManifesto += lineBreaks;
    }
    results.innerText = shortManifesto;
}