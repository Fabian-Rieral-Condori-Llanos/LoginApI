import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Categoria } from "./category";
import { Producto } from "./products";

const Usuario = sequelize.define('Usuario', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contrasena: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });
  Usuario.hasMany(Categoria, {
    foreignKey: 'usuario_id',
    sourceKey: 'id',
  });
  
  Categoria.belongsTo(Usuario, {
    foreignKey: 'usuario_id',
    targetKey: 'id',
  });

  Usuario.hasMany(Producto, {
    foreignKey: 'usuario_id',
    sourceKey: 'id',
  });
  
  Producto.belongsTo(Usuario, {
    foreignKey: 'usuario_id',
    targetKey: 'id',
  });

  export default Usuario;
  