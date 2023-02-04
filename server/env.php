<?php

$env_vars = file('.env', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

foreach ($env_vars as $env_var) {
  putenv($env_var);
}

?>
