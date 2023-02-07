import { post } from './api.js';


function saveSVG() {
  let svg_code = document.getElementById("code-input").value
  const svgRegex = /<svg(?:.*?)>(.*?)<\/svg>/s;
  const match = svgRegex.exec(svg_code.trim());

  if (!svg_code || !match) {
    alert("No valid svg detected!");
    return;
  }

  let name = prompt("Enter name for the SVG");
  post('library', {name,  content: svg_code});
}

window.saveSVG=saveSVG;