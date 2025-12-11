import { Router } from "express";
import { addProduct } from "../controllers/productController.js";
import { verifyAdmin } from "../middleware/authMiddleware.js";

const productRoutes = Router({ mergeParams: true });

productRoutes.post("/create", verifyAdmin, addProduct);

export default productRoutes;
