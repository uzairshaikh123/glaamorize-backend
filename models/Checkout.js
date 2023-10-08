const mongoose = require("mongoose");

const checkoutOrderSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  amount_discounted: {
    type: Number,
    default: 0,
  },
  cash_used: {
    type: Number,
    default: 0,
  },
  coupon_code: String,
  experience_amount: {
    type: Number,
    required: true,
  },
  experience_id: {
    type: Number,
    required: true,
  },
  exp_original_price: {
    type: Number,
    required: true,
  },
  experience_name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  delivery_charges: {
    type: Number,
    default: 0,
  },
  date: String,
  slot_id: Number,
  task_surge: {
    type: Number,
    default: 0,
  },
  customization_surge: {
    type: Number,
    default: 0,
  },
  time: String,
  pincode: String,
  pincode_category: String,
  customizations: Object,
  customer_id: {
    type: mongoose.Schema.Types.ObjectId, // Reference to User
    ref: "User", // Name of the User model
  },
  vendor_id: {
    type: mongoose.Schema.Types.ObjectId, // Reference to Vendor
    ref: "Vendor", // Name of the Vendor model
  },
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  getCustomizations: Array,
  courier: Number,
  cod_available: Boolean,
  featured_image: String,
});

const CheckoutOrderModel = mongoose.model("CheckoutOrder", checkoutOrderSchema);

module.exports = CheckoutOrderModel;
