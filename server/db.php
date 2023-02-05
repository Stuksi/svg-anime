<?php

require_once 'env.php';

function db_connection() {
  $db_host = getenv('DB_HOST');
  $db_port = getenv('DB_PORT');
  $db_user = getenv('DB_USER');
  $db_pass = getenv('DB_PASS');
  $db_name = getenv('DB_NAME');

  return mysqli_connect("p:$db_host", $db_user, $db_pass, $db_name, $db_port);
}

function db_setup() {
  $db = db_connection();

  $db->query('DROP TABLE IF EXISTS library');
  $db->query('DROP TABLE IF EXISTS users');

  $db->query('
    CREATE TABLE users (
      id        INT         NOT NULL AUTO_INCREMENT,
      username  VARCHAR(16) NOT NULL UNIQUE,
      password  VARCHAR(60) NOT NULL,
      token     VARCHAR(64),
      createdat TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY(id)
    )
  ');

  $db->query('
    CREATE TABLE library (
      id        INT         NOT NULL AUTO_INCREMENT,
      user_id   INT         NOT NULL,
      name      VARCHAR(32) NOT NULL,
      content   TEXT        NOT NULL,
      createdat TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY(id),
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  ');
}

if (getenv('DB_SETUP') == true) {
  db_setup();
}

?>
