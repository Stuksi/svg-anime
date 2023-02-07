import env from './env.js';
import { alertError, alertSuccess } from './alert.js';

async function api(url, method, body) {
  const data = new FormData();
  const token = localStorage.getItem('token');

  for (const key in body) {
    data.append(key, body[key]);
  }

  const response = await fetch(`${env.SERVER_API}/${url}`, {
    method: method,
    headers: {
      // 'Authorization': `Bearer ${token}`
    },
    body: data
  });
  const json = await response.json();

  if (response.status < 200 || response.status > 299) {
    alertError(json.error);
  }

  if (json.success !== undefined) {
    alertSuccess(json.success);
  }

  return json;
}

export async function get(url) {
  return api(url, 'GET');
}

export async function post(url, body) {
  return api(url, 'POST', body);
}
