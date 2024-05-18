require("dotenv").config();
const express = require("express");
const bodyParse = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
const signupRoute = require("./routers/signup");
const loginRoute = require("./routers/login");
const deleteUserRoute = require("./routers/deleteUser");
const deleteProductRoute = require("./routers/deleteProduct");
const editProductRoute = require("./routers/editProduct");
const addCategoryRoute = require("./routers/addCategory");
const fetchCategoriesRoute = require("./routers/fetchCategories");
const addSubCategoryRoute = require("./routers/addSubCategory");
const fetchSubCategoriesRoute = require("./routers/fetchSubCategories");
const addProductRoute = require("./routers/addProduct");
const fetchProductsRoute = require("./routers/fetchProduct");
const fetchProductRoute = require("./routers/searchProduct");
const fetchCustomersRoute = require("./routers/fetchCustomers");
const addOrderRoute = require("./routers/addOrder");
const fetchOrdersRoute = require("./routers/fetchOrders");
const updateOrderRoute = require("./routers/updateOrder");
const createAdminAccount = require("./scripts/admin");

app.use(bodyParse.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

createAdminAccount();

app.use("/auth", loginRoute);
app.use("/user", signupRoute);
app.use("/user", deleteUserRoute);
app.use("/api", fetchCustomersRoute);
app.use("/api", addCategoryRoute);
app.use("/api", fetchCategoriesRoute);
app.use("/api", addSubCategoryRoute);
app.use("/api", fetchSubCategoriesRoute);
app.use("/api", addProductRoute);
app.use("/api", editProductRoute);
app.use("/api", deleteProductRoute);
app.use("/api", fetchProductsRoute);
app.use("/api", fetchProductRoute);
app.use("/api", addOrderRoute);
app.use("/api", fetchOrdersRoute);
app.use("/api", updateOrderRoute);

app.listen(PORT, () => {
  console.log(`Server is running on :${PORT}`);
});
