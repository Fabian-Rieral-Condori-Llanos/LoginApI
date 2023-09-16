import { Usuario } from "../models/users.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const crearUsuario = async (req, res) => {
    const { nombre, correo, contrasena } = req.body;
  
    try {
      const usuarioExistente = await Usuario.findOne({ where: { correo } });
  
      if (usuarioExistente) {
        return res.status(409).json({ mensaje: 'El usuario ya existe' });
      }
  
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(contrasena, saltRounds);
  
      const nuevoUsuario = await Usuario.create({
        nombre,
        correo,
        contrasena: hashedPassword,
        estado: true, 
      });
  
      res.json(nuevoUsuario);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al crear el usuario' });
    }
  };
  
  const iniciarSesion = async (req, res) => {
    const { correo, contrasena } = req.body;
  
    try {
     
      const usuario = await Usuario.findOne({ where: { correo } });
  
      if (!usuario) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }
  
      const contrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena);
  
      if (!contrasenaValida) {
        return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
      }
  
      const token = jwt.sign({ usuarioId: usuario.id }, SECRET_KEY, { expiresIn: '1h' });
  
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al iniciar sesión' });
    }
  };
  
  const obtenerUsuarios = async (req, res) => {
    try {
      const usuarios = await Usuario.findAll();
      res.json(usuarios);
    } catch (error){
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener los usuarios' });
  }
  };
  
  const obtenerUsuario = async (req, res) => {
    const { id } = req.params;
  
    try {
      const usuario = await Usuario.findByPk(id);
  
      if (!usuario) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }
  
      res.json(usuario);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al obtener el usuario' });
    }
  };
  
  const actualizarUsuario = async (req, res) => {
    const { id } = req.params;
    const { nombre, correo, contrasena, estado } = req.body;
  
    try {
      const usuario = await Usuario.findByPk(id);
  
      if (!usuario) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }
  
      usuario.nombre = nombre;
      usuario.correo = correo;
      usuario.contrasena = contrasena;
      usuario.estado = estado;
  
      await usuario.save();
  
      res.json(usuario);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al actualizar el usuario' });
    }
  };
  
  const eliminarUsuario = async (req, res) => {
    const { id } = req.params;
  
    try {
      const usuario = await Usuario.findByPk(id);
  
      if (!usuario) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }
  
      await usuario.destroy();
  
      res.json({ mensaje: 'Usuario eliminado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al eliminar el usuario' });
    }
  };
  
  const obtenerCategoriasProductosUsuario = async (req, res) => {
    const { id } = req.params;
  
    try {
      const usuario = await Usuario.findByPk(id, {
        include: [
          {
            model: Categoria,
            as: 'categorias',
            include: [
              {
                model: Producto,
                as: 'productos',
              },
            ],
          },
        ],
      });
  
      if (!usuario) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }
  
      res.json(usuario.categorias);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al obtener las categorías y productos del usuario' });
    }
  };

  export {
    crearUsuario,
    iniciarSesion,
    obtenerUsuarios,
    obtenerUsuario,
    actualizarUsuario,
    eliminarUsuario,
    obtenerCategoriasProductosUsuario,
  };