const express = require('express');
const router = express.Router();
const Contenido = require('../models/contenido');

// Obtener todos los contenidos
router.get('/', async (req, res) => {
    try {
        const contenidos = await Contenido.findAll();
        res.status(200).json(contenidos);
    } catch (error) {
        console.error('Error fetching contents:', error);
        res.status(500).json({ message: 'Error fetching contents', error });
    }
});

// Obtener contenido por ID
router.get('/:id', async (req, res) => {
    try {
        const contenido = await Contenido.findByPk(req.params.id);
        if (!contenido) {
            return res.status(404).json({ message: 'Content not found' });
        }
        res.status(200).json(contenido);
    } catch (error) {
        console.error('Error fetching content by ID:', error);
        res.status(500).json({ message: 'Error fetching content by ID', error });
    }
});

// Crear nuevo contenido
router.post('/', async (req, res) => {
    try {
        const newContenido = await Contenido.create(req.body);
        res.status(201).json(newContenido);
    } catch (error) {
        console.error('Error creating content:', error);
        res.status(500).json({ message: 'Error creating content', error });
    }
});

// Actualizar contenido
router.put('/:id', async (req, res) => {
    try {
        const contenido = await Contenido.findByPk(req.params.id);
        if (!contenido) {
            return res.status(404).json({ message: 'Content not found' });
        }
        await contenido.update(req.body);
        res.status(200).json(contenido);
    } catch (error) {
        console.error('Error updating content:', error);
        res.status(500).json({ message: 'Error updating content', error });
    }
});

// Eliminar contenido
router.delete('/:id', async (req, res) => {
    try {
        const contenido = await Contenido.findByPk(req.params.id);
        if (!contenido) {
            return res.status(404).json({ message: 'Content not found' });
        }
        await contenido.destroy();
        res.status(200).json({ message: 'Content deleted successfully' });
    } catch (error) {
        console.error('Error deleting content:', error);
        res.status(500).json({ message: 'Error deleting content', error });
    }
});

module.exports = router;
