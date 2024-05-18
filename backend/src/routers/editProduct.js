const express = require("express");
const cors = require("cors");
const productsController = require("../controllers/editProducts");

const router = express.Router();

router.use(cors());

router.post("/edit-products", productsController.editProducts);

module.exports = router;
