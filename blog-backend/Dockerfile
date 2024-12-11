FROM php:8.1-fpm

# Instalar dependencias
RUN apt-get update && apt-get install -y libpng-dev libjpeg-dev libfreetype6-dev zip git && \
    docker-php-ext-configure gd --with-freetype --with-jpeg && \
    docker-php-ext-install gd pdo pdo_mysql

# Configurar el directorio de trabajo
WORKDIR /var/www

# Copiar el código fuente al contenedor
COPY . .

# Instalar Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Instalar dependencias de Laravel
RUN composer install

# Exponer el puerto
EXPOSE 9000
CMD ["php-fpm"]
