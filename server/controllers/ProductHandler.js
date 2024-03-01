import { Order, Product } from "../models/ProductSchema.js";

const GetProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      message: "Products Retrieved Successfully",
      products,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const CheckOutProductHandler = async (req, res) => {
  try {
    const { userId, cartItems, shippingAddress } = req.body;

    let totalAmount = 0;
    let totalQuantity = 0;
    const products = []; // Store products details in this array

    // Calculate subtotal for each item and sum up total amount
    cartItems.forEach((item) => {
      const subtotal = item.price * item.quantity;
      totalAmount += subtotal;
      totalQuantity += item.quantity;

      // Populate products array
      products.push({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      });
    });

    console.log("Total Amount: ", totalAmount);

    const order = await Order.create({
      userId,
      products,
      totalAmount,
      totalQuantity,
      shippingAddress,
    });

    await order.save();

    res.status(200).json({
      message: "Order Generated Successfully",
      order,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export { GetProducts, CheckOutProductHandler };
