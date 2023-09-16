import { Router } from "express";
import { actualizarUsuario, eliminarUsuario, obtenerCategoriasProductosUsuario, obtenerUsuario, obtenerUsuarios } from "../controller/users.controller";

const router = Router();

router.get('/usuario/:id/categorias-productos', obtenerCategoriasProductosUsuario);
router.get('/usuarios', obtenerUsuarios);
router.get('/usuarios/:id',  obtenerUsuario);
router.put('/usuarios/:id', actualizarUsuario);
router.delete('/usuarios/:id', eliminarUsuario);

export default router;