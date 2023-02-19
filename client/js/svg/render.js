function render(event) {
  event.preventDefault();

  const input = event.target.value.trim();
  const canvas = document.getElementById('canvas');

  if (!(/<svg(?: .*?)>.*<\/svg>/s.test(input))) {
    canvas.innerHTML = '<span>Invalid SVG Code!</span>';
  } else {
    canvas.innerHTML = input;
    resize();
  }
}

function preload(event) {
  event.preventDefault();

  const input = localStorage.getItem('input');

  document.getElementById('input').value = input;
  canvas.innerHTML = input;
  resize();

  localStorage.removeItem('input');
}

function resize() {
  const canvas = document.getElementById('canvas');
  const object = canvas.querySelector('svg');

  object?.setAttribute('height', '100%');
  object?.setAttribute('width', '100%');
}

document.addEventListener('DOMContentLoaded', preload);
document.getElementById('input').addEventListener('input', render);
