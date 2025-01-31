# Usa una imagen de PHP con Apache
FROM php:8.2-apache

# Instala dependencias y extensiones de PHP
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    unzip \
    git \
    libpq-dev \                     
    && docker-php-ext-configure gd \
    && docker-php-ext-install gd pdo pdo_pgsql \  
    && a2enmod rewrite

# Instala Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copia los archivos del proyecto
COPY . /var/www/html

# Configura Apache para que el DocumentRoot sea /public
RUN sed -i "s|DocumentRoot /var/www/html|DocumentRoot /var/www/html/public|g" /etc/apache2/sites-available/000-default.conf

# Configura permisos adecuados para Laravel
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 775 /var/www/html/storage \
    && chmod -R 775 /var/www/html/bootstrap/cache

# Establece el directorio de trabajo en la raíz del proyecto
WORKDIR /var/www/html

# Ejecuta Composer para instalar dependencias
RUN composer install --no-dev --optimize-autoloader

# Copia el script de inicio
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Expone el puerto 80 para Apache
EXPOSE 80

# Comando de inicio del contenedor
CMD ["sh", "/usr/local/bin/docker-entrypoint.sh"]
