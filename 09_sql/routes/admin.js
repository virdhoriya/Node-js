const path = require("path");

const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();

// /adming/add-product -> GET
router.get("/add-product", adminController.getAddProduct);

// /adming/products -> GET
router.get("/products", adminController.getProducts);

// /adming/products -> POST
router.post("/add-product", adminController.postAddProduct);

router.get("/edit-product/:productId", adminController.getEditProduct);

router.post("/edit-product", adminController.postEditProduct);

router.post("/delete-product", adminController.postDeleteProduct);

module.exports = router;
