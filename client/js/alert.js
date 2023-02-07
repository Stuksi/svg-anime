function alertElement(message) {
  return document.createElement(`
    <div class="alert">
      <span class="alert-message">${message}</span>
    </div>
  `);
}

function alertHandle(element) {
  element.style.visibility = 'visible';
  element.style.opacity = '1';

  setTimeout(() => {
    element.style.visibility = 'hidden';
    element.style.opacity = '0';
  }, 3000);
}

export function alertError(message) {
  const element = alertElement(message);
  element.classList.add('alert-error');
  alertHandle(element);
}

export function alertSuccess(message) {
  const element = alertElement(message);
  element.classList.add('alert-success');
  alertHandle(element);
}
