const fs = require("fs");
const path = require("path");
const rootDir = require("../util/path");

const p = path.join(rootDir, "data", "products.json");

const getProductsFromFile = (cb) => {
  fs.readFile(p, (error, fileContent) => {
    if (error) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log("Failed to write file : ", err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
};

// EXTRA

// by function

// const products = [];

// const saveProduct = (title) => {
//   products.push(title);
// };

// const fetchAllProducst = () => {
//   return products;
// };

// module.exports = {
//   saveProduct,
//   fetchAllProducst,
// };
