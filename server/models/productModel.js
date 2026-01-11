import db from "../config/db.js";
import { DataTypes } from "sequelize";

const ProductModel = db.define(
  "products",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    category_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
  }
);

export default ProductModel;
