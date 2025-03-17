const Product = require("../models/product");
const path = require("../util/path");
const Order = require("../models/order");

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
  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }

      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }

      product = Product.findByPk(prodId);
      return product;
    })
    .then((product) => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity },
      });
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then((result) => {
      res.redirect("/cart");
    })
    .catch((error) => console.log(error));
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
  });
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders({ include: ["products"] })
    .then((orders) => {
      console.log(orders[0].toJSON())
      res.render("shop/orders", {
        pageTitle: "Orders",
        path: "/orders",
        orders: orders,
      });
    })
    .catch((error) => console.log(error));
};

exports.postOrder = (req, res, next) => {
  let fetchedcart;
  req.user
    .getCart()
    .then((cart) => {
      fetchedcart = cart;
      return cart.getProducts();
    })
    .then((products) => {
      return req.user.createOrder().then((order) => {
        return Promise.all(
          products.map((product) => {
            return order.addProduct(product, {
              through: {
                quantity: product.cartItem.quantity,
              },
            });
          })
        );
      });
    })
    .then(() => {
      return fetchedcart.setProducts(null);
    })
    .then(() => {
      res.redirect("/orders");
    })
    .catch((error) => console.log(error));
};
