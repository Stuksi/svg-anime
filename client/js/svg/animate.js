function animate(event) {
  event.preventDefault();

  const canvas = document.getElementById('canvas');
  const speed = (100 - document.getElementById('speed').value) / 100 + 0.01;

  const object = canvas.querySelector('svg');
  object.remove();

  const paths = object.querySelectorAll('path');
  paths.forEach((path, index) => {
    const length = path.getTotalLength();
    const strokeColor = path.getAttribute("stroke");
    const strokeWidth = path.getAttribute("stroke-width");

    path.classList.add('animate');

    path.style.animation = `stroke-offset ${speed}s linear forwards ${(index + 1) * speed}s`;
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;
    path.style.stroke = strokeColor;
    path.style.strokeWidth = strokeWidth;
  });

  canvas.appendChild(object);
}

document.getElementById('animate').addEventListener('click', animate);
