import { get } from './api.js';

async function authorize() {
  const response = await get('login');
  const forbidden = location.href.includes('login.html') || location.href.includes('register.html');
  console.log(response);
  if (response.success !== undefined) {
    if (forbidden) {
      location.href = '../html/home.html';
    }

    return;
  }

  if (!forbidden) {
    location.href = '../html/login.html';
  }
}

await authorize();
