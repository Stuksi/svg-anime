import { alertError, alertSuccess } from './alert.js';

async function api(url, method, body) {
  let payload = null;
  const token = localStorage.getItem('token');

  if (method !== 'GET') {
    payload = new FormData();

    for (const key in body) {
      payload.append(key, body[key]);
    }
  }

  const response = await fetch(`http://localhost:3000/${url}`, {
    method,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: payload
  });
  const json = await response.json();

  if (response.status < 200 || response.status > 299) {
    if (response.status != 401) {
      alertError(json.error);
    }
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
