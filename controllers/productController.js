import Product from "../models/Product.js";

export const addProduct = async (req, res, next) => {
  try {
    const { name, brand, price, discountPrice } = req.body;

    if (!name || !brand || price == null) {
      return res
        .status(400)
        .json({ message: "Please provide name, brand, and price" });
    }

    const productExists = await Product.findOne({ brand, name });

    if (productExists) {
      return res.status(400).json({ message: "Product already exists" });
    }

    const product = await Product.create({
      name,
      brand,
      price,
      discountPrice,
    });

    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};
