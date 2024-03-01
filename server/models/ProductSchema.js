import mongoose from "mongoose";

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    img: [
      {
        img1: String,
        img2: String,
      },
    ],
    stock: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamp: true }
);

const OrderSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  products: [
    {
      productId: String,
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  totalQuantity: {
    type: Number,
    required: true,
  },
  shippingAddress: {
    type: {
      addressLine1: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
    },
    required: true,
  },
});

const Product = mongoose.model("Product", ProductSchema);

const Order = mongoose.model("Order", OrderSchema);

export { Product, Order };
