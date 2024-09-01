import ProductModel from "../models/productModel.js";
import sharp from 'sharp'
import { redisClient } from "../config/redisClient.js";

export const getAllProducts = async (req, res) => {
    try {
        const products = await ProductModel.findAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getProduct = async (req, res) => {
    try {
        const products = await ProductModel.findByPk(req.params.id);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getProductsIdNames = async (req, res) => {
    try {
      const cachedProducts = await redisClient.get('productsIdNames');
      
      if (cachedProducts) {
        return res.status(200).json(JSON.parse(cachedProducts));
      }
  
      const products = await ProductModel.findAll();
      const productsIdNames = products.map(product => ({ id: product.id, name: product.name }));
  
      await redisClient.set('productsIdNames', JSON.stringify(productsIdNames), {
        EX: 3600,
      });
  
      res.status(200).json(productsIdNames);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

export const getProductsById = async (req, res) => {
    try {
        const { ids } = req.body;
        const products = await ProductModel.findAll({ where: { id: ids } })
        return res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const publishProduct = async (req, res) => {
    const { name, description, price, quantity, category } = req.body;
    const image = req.file;

    try {
        const optimizedImageBuffer = await sharp(image.buffer)
            .resize({ width: 800 })
            .jpeg({ quality: 80 })
            .toBuffer();

        await ProductModel.create({
            name: name,
            image: optimizedImageBuffer,
            description: description,
            price: price,
            quantity: quantity,
            categoryId: category,
        })

        return res.status(200).json({ message: "Articulo publicado" });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: error.message })
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, quantity, category } = req.body;
    const image = req.file;

    try {
        const updatedFields = {
            name: name,
            description: description,
            price: price,
            quantity: quantity,
            categoryId: category,
        };

        if (image) {
            const optimizedImageBuffer = await sharp(image.buffer)
                .resize({ width: 800 })
                .jpeg({ quality: 80 })
                .toBuffer();
            updatedFields.image = optimizedImageBuffer;
        }

        await ProductModel.update(updatedFields, {
            where: { id: id }
        });

        return res.status(200).json({ message: "Producto actualizado" });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: error.message })
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await ProductModel.findOne({ where: { id } })

        await product.destroy();

        return res.status(200).json({ message: "Producto eliminado" });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

export const getProductsCount = async (req, res) => {
    try {
        const productsCount = await ProductModel.count();
        return res.status(200).json(productsCount)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

export const getLatest = async (req, res) => {
    try {
        const latest = await ProductModel.findAll({
            order: [['id', 'DESC']],
            limit: 15
        });
        return res.status(200).json(latest)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

export const getForDay = async (req, res) => {
    const { categoryId } = req.body;

    try {        
        const forDay = await ProductModel.findAll({ where: {categoryId: categoryId}});
        return res.status(200).json(forDay)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}