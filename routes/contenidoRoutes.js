const express = require('express');
const router = express.Router();
const contenidoController = require('../controllers/contenidoController');

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
