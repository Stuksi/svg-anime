function animateAll(event) {
  event.preventDefault();

  const canvas = document.getElementById('canvas');

  const object = canvas.querySelector('svg');
  object.remove();

  const paths = object.querySelectorAll('path');
  paths.forEach((path, index) => animateSingle(path, (index + 1) * 0.5));

  canvas.appendChild(object);
}

function animateSingle(path, time) {
  const length = path.getTotalLength();

  path.classList.add('animate');

  path.style.animation = `stroke-offset 0.5s linear forwards ${time}s`;
  path.style.strokeDasharray = length;
  path.style.strokeDashoffset = length;
}

document.getElementById('animate').addEventListener('click', animateAll);

document.getElementById('canvas')?.querySelectorAll('path').forEach((path) => {
  const control = document.getElementById('control');
  const button = document.createElement('button');

  button.addEventListener('click', (event) => {
    event.preventDefault();
    animateSingle(path, 0.5);
  })

  control.appendChild(button);
});
