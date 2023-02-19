#!/bin/bash

if ! command -v php &> /dev/null; then
    sudo apt install -y php
fi

if ! command -v mysql &> /dev/null; then
  sudo apt-get install -y mysql-server
fi

if ! command  php -m | grep mysqli &> /dev/null; then
  sudo apt-get install -y php-mysqli
fi

source .env

DB_HOST=${DB_HOST}
DB_USER=${DB_USER}
DB_PASS=${DB_PASS}
DB_NAME=${DB_NAME}

SQL_COMMANDS="
CREATE USER '$DB_USER'@'$DB_HOST' IDENTIFIED BY '$DB_PASS';
GRANT ALL PRIVILEGES ON *.* TO '$DB_USER'@'$DB_HOST';

GRANT ALL PRIVILEGES ON '$DB_NAME'.* TO '$DB_USER'@'$DB_HOST';
"

echo "$SQL_COMMANDS" | mysql -u root -p

if [ $? -ne 0 ]; then
  echo "Error: Failed to execute SQL commands"
  exit 1
fi

echo "User and database created successfully"