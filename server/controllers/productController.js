import CategoryModel from "../models/categoryModel.js";
import ProductModel from "../models/productModel.js";

export const getAllCategories = async (req, res, next) => {
    try {
        const categories = await CategoryModel.findAll();
        req.categories = categories;
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getAllProducts = async (req, res) => {
    try {
        const products = await ProductModel.findAll();
        res.status(200).json({
            categories: req.categories,
            products: products
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

