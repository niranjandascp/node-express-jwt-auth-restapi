import { Router } from "express";
import { addProduct } from "../controllers/productController.js";
import { verifyAdmin } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validationMiddleware.js";
import { createProductValidation } from "../validations/productValidations.js";

const productRoutes = Router({ mergeParams: true });

productRoutes.post(
  "/create",
  verifyAdmin,
  validate(createProductValidation),
  addProduct
);

export default productRoutes;
