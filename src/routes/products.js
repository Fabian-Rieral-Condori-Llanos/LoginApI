import { Router } from "express";
import { actualizarProducto, crearProducto, eliminarProducto, obtenerProducto, obtenerProductos } from "../controller/products.controller.js";

const router = Router();

router.post('/productos', crearProducto);
router.get('/productos', obtenerProductos);
router.get('/productos/:id', obtenerProducto);
router.put('/productos/:id', actualizarProducto);
router.delete('/productos/:id', eliminarProducto);

export default router;