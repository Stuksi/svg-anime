import { get } from './api.js';

const token = localStorage.getItem('token');

if (token === null) {
  if (!location.href.match(/.*\/html\/authentication.html$/)) {
    location.href = '../html/authentication.html';
  }
} else {
  const authorization = await get('login');

  if (authorization['status'] === 401) {
    location.href = '../html/authentication.html';
  } else {
    if (location.href.match(/.*\/html\/authentication.html$/)) {
      location.href = '../html/home.html';
    }
  }
}
