import Categoria from "../models/category";

const crearCategoria = async (req, res) => {
    const { nombre, usuario_id } = req.body;
  
    try {
      const nuevaCategoria = await Categoria.create({
        nombre,
        usuario_id,
      });
  
      res.json(nuevaCategoria);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al crear la categoría' });
    }
  };
  
  const obtenerCategorias = async (req, res) => {
    try {
      const categorias = await Categoria.findAll();
      res.json(categorias);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al obtener las categorías' });
    }
  };
  
  const obtenerCategoria = async (req, res) => {
    const { id } = req.params;
  
    try {
      const categoria = await Categoria.findByPk(id);
  
      if (!categoria) {
        return res.status(404).json({ mensaje: 'Categoría no encontrada' });
      }
  
      res.json(categoria);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al obtener la categoría' });
    }
  };
  
  const actualizarCategoria = async (req, res) => {
    const { id } = req.params;
    const { nombre, usuario_id } = req.body;
  
    try {
      const categoria = await Categoria.findByPk(id);
  
      if (!categoria) {
        return res.status(404).json({ mensaje: 'Categoría no encontrada' });
      }
  
      categoria.nombre = nombre;
      categoria.usuario_id = usuario_id;
  
      await categoria.save();
  
      res.json(categoria);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al actualizar la categoría' });
    }
  };
  
  const eliminarCategoria = async (req, res) => {
    const { id } = req.params;
  
    try {
      const categoria = await Categoria.findByPk(id);
  
      if (!categoria) {
        return res.status(404).json({ mensaje: 'Categoría no encontrada' });
      }
  
      await categoria.destroy();
  
      res.json({ mensaje: 'Categoría eliminada correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al eliminar la categoría' });
    }
  };
  
  export {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    eliminarCategoria,
  };