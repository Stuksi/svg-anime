import env from './env.js';

async function api(url, method, body) {
  const token = localStorage.getItem('token');
  const response = fetch(`${env.SERVER_API}/${url}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(body)
  });

  return JSON.parse(response);
}

export async function get(url) {
  return api(url, 'GET');
}

export async function post(url, body) {
  return api(url, 'POST', body);
}
