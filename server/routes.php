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

  unknown_route();
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

    $authorization = $db->query("SELECT EXISTS(SELECT FROM users WHERE username='$username' AND password='$password')")->fetch_assoc();

    if ($authorization == 1) {
      echo(json_encode(['status' => 200]));
    } else {
      echo(json_encode(['status' => 401]));
    }

    return;
  }

  unknown_route();
}

function library_route() {
  $method = $_SERVER['REQUEST_METHOD'];
  $db = db_connection();

  if ($method == 'GET') {
    $user_id = $_POST['user_id'];

    $library = $db->query("SELECT svg FROM library WHERE user_id='$user_id' ORDER BY createdat")->fetch_all();

    echo(json_encode(['status' => 200, 'library' => $library]));
    return;
  }

  if ($method == 'POST') {
    $user_id = $_POST['user_id'];
    $svg = $_POST['svg'];

    $db->query("INSERT INTO library (user_id, svg) VALUES ('$user_id', '$svg')");

    echo(json_encode(['status' => 200]));
    return;
  }

  unknown_route();
}

function unknown_route() {
  echo(json_encode(['status' => 404]));;
}

?>
