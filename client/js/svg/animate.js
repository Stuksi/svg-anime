function animate(event) {
  event.preventDefault();

  const canvas = document.getElementById('canvas');

  const object = canvas.querySelector('svg');
  object.remove();

  const paths = object.querySelectorAll('path');
  paths.forEach((path, index) => {
    const length = path.getTotalLength();

    path.classList.add('animate');

    path.style.animation = `stroke-offset 0.5s linear forwards ${(index + 1) * 0.5}s`;
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;
  });

  canvas.appendChild(object);
}

document.getElementById('animate').addEventListener('click', animate);
