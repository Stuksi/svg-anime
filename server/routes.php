<?php

require_once 'db.php';

function registration_route() {
  $method = $_SERVER['REQUEST_METHOD'];
  if ($method == 'OPTIONS') {
    return render(200, ['success' => 'Success!']);
  }

  $db = db_connection();
  if ($method == 'POST') {
    $username = $_POST['username'];
    if (strlen($username) < 4 || strlen($username) > 16) {
      return render(400, ['error' => 'Username must be between 4 and 16 characters long!']);
    }

    $users = $db->query("SELECT * FROM users WHERE username='$username'");

    if ($users->num_rows > 0) {
      return render(400, ['error' => 'Username already in use!']);
    } else {
      $password = $_POST['password'];
      if (strlen($password) < 6 || strlen($password) > 32) {
        return render(400, ['error' => 'Password must be between 6 and 32 characters long!']);
      }

      $token = bin2hex(random_bytes(16));

      $db->query("INSERT INTO users (username, password, token) VALUES ('$username', '$password', '$token')");

      render(200, ['token' => $token]);
    }

    return;
  }

  render_invalid_method();
}

function login_route() {
  $method = $_SERVER['REQUEST_METHOD'];
  if ($method == 'OPTIONS') {
    return render(200, ['success' => 'Success!']);
  }

  $db = db_connection();
  if ($method == 'GET') {
    $token = authorization_token();

    if ($db->query("SELECT * FROM users WHERE token='$token'")->num_rows > 0) {
      render(200, ['success' => 'Successfully authorized session!']);
    } else {
      render(401, ['error' => 'Unauthorized access!']);
    }

    return;
  }

  if ($method == 'POST') {
    $username = $_POST['username'];
    $users = $db->query("SELECT id, password FROM users WHERE username='$username'");

    if ($users->num_rows > 0) {
      $user = $users->fetch_assoc();
      $user_id = $user['id'];
      $password = $user['password'];

      if ($_POST['password'] == $password) {
        $token = bin2hex(random_bytes(16));
        $db->query("UPDATE users SET token='$token' WHERE id=$user_id");

        return render(200, ['token' => $token]);
      }
    }

    return render(400, ['error' => 'Invalid username or password!']);
  }

  render_invalid_method();
}

function library_route() {
  $method = $_SERVER['REQUEST_METHOD'];
  if ($method == 'OPTIONS') {
    return render(200, ['success' => 'Success!']);
  }

  $token = authorization_token();
  if ($token == null) {
    return render(401, ['error' => 'Unauthorized access!']);
  }

  $db = db_connection();
  $current_user = $db->query("SELECT * FROM users WHERE token='$token'")->fetch_assoc();

  if ($current_user == null) {
    return render(401, ['error' => 'Unauthorized access!']);
  }

  if ($method == 'GET') {
    $user_id = $current_user['id'];
    $library = $db->query("SELECT name, content FROM library WHERE user_id=$user_id ORDER BY createdat")->fetch_all(MYSQLI_ASSOC);

    return render(200, ['library' => $library]);
  }

  if ($method == 'POST') {
    $user_id = $current_user['id'];

    $name = $_POST['name'];
    if (strlen($name) < 1 || strlen($name) > 16) {
      return render(400, ['error' => 'SVG name must be between 1 and 16 characters long!']);
    }

    if($db->query("SELECT * FROM library WHERE name='$name'")->num_rows > 0) {
      return render(400, ['error' => 'SVG name already in use!']);
    }

    $content = $_POST['content'];
    // if (!preg_match('/^<svg.*<\/svg>$/', $content)) {
    //   return render(400, ['error' => 'SVG is not valid!']);
    // }

    $db->query("INSERT INTO library (user_id, name, content) VALUES ($user_id, '$name', '$content')");

    return render(200, ['success' => "Successfully saved SVG $name!"]);
  }

  render_invalid_method();
}

function render_invalid_route() {
  render(404, ['error' => 'Invalid route!']);
}

function render_invalid_method() {
  render(400, ['error' => 'Invalid route method!']);
}

function render($status, $body) {
  http_response_code($status);
  echo(json_encode($body));
}

function authorization_token() {
  if (!empty($_SERVER["Authorization"])) {
    if (preg_match('/Bearer\s(\S+)/', $_SERVER["Authorization"], $matched_token)) {
      return $matched_token[1];
    }
  }

  if (!empty($_SERVER["HTTP_AUTHORIZATION"])) {
    if (preg_match('/Bearer\s(\S+)/', $_SERVER["HTTP_AUTHORIZATION"], $matched_token)) {
      return $matched_token[1];
    }
  }

  return null;
}

?>
