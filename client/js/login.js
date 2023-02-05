import { post } from './api.js';

async function login() {
  const username = document.getElementById('log-username').value;
  const password = document.getElementById('log-password').value;

  const authentication = await post('login', { username, password });

  if (authentication['status'] === 401) {
    return;
  }

  localStorage.setItem('token', authentication['token']);
  location.href = '../html/home.html';
}

window.login = login;
