#!/bin/sh

# Esperar a que la base de datos esté disponible
echo "Esperando a la base de datos..."
# while ! nc $DB_HOST $DB_PORT; do
#   sleep 1
# done
echo "¡Base de datos disponible!"

# Limpiar cachés de Laravel
php artisan config:clear
php artisan cache:clear

# Ejecutar migraciones
php artisan migrate --force

# Iniciar Apache
apache2-foreground
