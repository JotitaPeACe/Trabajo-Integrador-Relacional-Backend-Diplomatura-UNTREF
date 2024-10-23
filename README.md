# Trailerflix API

## Descripción

Trailerflix es una API para gestionar una plataforma de streaming de películas y series. Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en contenidos, actores, géneros y categorías. La API está construida utilizando Node.js y Sequelize para interactuar con una base de datos MySQL.

## Estructura del proyecto

El proyecto está organizado de la siguiente manera:

* `/conexion/`: Archivos de conexión a la base de datos
	+ `database.js`: Configuración de la conexión a la base de datos
* `/controllers/`: Controladores que manejan la lógica de negocio
	+ `contenidoController.js`: Controlador para el contenido
* `/data/`: Archivos de datos
	+ `trailerflix.sql`: Script de creación de la base de datos
* `/json/`:
   + `trailerflix.json`: Datos de ejemplo en formato JSON
* `/models/`: Modelos de datos
	+ `contenido.js`: Modelo para el contenido
	+ `categoria.js`: Modelo para las categorías
	+ `genero.js`: Modelo para los géneros
	+ `actor.js`: Modelo para los actores
	+ `contenido_actores.js`: Modelo para la relación entre contenido y actores
	+ `contenido_generos.js`: Modelo para la relación entre contenido y géneros
* `/routes/`: Rutas de la API
	+ `contenidoRoutes.js`: Rutas para el contenido
* `app.js`: Archivo principal de la aplicación
## Funcionalidades

La API ofrece las siguientes funcionalidades:

1. **Obtener todos los contenidos**:
   - Endpoint: `GET /contenido`
   - Devuelve todos los contenidos de la base de datos.
   - Control de errores para manejar la indisponibilidad de la base de datos.

2. **Obtener un contenido por ID**:
   - Endpoint: `GET /contenido/:id`
   - Devuelve un contenido específico por su ID.
   - Control de errores para manejar casos en que el contenido no exista.

3. **Filtrar contenidos**:
   - Endpoint: `GET /contenido?titulo=...&genero=...&categoria=...`
   - Filtra los contenidos por título, género o categoría.
   - Control de errores para manejar coincidencias no encontradas o problemas de conexión.

4. **Agregar un nuevo contenido**:
   - Endpoint: `POST /contenido`
   - Permite agregar una nueva película o serie a la base de datos.
   - Validación de campos obligatorios.
   - Manejo de actores y géneros, creando o asociando según sea necesario.

5. **Actualizar un contenido**:
   - Endpoint: `PUT /contenido/:id`
   - Permite actualizar información de un contenido como temporadas, reparto, y otros campos.
   - Control de errores para manejar actualizaciones fallidas.

6. **Eliminar un contenido**:
   - Endpoint: `DELETE /contenido/:id`
   - Permite eliminar un contenido de la base de datos.
   - Control de errores para manejar problemas durante el borrado.

7. **Control de errores**:
   - Manejo de errores en la estructura de las solicitudes y respuestas.
   - Respuestas adecuadas con mensajes y códigos de error específicos.

## Estructura de la Base de Datos

La base de datos está compuesta por las siguientes tablas:

- **actores**: Almacena información sobre los actores.
  - `id` (PK)
  - `nombre`

- **categorias**: Almacena categorías de contenido.
  - `id` (PK)
  - `nombre`

- **contenido**: Almacena información sobre películas y series.
  - `id` (PK)
  - `titulo`
  - `categoria_id` (FK)
  - `gen`
  - `resumen`
  - `temporadas`
  - `duracion`
  - `trailer`
  - `poster`

- **contenido_actores**: Relaciona actores con el contenido.
  - `contenido_id` (PK, FK)
  - `actor_id` (PK, FK)

- **contenido_generos**: Relaciona géneros con el contenido.
  - `contenido_id` (PK, FK)
  - `genero_id` (PK, FK)

- **generos**: Almacena información sobre los géneros.
  - `id` (PK)
  - `nombre`

## Instalación y Ejecución

### Requisitos

* Node.js
* Base de datos (MySQL)

### Pasos

1. Clona el repositorio.
   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio-fork.git
2. Navega al directorio del proyecto:
   ```bash
   cd tu-repositorio
3. Instala las dependencias:
   ```bash
   npm install
4. Configura la conexión a la base de datos en database.js.


5. Ejecuta el script de creación de la base de datos (trailerflix.sql) en tu cliente de MySQL.


6. Inicia la aplicación con:
   ```bash
   npm start