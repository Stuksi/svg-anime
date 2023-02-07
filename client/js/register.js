import { post } from './api.js';
import { alertError } from './alert.js';

async function register() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const passwordConfirmation = document.getElementById('confirm-password').value;

  if (password !== passwordConfirmation) {
    alertError('Passwords do not match!');
  }

  const registration = await post('registration', { username, password });

  if (registration.error === undefined) {
    localStorage.setItem('token', registration['token']);
    localStorage.setItem('user_id', registration['user_id']);
    location.href = '../html/home.html';
  }
}

window.register = register;
