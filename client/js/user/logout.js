function logout(event) {
  event.preventDefault();

  localStorage.removeItem('token');
  location.href = '../html/login.html';
}

document.getElementById('logout').addEventListener('click', logout);
