import models from "../models/models.js";
import jwt from "jsonwebtoken";

const { TransactionModel, UserModel, ProductModel } = models;

export const getSellerByProdctId = async (req, res) => {
  const product_id = req.params.id;

  try {
    const transaction = await TransactionModel.findOne({
      where: { product_id: product_id, type: "sale" },
      include: [{ model: UserModel, attributes: ["email"] }],
    });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    return res.json({
      userName: transaction.user.dataValues.email,
      user_id: transaction.user_id,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const createIncome = async (req, res) => {
  const { products } = req.body;

  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Malformed token" });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user_id = decoded.user_id;

  try {
    for (const p of products) {
      const product = await ProductModel.findOne({
        where: { id: p.product_id },
      });

      product.quantity -= p.quantity;
      await product.save();

      await TransactionModel.create({
        user_id: user_id,
        product_id: p.product_id,
        type: "purchase",
        income: p.income,
        quantity: p.quantity,
      });
    }

    return res.status(200).json({ message: "Successful payment" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

export const createSale = async (req, res) => {
  const { token, productName } = req.body;

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user_id = decoded.user_id;
  const product = await ProductModel.findOne({ where: { name: productName } });

  try {
    await TransactionModel.create({
      user_id: user_id,
      product_id: product.id,
      type: "sale",
      income: "0",
      quantity: product.quantity,
    });

    return res.status(200).json({ message: "Successful sale" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getPurchasesProducts = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user_id = decoded.user_id;

  try {
    const transactions = await TransactionModel.findAll({
      where: { user_id: user_id, type: "purchase" },
    });

    const products = [];

    for (const t of transactions) {
      const product = await ProductModel.findOne({
        where: { id: t.product_id },
      });
      if (product) {
        products.push(product);
      }
    }
    return res.status(200).json({ transactions, products });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getSalesProducts = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user_id = decoded.user_id;

  try {
    const transactions = await TransactionModel.findAll({
      where: { user_id: user_id, type: "sale" },
    });

    const products = [];

    for (const t of transactions) {
      const product = await ProductModel.findOne({
        where: { id: t.product_id },
      });
      if (product) {
        products.push(product);
      }
    }
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getSoldProducts = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user_id = decoded.user_id;

  try {
    const transactionsSold = await TransactionModel.findAll({
      where: { user_id: user_id, type: "sale" },
    });

    const productsId = transactionsSold.map((t) => t.product_id);

    const products = [];
    const transactions = [];

    for (const p of productsId) {
      const transactionList = await TransactionModel.findAll({
        where: { product_id: p, type: "purchase" },
      });
      if (transactionList.length > 0) {
        const product = await ProductModel.findOne({ where: { id: p } });
        products.push(product);
        for (const t of transactionList) {
          transactions.push(t);
        }
      }
    }
    return res.status(200).json({ transactions, products });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await TransactionModel.findAll();
    return res.status(200).json(transactions);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getBestSellers = async (req, res) => {
  try {
    const transactions = await TransactionModel.findAll({
      where: { type: "sale" },
    });
    const products = await ProductModel.findAll();

    const quantityDifferences = products
      .map((p, index) => {
        const quantityDifference = transactions[index].quantity - p.quantity;
        if (quantityDifference > 0) {
          return {
            id: p.id,
            name: p.name,
            image: p.image,
            price: p.price,
            quantityDifference: quantityDifference,
          };
        }
        return null;
      })
      .filter((item) => item !== null)
      .sort((a, b) => b.quantityDifference - a.quantityDifference);

    return res.status(200).json(quantityDifferences);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getProfits = async (req, res) => {
  try {
    const transactions = await TransactionModel.findAll({
      where: { type: "purchase" },
    });
    const profits = transactions.reduce((accumulator, t) => {
      return accumulator + parseFloat(t.income);
    }, 0);

    return res.status(200).json(profits);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
