import env from './env.js';

async function api(url, method, body) {
  const data = new FormData();
  const token = localStorage.getItem('token');

  for (const key in body) {
    data.append(key, body[key]);
  }
  console.log("mnogo stranno")

  const response = await fetch(`${env.SERVER_API}/${url}`, {
    method: method,
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: data
  });
  console.log("mnogo stranno")
  console.log(response)
  return JSON.parse(response);
}

export async function get(url) {
  return api(url, 'GET');
}

export async function post(url, body) {
  return api(url, 'POST', body);
}
