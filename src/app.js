import express from 'express';
import morgan from 'morgan';
import jwt from 'jsonwebtoken'
import dotenv from "dotenv";

const app = express();
dotenv.config();

// Import routes
import category from './routes/category.js'
import products from './routes/products.js'
import users from './routes/users.js'
import { crearUsuario, iniciarSesion } from './controller/users.controller.js';

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

const verificarToken = (req, res, next) => {
  const token = req.headers.authorization;
  const SECRET_KEY = process.env.SECRET_KEY;

    if (!token) {
      return res.status(401).json({ mensaje: 'No estás autorizado' });
    }
  
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ mensaje: 'Token inválido' });
      }
  
      req.usuarioId = decoded.usuarioId;
      next();
    });
  };
/*
  const verificarToken = (req, res, next) => {
  const token = req.headers.authorization;
  const SECRET_KEY = process.env.SECRET_KEY;

  if (!token) {
    return res.status(401).json({ mensaje: 'No estás autorizado' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.usuarioId = decoded.usuarioId;
    next();
  } catch (error) {
    return res.status(401).json({ mensaje: 'Token inválido' });
  }
};
*/
// Routes
app.use('/api/usuario', verificarToken, users)
app.use('/api/categoria', verificarToken,  category)
app.use('/api/productos', verificarToken, products)

// Ruta de inicio de sesión
app.post('/usuarios', crearUsuario);
app.post('/login', iniciarSesion);

export default app;