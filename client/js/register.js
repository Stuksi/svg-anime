import { post } from './api.js';

async function register() {
  const username = document.getElementById('reg-username').value;
  const password = document.getElementById('reg-password').value;
  const passwordConfirmation = document.getElementById('confirm-password').value;

  if (password !== passwordConfirmation) {
  console.log(password);
  console.log(passwordConfirmation);
  return;
  }

  const registration = await post('register', { username, password });

  if (registration['status'] === 400) {
    return;
  }

  localStorage.setItem('token', registration['token']);
  location.href = '../html/home.html';
}

window.register = register;
