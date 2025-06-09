> # Despliegue del TFG BarHub

> [***Despliegue realizado por Juan Parejo García***](https://github.com/PapiAlca)

> **URL Página Principal:** [*https://barhub.duckdns.org/*](https://barhub.duckdns.org/)

## 0.- Introducción:

### 0.1.- Requisitos:

- Una VPS en azure con linux con docker instalado
- Una network ya creada llamada *`mi_red`*
- Tendremos que tener un repositorio privado en el git, el mio se llamara juan


### 0.2.- Recursos:

Dentro de la carpeta [*/documentacion/despliegue/recursos*](/documentacion/despliegue/recursos) están todos los archivos que he necesitado para esta práctica y dentro de la carpeta. Entre ellos archivos .yml el .wav y algunas imágenes que mostraré en el readme.

Los demás recursos como toda la configuración del Caddyfile y los contenedores estarán dentro de la carpeta [*/documentacion/despliegue/recursos*](/documentacion/despliegue/recursos)

### 0.3.- Estructura de directorios y archivos en la vps:

## 1.- Creación de contenedores previos al despliegue de la aplicación:

Primero debemos desplegar unos contenedores unos esenciales y otros no tanto para luego poder desplegar la aplicación:

### 1.1.- Contenedor de duckdns:

Este contenedor sirve para

```bash
mkdir duckdns
cd duckdns
nano .env
nano docker-compose.yml
```

En el .env pondremos el token y la ip publica que le daremos a nuestro url de duckdns

### 1.2.- Contenedor de gitbare:

### 1.3.- Contenedor de mariadb:

Este contenedor sirve para alojar la base de datos en la vps.

```bash
mkdir mariadb
cd mariadb
nano docker-compose.yml
```

### 1.4.- Contenedor de uptime-kuma:

Este contedor es opcional pero es necesario para monitorizar las url que queramos monitorizar.

```bash
mkdir kuma
cd kuma
nano docker-compose.yml
```

### 1.5.- Contenedor de caddy:

Este contenedor conectara nuestros contenedores de nuestra maquina virtual con la ip publica asociada a una url via duckdns, basicamente actuara de proxy inverso.

```bash
mkdir caddy
cd caddy
nano docker-compose.yml
nano Caddyfile
```

## 2.- Despliegue de la aplicación:

Vamos a crear dentro de la vps un directorio llamado app donde estará un docker-compose.yml

### 2.1.- Despliegue del backend y de la base de datos:

### 2.1.1.- Creación de Dockerfile:

Primero tenemos que crear un Dockerfile y situarlo en la raiz del proyecto. 

Y en la maquina virtual crearemos en la raiz el directorio backend:
```bash
mkdir backend
```

### 2.1.2.- Despliegue del backend en la vps:

Primero tenemos que generar el .jar y al tener el backend en gradle lo podemos hacer asi de simple, abrimos un terminal y escribimos esto:
```cmd
.\gradlew clean build -x test
```

Nos situamos en la carpeta del backend donde está el .jar:
```cmd
cd C:\Users\User\Documents\GitHub\BarHub\BarHub-BackendSpring\build\libs
```

Luego con scp mandaremos esta carpeta a la vps:
```cmd
scp -i "C:\Users\User\.ssh\id_rsa.pem" .\BarHub-0.0.1-SNAPSHOT.jar juan@20.199.89.174:~/backend/
```

Nos vamos a la carpeta del backend:
```bash
cd backend
```

Creamos el Dockerfile y el compose y luego hacemos:
```bash
docker compose up -d --build
```

### 2.2.- Despliegue del frontend

#### 2.2.1.- Creación del Dockerfile:

Primero crearemos un dockerfile y lo pondremos en el directorio raiz al igual que con el backend

Y dentro de la carpeta app crearemos la carpeta para guardar todos los archivos y directorios del frontend:
```bash
mkdir frontend
```

#### 2.2.2.- Despliegue del frontend en la vps:

Comprimimos el angular:
```bash
ng build --configuration production
```

Subimos el frontend a la vps:
```bash
scp -i "C:\Users\User\.ssh\id_rsa.pem" -r C:\Users\User\Documents\GitHub\BarHub\BarHub-FrontendAngular\dist\barhub juan@20.199.89.174:~/frontend/
```

### 2.3.- Despliegue final:

Para finalizar creamos el Dockerfile y el compose y lo levantamos:
```bash
docker compose up -d --build
```