const express = require("express");
const { checkUserRole } = require("../middlewares/auth");
const CheckoutOrderModel = require("../models/Checkout");
const checkoutOrderRouter = express.Router();

// GET all checkout orders (only user access)
checkoutOrderRouter.get("/", checkUserRole(["user"]), async (req, res) => {
  try {
    const checkoutOrders = await CheckoutOrderModel.find();
    res.json(checkoutOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST a new checkout order (only user access)
checkoutOrderRouter.post("/", checkUserRole(["user"]), async (req, res) => {
  try {
    const newCheckoutOrder = new CheckoutOrderModel(req.body);
    const savedCheckoutOrder = await newCheckoutOrder.save();
    res.status(201).json(savedCheckoutOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET a specific checkout order by ID (only user access)
checkoutOrderRouter.get("/:id", checkUserRole(["user"]), async (req, res) => {
  try {
    const checkoutOrder = await CheckoutOrderModel.findById(req.params.id);
    if (!checkoutOrder) {
      return res.status(404).json({ message: "Checkout order not found" });
    }
    res.json(checkoutOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// PATCH/update a specific checkout order by ID (only user access)
checkoutOrderRouter.patch("/:id", checkUserRole(["user"]), async (req, res) => {
  try {
    const updatedCheckoutOrder = await CheckoutOrderModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCheckoutOrder) {
      return res.status(404).json({ message: "Checkout order not found" });
    }
    res.json(updatedCheckoutOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// PUT/replace a specific checkout order by ID (only user access)
checkoutOrderRouter.put("/:id", checkUserRole(["user"]), async (req, res) => {
  try {
    const updatedCheckoutOrder = await CheckoutOrderModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCheckoutOrder) {
      return res.status(404).json({ message: "Checkout order not found" });
    }
    res.json(updatedCheckoutOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE a specific checkout order by ID (only user access)
checkoutOrderRouter.delete(
  "/:id",
  checkUserRole(["user"]),
  async (req, res) => {
    try {
      const deletedCheckoutOrder = await CheckoutOrderModel.findByIdAndDelete(
        req.params.id
      );
      if (!deletedCheckoutOrder) {
        return res.status(404).json({ message: "Checkout order not found" });
      }
      res.json({ message: "Checkout order deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

module.exports = checkoutOrderRouter;
