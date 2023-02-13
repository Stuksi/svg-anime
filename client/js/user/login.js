import { post } from '../api.js';

async function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username === '' || password === '') {
    alertError('Please enter all fields!');
    return;
  }

  const authentication = await post('login', { username, password });

  if (authentication.error === undefined) {
    localStorage.setItem('token', authentication['token']);
    location.href = '../html/home.html';
  }
}

document.getElementById('login').addEventListener('submit', async (event) => {
  event.preventDefault();
  await login();
});
