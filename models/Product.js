const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  short_link: {
    type: String,
  },
  featured_image: {
    type: String,
  },
  caption: {
    type: String,
  },
  featured_images: {
    url: {
      type: String,
    },
    caption: {
      type: String,
    },
    small: {
      type: String,
    },
    webp_small: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
    large: {
      type: String,
    },
    original: {
      type: String,
    },
    webp_thumbnail: {
      type: String,
    },
    webp_large: {
      type: String,
    },
    webp_original: {
      type: String,
    },
  },
  badge: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  cost_price: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
  },
  is_wishlisted: {
    type: Boolean,
    default: false,
  },
  ratings: {
    score: {
      type: Number,
    },
    count: {
      type: Number,
    },
  },
  attributes: {
    price_subtext: {
      type: [String],
    },
    locality: {
      type: [String],
    },
    caption: {
      type: [String],
    },
  },
});

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;
