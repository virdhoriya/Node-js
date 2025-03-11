const { error } = require("console");
const fs = require("fs");
const path = require("path");

const p = path.join(__dirname, "..", "data", "cart.json");

module.exports = class Cart {
  static addProduct(id, productPrice) {
    // Fetch the previous cart
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      // Analyze the cart => Find existing product
      const existingProductIndex = cart.products.findIndex(
        (prod) => prod.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      // Add new product/ increase quantity
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(p, JSON.stringify(cart), (error) => {
        if (error) {
          console.log("Failed to write into file : ", error);
        }
      });
    });
  }

  static delete(id, productPrice) {
    fs.readFile(p, (error, fileContent) => {
      if (error) {
        return;
      } else {
        const updatedCart = JSON.parse(fileContent);
        const product = updatedCart.products.find((prod) => prod.id === id);
        if (!product) {
          return;
        }
        const prodcutQty = product.qty;
        updatedCart.products = updatedCart.products.filter(
          (prodcut) => prodcut.id !== id
        );
        updatedCart.totalPrice =
          updatedCart.totalPrice - productPrice * prodcutQty;
        fs.writeFile(p, JSON.stringify(updatedCart), (error) => {
          if (error) {
            console.log("Failed to write into file : ", error);
          }
        });
      }
    });
  }

  static getCart(cb) {
    fs.readFile(p, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      if (err) {
        cb([]);
      } else {
        cb(cart);
      }
    });
  }
};
