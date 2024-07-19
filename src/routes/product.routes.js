import express, { Router } from 'express';
import ProductController from '../controlller/product.controller.js';
import authMiddleware from '../middleware/auth.js';

const productRouter = express.Router();

// Create a new product
productRouter.post('/', authMiddleware, ProductController.create);
// Get all products
productRouter.get('/', authMiddleware, ProductController.getAllProducts);
// Get product by ID
productRouter.get('/:id', authMiddleware, ProductController.getProductById);
// Update product by ID
productRouter.put('/:id', authMiddleware, ProductController.updateProduct);
// Delete product by ID
productRouter.delete('/:id', authMiddleware, ProductController.delete);

export default productRouter;
