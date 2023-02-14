function alertElement(message) {
  const element = document.createElement('div');

  element.setAttribute('id', 'alert');
  element.innerHTML = `<span class="alert-message">${message}</span>`;

  return element;
}

function alert(type, message) {
  document.getElementById('alert')?.remove();

  const element = alertElement(message);
  element.classList.add(`alert-${type}`);

  document.getElementById('root').appendChild(element);
}

export function alertError(message) {
  alert('error', message);
}

export function alertSuccess(message) {
  alert('success', message);
}
