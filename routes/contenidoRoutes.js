const express = require('express');
const router = express.Router();
const contenidoController = require('../controllers/contenidoController');

/**
 * @swagger
 * tags:
 *   name: Contenido
 *   description: Operaciones relacionadas con el contenido multimedia
 */

/**
 * @swagger
 * /contenido:
 *   get:
 *     tags: [Contenido]
 *     summary: Obtener todos los contenidos
 *     responses:
 *       200:
 *         description: Lista de contenidos
 *   post:
 *     tags: [Contenido]
 *     summary: Crear nuevo contenido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               categoria_id:
 *                 type: integer
 *               gen:
 *                 type: string
 *               resumen:
 *                 type: string
 *               temporadas:
 *                 type: string
 *               duracion:
 *                 type: string
 *               trailer:
 *                 type: string
 *               poster:
 *                 type: string
 *               actores:
 *                 type: array
 *                 items:
 *                   type: string
 *               generos:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Contenido creado
 */

/**
 * @swagger
 * /contenido/{id}:
 *   get:
 *     tags: [Contenido]
 *     summary: Obtener un contenido por ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del contenido
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Contenido encontrado
 *       404:
 *         description: Contenido no encontrado
 *   put:
 *     tags: [Contenido]
 *     summary: Actualizar contenido por ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del contenido
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               categoria_id:
 *                 type: integer
 *               gen:
 *                 type: string
 *               resumen:
 *                 type: string
 *               temporadas:
 *                 type: string
 *               duracion:
 *                 type: string
 *               trailer:
 *                 type: string
 *               poster:
 *                 type: string
 *               actores:
 *                 type: array
 *                 items:
 *                   type: string
 *               generos:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Contenido actualizado
 *       404:
 *         description: Contenido no encontrado
 */

/**
 * @swagger
 * /contenido/{id}:
 *   delete:
 *     tags: [Contenido]
 *     summary: Eliminar contenido por ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del contenido
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Contenido eliminado
 *       404:
 *         description: Contenido no encontrado
 */

/**
 * @swagger
 * /contenido/filter/titulo:
 *   get:
 *     tags: [Contenido]
 *     summary: Filtrar contenido por título
 *     parameters:
 *       - name: titulo
 *         in: query
 *         required: true
 *         description: Título del contenido
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de contenidos filtrados
 */

/**
 * @swagger
 * /contenido/filter/categoria:
 *   get:
 *     tags: [Contenido]
 *     summary: Filtrar contenido por categoría
 *     parameters:
 *       - name: categoria
 *         in: query
 *         required: true
 *         description: Categoría del contenido
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de contenidos filtrados
 */

/**
 * @swagger
 * /contenido/filter/genero:
 *   get:
 *     tags: [Contenido]
 *     summary: Filtrar contenido por género
 *     parameters:
 *       - name: genero
 *         in: query
 *         required: true
 *         description: Género del contenido
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de contenidos filtrados
 */

// Rutas para contenido
router.get('/', contenidoController.getAllContent);  // Obtener todos los contenidos
router.get('/:id', contenidoController.getContentById);  // Obtener contenido por ID
router.get('/filter/titulo', contenidoController.filterByTitle);  // Filtro por título
router.get('/filter/categoria', contenidoController.filterByCategory);  // Filtro por categoría
router.get('/filter/genero', contenidoController.filterByGenre);  // Filtro por género
router.post('/', contenidoController.createContent);  // Crear nuevo contenido
router.put('/:id', contenidoController.updateContent);  // Actualizar contenido
router.delete('/:id', contenidoController.deleteContent);  // Eliminar contenido

// Manejo de rutas no existentes
router.use((req, res) => {
    res.status(404).json({ message: 'Endpoint not found' });
});

module.exports = router;