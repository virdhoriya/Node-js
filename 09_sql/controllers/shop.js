const Product = require("../models/product");
const Cart = require("../models/cart");
const path = require("../util/path");

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "MIUI Shop",
        path: "/products",
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.prodcutId;

  // Way 01

  Product.findByPk(prodId)
    .then((product) => {
      res.render("shop/product-detail", {
        pageTitle: product.title,
        product: product,
        path: "/products",
      });
    })
    .catch((error) => console.log(error));

  // Way 02

  // Product.findAll({
  //   where: {
  //     id: prodId,
  //   },
  // })
  //   .then(([product]) => {
  //     res.render("shop/product-detail", {
  //       pageTitle: product.title,
  //       product: product,
  //       path: "/products",
  //     });
  //   })
  //   .catch((error) => console.log(error));
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "MIUI Shop",
        path: "/",
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.getCart = (req, res, next) => {
  console.log("Value 1 : ", req.user.cart);
  req.user
    .getCart()
    .then((cart) => {
      return cart
        .getProducts()
        .then((products) => {
          res.render("shop/cart", {
            pageTitle: "Cart",
            path: "/cart",
            products: products,
          });
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
};

exports.postCart = (req, res, next) => {
  const { productId } = req.body;
  let fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      // console.log("cart : ", cart.toJSON());
      fetchedCart = cart;
      return cart.getProducts({ where: { id: productId } });
    })
    .then((products) => {
      let product;
      if (products.lenght > 0) {
        const product = products[0];
      }
      let newQuantity = 1;
      if (product) {
        // ...
      }
      return Product.findByPk(productId)
        .then((product) => {
          return fetchedCart.addProduct(product, {
            through: { quantity: newQuantity },
          });
        })
        .then(() => {
          res.redirect("/cart");
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
  // Product.findById(productId, (product) => {
  //   Cart.addProduct(product.id, product.price);
  //   res.redirect("/");
  // });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.id;
  Product.findById(prodId, (product) => {
    Cart.delete(prodId, product.price);
    res.redirect("/cart");
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    pageTitle: "Orders",
    path: "/orders",
  });
};
