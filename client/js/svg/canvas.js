function render(event) {
  event.preventDefault();

  const input = event.target.value.trim();
  const canvas = document.getElementById('canvas');

  if (!(/<svg(?: .*?)>.*<\/svg>/s.test(input))) {
    canvas.innerHTML = '<span>Invalid SVG Code!</span>';
  } else {
    canvas.innerHTML = input;
  }
}

function preload(event) {
  event.preventDefault();

  const input = localStorage.getItem('input');

  document.getElementById('input').value = input;
  canvas.innerHTML = input;

  localStorage.removeItem('input');
}

document.addEventListener('DOMContentLoaded', preload);
document.getElementById('input').addEventListener('input', render);
