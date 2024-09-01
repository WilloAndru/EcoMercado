import ProductModel from "./productModel.js";
import UserModel from "./userModel.js";
import TransactionModel from "./transactionModel.js";
import CategoryModel from "./categoryModel.js";

ProductModel.hasMany(TransactionModel, { foreignKey: 'productId' });
TransactionModel.belongsTo(ProductModel, { foreignKey: 'productId' });
UserModel.hasMany(TransactionModel, { foreignKey: 'userId' });
TransactionModel.belongsTo(UserModel, { foreignKey: 'userId' });
CategoryModel.hasMany(ProductModel, { foreignKey: 'id' });
ProductModel.belongsTo(CategoryModel, { foreignKey: 'id' });

const models = {
    ProductModel,
    UserModel,
    TransactionModel,
    CategoryModel
};

export default models;
