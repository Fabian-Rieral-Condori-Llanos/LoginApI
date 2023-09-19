import { Router } from "express";
import { actualizarCategoria, crearCategoria, eliminarCategoria, obtenerCategoria, obtenerCategorias } from "../controller/category.controller.js";

const router = Router();

router.post('/categorias', crearCategoria);
router.get('/categorias', obtenerCategorias);
router.get('/categorias/:id', obtenerCategoria);
router.put('/categorias/:id', actualizarCategoria);
router.delete('/categorias/:id', eliminarCategoria);

export default router;