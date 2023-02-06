const codeInput = document.querySelector('#code-input');
const svgRender = document.querySelector('#svg-render');

function validateSVG(svgCode) {
  const svgRegex = /<svg(?:.*?)>(.*?)<\/svg>/s;
  const match = svgRegex.exec(svgCode.trim());

  if (!match) {
    return '<p>Please input a valid SVG code</p>';
  }

  return match[0];
}

function renderSVG()
{
  svgRender.innerHTML = validateSVG(codeInput.value);
}

codeInput.addEventListener('input', renderSVG);
document.addEventListener("DOMContentLoaded", renderSVG);

var inputTest = localStorage.getItem('codeInput');
codeInput.value = inputTest;
localStorage.removeItem('codeInput');
