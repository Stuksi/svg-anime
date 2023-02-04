<?php

require_once 'routes.php';

$uri = $_SERVER['REQUEST_URI'];

switch (1) {
  case preg_match('/^\/registration', $uri):
    registration_route();
    break;
  case preg_match('/^\/login', $uri):
    login_route();
    break;
  case preg_match('/^\/library', $uri):
    library_route();
    break;
  default:
    unknown_route();
    break;
};

?>
