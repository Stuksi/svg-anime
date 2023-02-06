<?php

require_once 'db.php';

function registration_route() {
  $method = $_SERVER['REQUEST_METHOD'];
  $db = db_connection();

  if ($method == 'POST') {
    $username = $_POST['username'];
    $users = $db->query("SELECT * FROM users WHERE username='$username'");

    if ($users->num_rows > 0) {
      http_response_code(400);
      echo(json_encode(['status' => 400]));
    } else {
      $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
      $token = base64_encode(random_bytes(32));

      $db->query("INSERT INTO users (username, password, token) VALUES ('$username', '$password', '$token')");
      error_log($db->error);
      error_log(strlen($token));
    
      $user_id = $db->query("SELECT id FROM users WHERE username='$username'")->fetch_assoc();
      http_response_code(200);
      echo(json_encode(['token' => $token, 'user_id' => $user_id]));
    }

    return;
  }

  unknown_method();
}

function login_route() {
  $method = $_SERVER['REQUEST_METHOD'];
  $db = db_connection();

  if ($method == 'GET') {
    $id = $_GET['id'];
    $token = $_GET['token'];

    $users = $db->query("SELECT * FROM users WHERE id='$id' AND token='$token'");

    if ($users->num_rows > 0) {
      http_response_code(200);
    } else {
      http_response_code(401);
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

      if (password_verify($_POST['password'], $password))
      {
        $token = base64_encode(random_bytes(32));
        $db->query("UPDATE users SET token='$token' WHERE id=$user_id");

        echo(json_encode(['token' => $token, 'user_id' => $user_id]));
        http_response_code(200);
        return;
      }
    }

    http_response_code(401);
    return;
  }

  unknown_method();
}

function library_route() {
  $method = $_SERVER['REQUEST_METHOD'];
  $db = db_connection();

  if ($method == 'GET') {
    $user_id = $_GET['user_id'];
    $library = $db->query("SELECT name, content FROM library WHERE user_id='$user_id' ORDER BY createdat")->fetch_all(MYSQLI_ASSOC);
    echo(json_encode(['status' => 200, 'library' => $library]));
    return;
  }

  if ($method == 'POST') {
    $user_id = (int)$_POST['user_id'];
    $name = $_POST['name'];
    $content = $_POST['content'];

    $db->query("INSERT INTO library (user_id, name, content) VALUES ($user_id, '$name', '$content')");

    echo(json_encode(['status' => 200]));
    return;
  }

  unknown_method();
}

function unknown_route() {
  echo(json_encode(['status' => 404]));
}

function unknown_method() {
  echo(json_encode(['status' => 400]));
}

?>
