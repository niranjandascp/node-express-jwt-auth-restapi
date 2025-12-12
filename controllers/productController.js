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

// Get products with optional filters
export const getProducts = async (req, res, next) => {
  try {
    const query = {};
    // console.log(">>>>>req.query", req.query.category);

    // Name filter (case-insensitive)
    if (req.query.name) {
      query.name = {
        $regex: new RegExp(`^${req.query.name.trim()}$`, "i"),
      };
    }
    // Brand filter (case-insensitive)
    if (req.query.brand) {
      query.brand = {
        $regex: new RegExp(`^${req.query.brand.trim()}$`, "i"),
      };
    }
    // SORTING LOGIC
    const sortField = req.query.sort || "createdAt"; // default sort
    const sortOrder = req.query.order === "asc" ? 1 : -1; // default: desc

    const products = await Product.find(query).sort({
      [sortField]: sortOrder,
    });

    // const products = await Product.find(query);
    res.json(products);
  } catch (err) {
    next(err);
  }
};

// Update product
export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      return next(new Error("Product not found"));
    }

    const { name, brand, price, discountPrice } = req.body;

    if (name) product.name = name;
    if (brand) product.brand = brand;
    if (price !== undefined) product.price = price;
    if (discountPrice) product.discountPrice = discountPrice;

    await product.save();
    res.json(product);
  } catch (err) {
    next(err);
  }
};

// Delete product
export const deleteProduct = async (req, res, next) => {
  console.log(">>>>>delet product function called");
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      return next(new Error("Product not found"));
    }

    await product.deleteOne(); // ✅ updated from remove()
    res.json({ message: "Product deleted" });
  } catch (err) {
    next(err);
  }
};
