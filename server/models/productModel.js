import db from "../config/db.js";
import { DataTypes } from "sequelize";

const ProductModel = db.define('products', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    image: { type: DataTypes.BLOB },
    description: { type: DataTypes.STRING },
    price: { type: DataTypes.FLOAT },
    quantity: { type: DataTypes.INTEGER },
    address: { type: DataTypes.STRING },
    category: { type: DataTypes.STRING },
});

export default ProductModel