import { post } from './api.js';

async function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const authentication = await post('login', { username, password });

  if (authentication.error === undefined) {
    localStorage.setItem('token', authentication['token']);
    location.href = '../html/home.html';
  }
}

window.login = login;
