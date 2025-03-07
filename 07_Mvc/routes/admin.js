const path = require("path");

const express = require("express");

const adminController = require("../controllers/admin");
const { route } = require("./shop");

const router = express.Router();

// /adming/add-product -> GET
router.get("/add-product", adminController.getAddProduct);

// /adming/products -> GET
router.get("/products", adminController.getProducts);

// /adming/products -> POST
router.post("/add-product", adminController.postAddProduct);

module.exports = router;
