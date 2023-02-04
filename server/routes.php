<?php

require_once 'db.php';

function registration_route() {
  $method = $_SERVER['REQUEST_METHOD'];
  $db = db_connection();

  if ($method == 'POST') {
    $username = $_POST['username'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    $db->query("INSERT INTO users (username, password) VALUES ('$username', '$password')");

    echo(json_encode(['status' => 200]));
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

    $authorization = $db->query("SELECT EXISTS(SELECT FROM users WHERE id='$id' AND token='$token')")->fetch_assoc();

    if ($authorization == 1) {
      echo(json_encode(['status' => 200]));
    } else {
      echo(json_encode(['status' => 401]));
    }

    return;
  }

  if ($method == 'POST') {
    $username = $_POST['username'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    $user = $db->query("SELECT FROM users WHERE username='$username' AND password='$password'")->fetch_assoc();

    if ($user != null) {
      $id = $user['id'];
      $token = random_bytes(64);

      $db->query("UPDATE users SET token=$token WHERE id='$id'");

      echo(json_encode(['status' => 200]));
    } else {
      echo(json_encode(['status' => 401]));
    }

    return;
  }

  unknown_method();
}

function library_route() {
  $method = $_SERVER['REQUEST_METHOD'];
  $db = db_connection();

  if ($method == 'GET') {
    $user_id = $_POST['user_id'];

    $library = $db->query("SELECT name, content FROM library WHERE user_id='$user_id' ORDER BY createdat")->fetch_all();

    echo(json_encode(['status' => 200, 'library' => $library]));
    return;
  }

  if ($method == 'POST') {
    $user_id = $_POST['user_id'];
    $name = $_POST['name'];
    $content = $_POST['content'];

    $db->query("INSERT INTO library (user_id, name, content) VALUES ('$user_id', '$name', '$content')");

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
