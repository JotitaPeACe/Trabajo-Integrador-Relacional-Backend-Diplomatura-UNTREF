const { Op } = require('sequelize');
const Contenido = require('../models/contenido');
const Categoria = require('../models/categoria');
const Genero = require('../models/genero');
const Actor = require('../models/actor');
const ContenidoActores = require('../models/contenido_actores');
const ContenidoGeneros = require('../models/contenido_generos');

// Obtener todos los contenidos
exports.getAllContent = async (req, res) => {
    try {
        const contenidos = await Contenido.findAll({
            include: [Actor, Genero, Categoria]
        });
        res.status(200).json(contenidos);
    } catch (error) {
        console.error('Error al obtener contenido:', error);
        res.status(500).json({ message: 'Error al obtener contenido', error });
    }
};

// Obtener contenido por ID
exports.getContentById = async (req, res) => {
    try {
        const contenido = await Contenido.findByPk(req.params.id, {
            include: [Actor, Genero, Categoria]
        });
        if (!contenido) {
            return res.status(404).json({ message: 'Contenido no encontrado' });
        }
        res.status(200).json(contenido);
    } catch (error) {
        console.error('Error al obtener contenido por ID:', error);
        res.status(500).json({ message: 'Error al obtener contenido por ID', error });
    }
};

// Filtrar por título
exports.filterByTitle = async (req, res) => {
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
            return res.status(404).json({ message: 'No se encontró contenido con ese titulo' });
        }

        res.status(200).json(contenidos);
    } catch (error) {
        console.error('Error de filtrado por titulo:', error);
        res.status(500).json({ message: 'Error de filtrado por titulo', error });
    }
};

// Filtrar por categoría
exports.filterByCategory = async (req, res) => {
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
            return res.status(404).json({ message: 'No se encuentra contenido en esa categoría' });
        }

        res.status(200).json(contenidos);
    } catch (error) {
        console.error('Error al filtrar por categoria:', error);
        res.status(500).json({ message: 'Error al filtrar por categoria', error });
    }
};

// Filtrar por género
exports.filterByGenre = async (req, res) => {
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
            return res.status(404).json({ message: 'No se encontró contenido con ese genero' });
        }

        res.status(200).json(contenidos);
    } catch (error) {
        console.error('Error al filtrar por genero:', error);
        res.status(500).json({ message: 'Error al filtrar por genero', error });
    }
};

// Crear contenido
exports.createContent = async (req, res) => {
    const { titulo, categoria_id, gen, resumen, temporadas, duracion, trailer, poster, actores, generos } = req.body;

    // Validar campos obligatorios
    if (!titulo || !categoria_id || !gen || !resumen || !trailer || !poster) {
        return res.status(400).json({ message: 'Todos los campos obligatorios deben estar completos' });
    }

    try {
        // Crear el contenido (película o serie)
        const newContenido = await Contenido.create({
            titulo,
            categoria_id,
            gen,
            resumen,
            temporadas,
            duracion,
            trailer,
            poster
        });

        // Manejar actores
        if (actores && actores.length) {
            for (let actorNombre of actores) {
                // Buscar o crear actor
                let [actor] = await Actor.findOrCreate({
                    where: { nombre: actorNombre }
                });

                // Asociar actor al contenido en la tabla 'contenido_actores'
                await ContenidoActores.create({
                    contenido_id: newContenido.id,
                    actor_id: actor.id
                });
            }
        }

        // Manejar géneros
        if (generos && generos.length) {
            for (let generoNombre of generos) {
                // Buscar o crear género
                let [genero] = await Genero.findOrCreate({
                    where: { nombre: generoNombre }
                });

                // Asociar género al contenido en la tabla 'contenido_generos'
                await ContenidoGeneros.create({
                    contenido_id: newContenido.id,
                    genero_id: genero.id
                });
            }
        }

        // Devolver el contenido creado
        res.status(201).json(newContenido);
    } catch (error) {
        console.error('Error creando contenido:', error);
        res.status(500).json({ message: 'Error creando contenido', error });
    }
};

// Actualizar contenido
exports.updateContent = async (req, res) => {
    const { id } = req.params; // Asumiendo que el ID del contenido está en la URL
    const { titulo, categoria_id, gen, resumen, temporadas, duracion, trailer, poster, actores, generos } = req.body;

    // Verificar si el contenido existe
    const contenido = await Contenido.findByPk(id);
    if (!contenido) {
        return res.status(404).json({ message: 'Contenido no encontrado' });
    }

    try {
        // Actualizar el contenido
        await Contenido.update(
            { titulo, categoria_id, gen, resumen, temporadas, duracion, trailer, poster },
            { where: { id } }
        );

        // Actualizar actores
        if (actores && actores.length) {
            // Limpiar actores existentes
            await ContenidoActores.destroy({ where: { contenido_id: id } });
            for (let actorNombre of actores) {
                let [actor] = await Actor.findOrCreate({ where: { nombre: actorNombre } });
                await ContenidoActores.create({
                    contenido_id: id,
                    actor_id: actor.id
                });
            }
        }

        // Actualizar géneros
        if (generos && generos.length) {
            // Limpiar géneros existentes
            await ContenidoGeneros.destroy({ where: { contenido_id: id } });
            for (let generoNombre of generos) {
                let [genero] = await Genero.findOrCreate({ where: { nombre: generoNombre } });
                await ContenidoGeneros.create({
                    contenido_id: id,
                    genero_id: genero.id
                });
            }
        }

        // Responder con el contenido actualizado
        const updatedContenido = await Contenido.findByPk(id, {
            include: [Actor, Genero, Categoria]
        });
        res.status(200).json(updatedContenido);
    } catch (error) {
        console.error('Error actualizando contenido:', error);
        res.status(500).json({ message: 'Error actualizando contenido', error });
    }
};

// Eliminar contenido
exports.deleteContent = async (req, res) => {
    try {
        // Elimina las relaciones en 'contenido_actores' y 'contenido_generos'
        await ContenidoActores.destroy({ where: { contenido_id: req.params.id } });
        await ContenidoGeneros.destroy({ where: { contenido_id: req.params.id } });

        const result = await Contenido.destroy({ where: { id: req.params.id } });

        if (!result) {
            return res.status(404).json({ message: 'Contenido no encontrado o ya eliminado' });
        }

        res.status(200).json({ message: 'Contenido eliminado con exito' });
    } catch (error) {
        console.error('Error al eliminar contenido:', error);
        res.status(500).json({ message: 'Error al eliminar contenido', error });
    }
};
