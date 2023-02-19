<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');

require_once 'routes.php';
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri_segments = explode('/', $uri);

if (count($uri_segments) != 4) {
  return render_invalid_route();
}

$uri_location = $uri_segments[3];
if ($uri_location == 'registration') {
  return registration_route();
}

if ($uri_location == 'login') {
  return login_route();
}

if ($uri_location == 'library') {
  return library_route();
}

?>
