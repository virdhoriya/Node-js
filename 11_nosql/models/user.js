const { getDb } = require("../util/database");
const { ObjectId } = require("mongodb");

class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart; // { items: []}
    this._id = id;
  }

  save() {
    const db = getDb();
    return db.collection("users").insertOne(this);
  }

  addToCart(product) {
    const db = getDb();

    // if (!this.cart.items) {
    //   const updatedCart = {
    //     items: [{ productId: product._id, quantity: newQuantity }],
    //   };
    //   return db.collection("users").updateOne(
    //     { _id: this._id },
    //     {
    //       $set: {
    //         cart: updatedCart,
    //       },
    //     }
    //   );
    // }

    const cartProductIndex = this.cart.items.findIndex((cp) => {
      return cp.productId.toString() === product._id.toString();
    });
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];
    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({ productId: product._id, quantity: newQuantity });
    }
    const updatedCart = {
      items: updatedCartItems,
    };
    return db.collection("users").updateOne(
      { _id: this._id },
      {
        $set: {
          cart: updatedCart,
        },
      }
    );
  }

  getCart() {
    const db = getDb();
    const productIds = this.cart.items.map((item) => item.productId);
    return db
      .collection("products")
      .find({ _id: { $in: productIds } })
      .toArray()
      .then((products) => {
        return products.map((product) => {
          return {
            ...product,
            quantity: this.cart.items.find((item) => {
              return item.productId.toString() === product._id.toString();
            }).quantity,
          };
        });
      })
      .catch((error) => console.log(error));
  }

  deleteItemFormCart(prodId) {
    const db = getDb();

    const updatedCartItems = this.cart.items.filter((item) => {
      return item.productId.toString() !== prodId.toString();
    });

    return db.collection("users").updateOne(
      { _id: this._id },
      {
        $set: {
          cart: { items: updatedCartItems },
        },
      }
    );
  }

  createOrder() {
    const db = getDb();
    return this.getCart()
      .then((products) => {
        const order = {
          items: products,
          user: {
            _id: this._id,
            name: this.name,
            email: this.email,
          },
        };
        return db.collection("orders").insertOne(order);
      })
      .then((result) => {
        this.cart = { items: [] };
        return db.collection("users").updateOne(
          { _id: this._id },
          {
            $set: {
              cart: { items: [] },
            },
          }
        );
      })
      .catch((error) => console.log(error));
  }

  getOrders() {
    const db = getDb();
    return db.collection("orders").find({ "user._id": this._id }).toArray();
  }

  static findById(userId) {
    const db = getDb();

    return db
      .collection("users")
      .findOne({ _id: ObjectId.createFromHexString(userId) });
  }

  // static deleteById(prodId) {
  //   const db = getDb();
  //   return db
  //     .collection("products")
  //     .deleteOne({ _id: ObjectId.createFromHexString(prodId) });
  // }
}

module.exports = User;
