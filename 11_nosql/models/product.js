const mongodb = require("mongodb");
const { getDb } = require("../util/database");

class Product {
  constructor(title, price, description, imageUrl, id, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ? mongodb.ObjectId.createFromHexString(id) : null;
    if (userId) {
      this.userId = userId;
    }
  }

  save() {
    const db = getDb();
    if (this._id) {
      return db.collection("products").updateOne(
        { _id: this._id },
        { $set: this }
        // {
        //   $set: {
        //     title: this.title,
        //     description: this.description,
        //     price: this.price,
        //     imageUrl: this.imageUrl,
        //   },
        // }
      );
    } else {
      return db.collection("products").insertOne(this);
    }
  }

  static fetchAll() {
    const db = getDb();
    return db.collection("products").find().toArray();
  }

  static findById(productId) {
    const db = getDb();
    return db
      .collection("products")
      .find({ _id: mongodb.ObjectId.createFromHexString(productId) })
      .next();
  }

  static deleteById(prodId) {
    const db = getDb();
    return db
      .collection("products")
      .deleteOne({ _id: mongodb.ObjectId.createFromHexString(prodId) });
  }
}

module.exports = Product;
