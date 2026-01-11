import ProductModel from "./productModel.js";
import UserModel from "./userModel.js";
import TransactionModel from "./transactionModel.js";
import CategoryModel from "./categoryModel.js";

ProductModel.hasMany(TransactionModel, { foreignKey: "product_id" });
TransactionModel.belongsTo(ProductModel, { foreignKey: "product_id" });

UserModel.hasMany(TransactionModel, { foreignKey: "user_id" });
TransactionModel.belongsTo(UserModel, { foreignKey: "user_id" });

CategoryModel.hasMany(ProductModel, { foreignKey: "category_id" });
ProductModel.belongsTo(CategoryModel, { foreignKey: "category_id" });

const models = {
  ProductModel,
  UserModel,
  TransactionModel,
  CategoryModel,
};

export default models;
