var manifesto;
fetch('./text/hacker-text.json')
  .then(response => response.json())
  .then(data => console.log(data))
  .then(data => manifesto = data)
  .catch(error => console.error('Error fetching JSON:', error));

console.log(manifesto);

const ranBut = document.getElementById("rb");
ranBut.addEventListener("click", randomText);

function randomText() {
    let ranSec = manifesto;
    console.log("hi");
}