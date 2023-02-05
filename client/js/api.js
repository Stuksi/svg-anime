import env from './env.js';

async function api(url, method, body) {
  const data = new FormData();
  const token = localStorage.getItem('token');

  for (const key in body) {
    data.append(key, body[key]);
  }

  const response = await fetch(`${env.SERVER_API}/${url}`, {
    method: method,
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: data
  });

  return JSON.parse(response);
}

export async function get(url) {
  return api(url, 'GET');
}

export async function post(url, body) {
  return api(url, 'POST', body);
}
