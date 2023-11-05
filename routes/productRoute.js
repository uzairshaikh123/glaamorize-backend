const express = require("express");
const productModel = require("../models/Product");
const { checkUserRole } = require("../middlewares/auth");
const productRouter = express.Router();
// Import the productModel schema
// Import your user role verification middleware

// GET all productModels (public access)
productRouter.get("/", async (req, res) => {
  try {
    const products = await productModel.find();
    res.json({ data: products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST a new productModel (only admin and vendor access)
productRouter.post(
  "/add",
  checkUserRole(["admin", "vendor"]),
  async (req, res) => {
    try {
      const newproductModel = new productModel(req.body);
      const savedproductModel = await newproductModel.save();
      res.status(201).json(savedproductModel);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// GET a specific productModel by ID (public access)
productRouter.get("/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// PATCH/update a specific productModel by ID (only admin and vendor access)
productRouter.patch(
  "/:id",
  checkUserRole(["admin", "vendor"]),
  async (req, res) => {
    try {
      const updatedproductModel = await productModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedproductModel) {
        return res.status(404).json({ message: "productModel not found" });
      }
      res.json({ data: updatedproductModel });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// PUT/replace a specific productModel by ID (only admin and vendor access)
productRouter.put(
  "/:id",
  checkUserRole(["admin", "vendor"]),
  async (req, res) => {
    try {
      const updatedproductModel = await productModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedproductModel) {
        return res.status(404).json({ message: "productModel not found" });
      }
      res.json({ data: updatedproductModel });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// DELETE a specific productModel by ID (only admin and vendor access)
productRouter.delete(
  "/:id",
  checkUserRole(["admin", "vendor"]),
  async (req, res) => {
    try {
      const deletedproductModel = await productModel.findByIdAndDelete(
        req.params.id
      );
      if (!deletedproductModel) {
        return res.status(404).json({ message: "productModel not found" });
      }
      res.json({ message: "productModel deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// GET products by search query
productRouter.get("/search?", async (req, res) => {
  // try {
  const { query } = req.query;
  console.log("query", query);

  // Use Mongoose's $regex to perform a case-insensitive search
  //   const products = await productModel.find({
  //     $or: [
  //       { name: { $regex: query, $options: "i" } },
  //       { caption: { $regex: query, $options: "i" } },
  //       // Add more fields to search if needed
  //     ],
  //   });

  //   // Format the results as required
  //   const results = [
  //     {
  //       hits: products.map((product) => ({
  //         id: product.id,
  //         active: product.active,
  //         cod_available: product.cod_available,
  //         courier: product.courier,
  //         name: product.name,
  //         // Add other fields as needed
  //       })),
  //       nbHits: products.length, // Total number of hits
  //       // Add more fields to match the expected format
  //     },
  //   ];

  //   res.json(results);
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ message: "Internal server error" });
  // }
});

module.exports = productRouter;
