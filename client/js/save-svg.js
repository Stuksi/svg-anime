import { alertSuccess } from './alert.js';
import { post } from './api.js';

async function save() {
  const content = document.getElementById('code-input').value.trim();
  const name = prompt("Enter name for the SVG"); // Change for better ui

  const response = await post('library', {name,  content});
  if (response.success !== undefined) {
    alertSuccess(response.success);
  }
}

document.getElementById('save-svg').addEventListener('click', async (event) => {
  event.preventDefault();
  await save();
});
