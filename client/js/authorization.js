const token = localStorage.getItem('token');

if (token === null) {
  if (!location.href.match(/.*\/html\/authentication.html$/)) {
    location.href = '../html/authentication.html';
  }
} else {
  fetch(`${env.SERVER_API}/login`, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }).then((response) => {
    const authorization = JSON.parse(response);

    if (authorization['status'] === 401) {
      location.href = '../html/authentication.html';
    } else {
      if (location.href.match(/.*\/html\/authentication.html$/)) {
        location.href = '../html/home.html';
      }
    }
  });
}
