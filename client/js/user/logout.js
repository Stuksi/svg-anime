function logout() {
  localStorage.removeItem('token');
  location.href = '../html/login.html';
}

document.getElementById('logout').addEventListener('click', (event) => {
  event.preventDefault();
  logout();
});
