import Product from "../models/product.model.js";
import handleError from "../utils/catchError.js";

class ProductController {
  // Create a new product
  create = async (req, res) => {
    try {
      let { name, price, description } = req.body;
      const product = {
        name,
        price,
        description,
      };
      const newProduct = await Product.create(product);
      res.status(201).send({
        success: true,
        data: newProduct,
      });
    } catch (error) {
      handleError(res, error);
    }
  };

  // Get all products
  getAllProducts = async (req, res) => {
    try {
      const products = await Product.findAll();
      res.status(200).send({
        success: true,
        data: products,
      });
    } catch (error) {
      handleError(res, error);
    }
  };

  // Get product by ID
  getProductById = async (req, res) => {
    const { id } = req.params;
    try {
      const product = await Product.findByPk(id);
      if (!product) {
        res.status(404).json({ error: "Product not found" });
        return;
      }
      res.status(200).send({
        succsess: true,
        data: product,
      });
    } catch (error) {
      handleError(res, error);
    }
  };

  // Update product by ID
  updateProduct = async (req, res) => {
    const { id } = req.params;
    let productData = req.body;
    try {
      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      const updatedProduct = await Product.update(productData, {
        where: { id },
        returning: true,
      });
      if (!updatedProduct) {
        res.status(404).json({ error: "Product not found" });
        return;
      }
      res.status(200).send({
        success: true,
        data: updatedProduct[1][0],
      });
    } catch (error) {
      handleError(res, error);
    }
  };

  // Delete product by ID
  delete = async (req, res) => {
    const { id } = req.params;
    try {
      const product = await Product.findByPk(id);

      if (!product) {
        res.status(404).json({ error: "Product not found" });
        return;
      }
      product.destroy();
      res.status(200).send({ success: true, message: "Deleted successfully" });
    } catch (error) {
      handleError(res, error);
    }
  };
}
export default new ProductController();
