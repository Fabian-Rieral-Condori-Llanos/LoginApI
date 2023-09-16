import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Producto } from "./products";

const Categoria = sequelize.define('Categoria', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Categoria.hasMany(Producto, {
    foreignKey: 'category_id',
    sourceKey: 'id',
  });
  
Producto.belongsTo(Categoria, {
    foreignKey: 'category_id',
    targetKey: 'id',
  });

export default Categoria;
