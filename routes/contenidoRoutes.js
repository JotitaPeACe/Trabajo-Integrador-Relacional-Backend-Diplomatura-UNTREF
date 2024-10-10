const { Op } = require('sequelize'); // <--- Importa Op
const express = require('express');
const router = express.Router();
const Contenido = require('../models/contenido');
const Actor = require('../models/actor');
const Categoria = require('../models/categoria');
const Genero = require('../models/genero');
const ContenidoActores = require('../models/contenido_actores');
const ContenidoGeneros = require('../models/contenido_generos');


// Obtener todos los contenidos
router.get('/', async (req, res) => {
    try {
        const contenidos = await Contenido.findAll({
            include: [Actor, Genero, Categoria]
        });
        res.status(200).json(contenidos);
    } catch (error) {
        console.error('Error fetching contents:', error);
        res.status(500).json({ message: 'Error fetching contents', error });
    }
});

// Obtener contenido por ID
router.get('/:id', async (req, res) => {
    try {
        const contenido = await Contenido.findByPk(req.params.id, {
            include: [Actor, Genero, Categoria]
        });
        if (!contenido) {
            return res.status(404).json({ message: 'Content not found' });
        }
        res.status(200).json(contenido);
    } catch (error) {
        console.error('Error fetching content by ID:', error);
        res.status(500).json({ message: 'Error fetching content by ID', error });
    }
});

router.get('/filter/titulo', async (req, res) => {
    const { titulo } = req.query;

    try {
        const contenidos = await Contenido.findAll({
            where: {
                titulo: {
                    [Op.like]: `%${titulo}%`
                }
            }
        });

        if (contenidos.length === 0) {
            return res.status(404).json({ message: 'No content found with that title' });
        }

        res.status(200).json(contenidos);
    } catch (error) {
        console.error('Error filtering by title:', error);
        res.status(500).json({ message: 'Error filtering by title', error });
    }
});

router.get('/filter/categoria', async (req, res) => {
    const { categoria } = req.query;

    try {
        const contenidos = await Contenido.findAll({
            include: [{
                model: Categoria,
                where: {
                    nombre: {
                        [Op.like]: `%${categoria}%`
                    }
                }
            }]
        });

        if (contenidos.length === 0) {
            return res.status(404).json({ message: 'No content found in that category' });
        }

        res.status(200).json(contenidos);
    } catch (error) {
        console.error('Error filtering by category:', error);
        res.status(500).json({ message: 'Error filtering by category', error });
    }
});

router.get('/filter/genero', async (req, res) => {
    const { genero } = req.query;

    try {
        const contenidos = await Contenido.findAll({
            include: [{
                model: Genero,
                where: {
                    nombre: {
                        [Op.like]: `%${genero}%`
                    }
                }
            }]
        });

        if (contenidos.length === 0) {
            return res.status(404).json({ message: 'No content found with that genre' });
        }

        res.status(200).json(contenidos);
    } catch (error) {
        console.error('Error filtering by genre:', error);
        res.status(500).json({ message: 'Error filtering by genre', error });
    }
});


// Crear nuevo contenido
router.post('/', async (req, res) => {
    const { titulo, categoria_id, gen, resumen, temporadas, duracion, trailer, poster } = req.body;

    // Validación de campos obligatorios
    if (!titulo || !categoria_id || !gen || !resumen || !trailer || !poster) {
        return res.status(400).json({ message: 'All mandatory fields must be filled' });
    }

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
        // Elimina las relaciones en 'contenido_actores' y 'contenido_generos'
        await ContenidoActores.destroy({ where: { contenido_id: req.params.id } });
        await ContenidoGeneros.destroy({ where: { contenido_id: req.params.id } });

        // Elimina el contenido
        const result = await Contenido.destroy({ where: { id: req.params.id } });

        if (!result) {
            return res.status(404).json({ message: 'Content not found or already deleted' });
        }

        res.status(200).json({ message: 'Content deleted successfully' });
    } catch (error) {
        console.error('Error deleting content:', error);
        res.status(500).json({ message: 'Error deleting content', error });
    }
});

// Manejo de rutas no existentes
router.use((req, res) => {
    res.status(404).json({ message: 'Endpoint not found' });
});

module.exports = router;
