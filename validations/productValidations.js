import Joi from "joi";

// Reusable rule: reject only-space strings
const noOnlySpaces = Joi.string()
  .pattern(/^(?!\s*$).+/)
  .messages({
    "string.pattern.base": "Field cannot contain only spaces",
  });

// =============================
// CREATE PRODUCT VALIDATION
// =============================
export const createProductValidation = Joi.object({
  name: noOnlySpaces.min(2).max(100).required().messages({
    "string.empty": "Product name is required",
    "string.min": "Product name must be at least 2 characters",
    "string.max": "Product name cannot exceed 100 characters",
    "string.pattern.base": "Product name cannot contain only spaces",
  }),

  brand: noOnlySpaces.min(2).max(50).required().messages({
    "string.empty": "Brand is required",
    "string.min": "Brand must be at least 2 characters",
    "string.max": "Brand cannot exceed 50 characters",
    "string.pattern.base": "Brand cannot contain only spaces",
  }),

  price: Joi.number().min(0).required().messages({
    "number.base": "Price must be a valid number",
    "number.min": "Price cannot be negative",
    "any.required": "Price is required",
  }),

  discountPrice: Joi.number().min(0).messages({
    "number.base": "Discount price must be a valid number",
    "number.min": "Discount price cannot be negative",
  }),
});

// =============================
// UPDATE PRODUCT VALIDATION
// =============================
export const updateProductValidation = Joi.object({
  name: noOnlySpaces.min(2).max(100).messages({
    "string.min": "Product name must be at least 2 characters",
    "string.max": "Product name cannot exceed 100 characters",
    "string.pattern.base": "Product name cannot contain only spaces",
  }),

  brand: noOnlySpaces.min(2).max(50).messages({
    "string.min": "Brand must be at least 2 characters",
    "string.max": "Brand cannot exceed 50 characters",
    "string.pattern.base": "Brand cannot contain only spaces",
  }),

  price: Joi.number().strict().min(0).messages({
    "number.base": "Price must be a valid number (not a string)",
    "number.min": "Price cannot be negative",
  }),

  discountPrice: Joi.number().strict().min(0).messages({
    "number.base": "Discount price must be a valid number (not a string)",
    "number.min": "Discount price cannot be negative",
  }),
})
  .min(1)
  .messages({
    "object.min": "At least one field must be provided to update",
  });
