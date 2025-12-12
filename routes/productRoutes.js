import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/productController.js";
import { verifyAdmin, verifyUser } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validationMiddleware.js";
import {
  createProductValidation,
  updateProductValidation,
} from "../validations/productValidations.js";

const productRoutes = Router({ mergeParams: true });

productRoutes.post(
  "/create",
  verifyAdmin,
  validate(createProductValidation),
  addProduct
);
productRoutes.get("/", verifyUser, getProducts);
productRoutes.patch(
  "/:id",
  verifyAdmin,
  validate(updateProductValidation),
  updateProduct
);
productRoutes.delete("/:id", verifyAdmin, deleteProduct);

export default productRoutes;
