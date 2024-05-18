const Order = require("../models/order");
const User = require("../models/user");
const Product = require("../models/product");
const { formatISO } = require("date-fns");
const { addMinutes } = require("date-fns");

async function addOrder(userData) {
  const {
    customer,
    products,
    totalAmount,
    paymentMethod,
    paymentStatus,
    shippingAddress,
  } = userData;

  // Check if customer exists
  const customerExist = await User.findById(customer);
  if (!customerExist) {
    throw new Error("Customer does not exist");
  }

  // Check if all products exist
  for (const item of products) {
    const productExist = await Product.findById(item.product);
    if (!productExist) {
      throw new Error(`Product with ID ${item.product} does not exist`);
    }
  }

  // Get the current date and adjust to local timezone
  const now = new Date();
  const timezoneOffset = now.getTimezoneOffset(); // Get the timezone offset in minutes
  const orderDate = formatISO(addMinutes(now, -timezoneOffset)); // Adjust the date to the local timezone and format it

  // Calculate delivery date (current date plus 7 days)
  const deliveryDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // Current date plus 7 days in milliseconds

  // Create the new order
  const newOrder = new Order({
    customer,
    products,
    totalAmount,
    paymentMethod,
    paymentStatus,
    shippingAddress,
    orderStatus: "Processing",
    orderDate,
    deliveryDate,
  });

  // Save the new order to the database
  const savedOrder = await newOrder.save();
  return savedOrder;
}

module.exports = { addOrder };
