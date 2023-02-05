import { post } from './api.js';

async function register() {
  const username = document.getElementById('reg-username').value;
  const password = document.getElementById('reg-password').value;
  const passwordConfirmation = document.getElementById('confirm-password').value;

  if (password !== passwordConfirmation) {
    alert("Typ si");
    return;
  }

  const registration = await post('registration', { username, password });

  localStorage.setItem('token', registration['token']);
  localStorage.setItem('user_id', registration['user_id']);
  location.href = '../html/home.html';
}

window.register = register;
