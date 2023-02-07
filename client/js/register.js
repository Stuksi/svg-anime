import { post } from './api.js';
import { alertError } from './alert.js';

async function register() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const passwordConfirmation = document.getElementById('confirm-password').value;

  if (username === '' || password === '' || passwordConfirmation === '') {
    alertError('Please enter all fields!');
    return;
  }

  if (password !== passwordConfirmation) {
    alertError('Passwords do not match!');
    return;
  }

  const registration = await post('registration', { username, password });

  if (registration.error === undefined) {
    localStorage.setItem('token', registration['token']);
    location.href = '../html/home.html';
  }
}

document.getElementById('registration').addEventListener('submit', async (event) => {
  event.preventDefault();
  await register();
});
