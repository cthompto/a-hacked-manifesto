// Main text modification and generation script
// For "A Hacked Manifesto"

// Global data, variables, and constants
var manifesto;
fetch('./text/hacker-text.json')
  .then(response => response.json())
  .then(data => {
    manifesto = data;})
    .then((responseJson) => {
        this.underlayText(responseJson);
      })
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
const underlayContent = document.getElementById("underlayContent");

function underlayText() {

    
    let lineBreaks = "\n\n\n";
    //let bookLength = manifesto.sections.length;
    let fullManifesto = "";

    for (let i = 0; i < 1; i++) {
        
        let sectionName = manifesto.sections[i].name;
        let sectionLength = manifesto.sections[i].paragraphs.length;
        let sectionContent = "";

        for (let j = 0; j < sectionLength; j++) {
            
            let paragraphLength = manifesto.sections[i].paragraphs[j].sentences.length;
            let paragraphNumber = manifesto.sections[i].paragraphs[j].number;
            let paragraphContent = "";
            paragraphContent += paragraphNumber;
            paragraphContent += "\n\n";

            for (let k = 0; k < paragraphLength; k++) {
                let sentenceContent = manifesto.sections[i].paragraphs[j].sentences[k]+" ";
                paragraphContent += sentenceContent;
            }
            sectionContent += paragraphContent;
            sectionContent += lineBreaks;
        }
        fullManifesto += sectionName;
        fullManifesto += sectionContent;
    }

    underlayContent.innerText = fullManifesto;
    console.log("'Results' area updated.")

}



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
    let sentence = manifesto.sections[ranSec].paragraphs[ranPar].sentences[ranLin];
    results.innerText = sentence;
    console.log("'Results' area updated.")
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
    console.log("'Results' area updated.")
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

    let shuffled = unshuffled
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
    
    shuffledPar += sectionName;
    shuffledPar += lineBreaks;

    for (let i = 0; i < paragraphLength; i++) {
        shuffledPar += shuffled[i]+" ";
    }

    results.innerText = shuffledPar;
    console.log("'Results' area updated.")
}

// Sentence Combiner Button
const combBut = document.getElementById("sc");
combBut.addEventListener("click", sentenceCombiner);

function sentenceCombiner() {
    let rm = RiTa.markov(3);
    rm.addText(manifesto2);
    sentences = rm.generate(3);
    results.innerText = sentences[0]+"\n"+"\n"+"\n"+sentences[1]+"\n"+"\n"+"\n"+sentences[2];
    console.log("'Results' area updated.")
}

// 17 Paragraph Manifesto
const seventeenPar = document.getElementById("17p");
seventeenPar.addEventListener("click", seventeenParagraphs);

function seventeenParagraphs() {
    let lineBreaks = "\n\n\n";
    let sectionLength = manifesto.sections.length;
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

        shortManifesto += paragraphName;
        shortManifesto += lineBreaks;
        shortManifesto += paragraphContent;
        shortManifesto += lineBreaks;
    }
    results.innerText = shortManifesto;
    console.log("'Results' area updated.")
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

        shortManifesto += paragraphName;
        shortManifesto += lineBreaks;
        shortManifesto += paragraphContent;
        shortManifesto += lineBreaks;
    }
    results.innerText = shortManifesto;
    console.log("'Results' area updated.")
}

// Text Replacer Button
const trBut = document.getElementById("tr")
trBut.addEventListener("click", textReplacer);

function textReplacer() {
    let placeHolder1 = "This function will be added in the future. "
    let placeHolder2 = "Replaces one word with another in a given section and paragraph."
    let placeholderContent = ""
    placeholderContent += placeHolder1;
    placeholderContent += placeHolder2;
    results.innerHTML = placeholderContent;
    console.log("'Results' area updated.")
}

// Splicer Button
const splicerBut = document.getElementById("spli")
splicerBut.addEventListener("click", splicer);

function splicer() {
    let placeHolder1 = "This function will be added in the future. "
    let placeHolder2 = "Merges a user provided text with a section from the manifesto using Markov chains."
    let placeholderContent = ""
    placeholderContent += placeHolder1;
    placeholderContent += placeHolder2;
    results.innerHTML = placeholderContent;
    console.log("'Results' area updated.")
}