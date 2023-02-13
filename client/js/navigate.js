function home(event) {
  event.preventDefault();
  location.href = '../html/home.html';
}

function library() {
  event.preventDefault();
  location.href = '../html/library.html';
}

function logout(event) {
  event.preventDefault();

  localStorage.removeItem('token');
  location.href = '../html/login.html';
}

document.getElementById('home').addEventListener('click', home);
document.getElementById('library').addEventListener('click', library);
document.getElementById('logout').addEventListener('click', logout);
