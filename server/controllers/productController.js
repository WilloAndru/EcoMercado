import ProductModel from "../models/productModel.js";
import axios from "axios";
import FormData from "form-data";
import { Op } from "sequelize";

export const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const products = await ProductModel.findByPk(req.params.id);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductsIdNames = async (req, res) => {
  try {
    const { q = "", limit = 5 } = req.query;

    if (!q.trim()) {
      return res.status(200).json([]);
    }

    const products = await ProductModel.findAll({
      attributes: ["id", "name"],
      where: {
        name: {
          [Op.like]: `%${q}%`,
        },
      },
      limit: Number(limit),
      order: [["name", "ASC"]],
    });

    const results = products.map((product) => ({
      id: product.id,
      label: product.name,
    }));

    res.status(200).json(results);
  } catch (error) {
    console.error("Search products error:", error);
    res.status(500).json({
      message: "Error searching products",
    });
  }
};

export const getProductsById = async (req, res) => {
  try {
    const { ids } = req.body;
    const products = await ProductModel.findAll({ where: { id: ids } });
    return res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const publishProduct = async (req, res) => {
  const { name, description, price, quantity, category } = req.body;
  const image = req.file;

  if (!image) {
    return res.status(400).json({ error: "Image required" });
  }

  try {
    const formData = new FormData();
    formData.append("image", image.buffer.toString("base64"));

    const imgbbResponse = await axios.post(
      `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
      formData
    );

    const imageUrl = imgbbResponse.data.data.url;

    await ProductModel.create({
      name,
      image: imageUrl,
      description,
      price,
      quantity,
      categoryId: category,
    });

    return res.status(200).json({ message: "Published product", imageUrl });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, quantity, category } = req.body;
  const image = req.file;

  try {
    const updatedFields = {
      name,
      description,
      price,
      quantity,
      categoryId: category,
    };

    // Si llegó una imagen nueva → subirla a imgbb
    if (image) {
      const formData = new FormData();
      formData.append("image", image.buffer.toString("base64"));

      const imgbbResponse = await axios.post(
        `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
        formData
      );

      const imageUrl = imgbbResponse.data.data.url;
      updatedFields.image = imageUrl; // ahora guardamos URL
    }

    await ProductModel.update(updatedFields, {
      where: { id },
    });

    return res
      .status(200)
      .json({ message: "Updated product", imageUpdated: !!image });
  } catch (error) {
    console.error("IMGBB ERROR:", error.response?.data || error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await ProductModel.findOne({ where: { id } });

    await product.destroy();

    return res.status(200).json({ message: "Product removed" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getProductsCount = async (req, res) => {
  try {
    const productsCount = await ProductModel.count();
    return res.status(200).json(productsCount);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getLatest = async (req, res) => {
  try {
    const latest = await ProductModel.findAll({
      order: [["id", "DESC"]],
      limit: 15,
    });
    return res.status(200).json(latest);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getForDay = async (req, res) => {
  const { categoryId } = req.body;

  try {
    const forDay = await ProductModel.findAll({
      where: { categoryId: categoryId },
    });
    return res.status(200).json(forDay);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
