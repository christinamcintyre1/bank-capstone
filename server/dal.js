const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
let db = null;
const client = new MongoClient(url);

client.connect( function (err, client) {
  if (!err) {
    console.log("Connected successfully to server");
    db = client.db("badbank");
  } else {
    console.log(err);
  }
});

function create(name, email, password) {
  return new Promise((resolve, reject) => {
    const collection = db.collection("users");
    const doc = { name, email, password, balance: 0 };
    console.log(doc)
    collection.insertOne(doc, function (err, result) {
      if (err) return reject(err);
      console.log("1 document inserted");
      return resolve(result);
    });
  });
}

function findOne(email) {
  return new Promise((resolve, reject) => {
    const customers = db
      .collection("users")
      .findOne({ email: email })
      .then(
        (doc) => {
          resolve(doc);
        },
        (err) => {
          reject(err);
        }
      );
  });
}

function update(email, amount) {
  return new Promise((resolve, reject) => {
    const customers = db
      .collection("users")
      .findOneAndUpdate(
        { email: email },
        { $inc: { balance: amount } },
        function (err, documents) {
          err ? reject(err) : resolve(documents);
        }
      );
  });
}

function all() {
  return new Promise((resolve, reject) => {
    const customers = db
      .collection("users")
      .find({})
      .toArray(function (err, docs) {
        err ? reject(err) : resolve(docs);
      });
  });
}

module.exports = { create, findOne, update, all };
