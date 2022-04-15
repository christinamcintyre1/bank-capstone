const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
    console.log("Connected successfully to server");
    const dbName = 'test';
    const db = client.db(dbName);

    let name = 'user' + Math.floor(Math.random() * 1000);
    let email = name + '@gmail.com';

    let collection = db.collection('customers');
    let doc = {name, email};
    collection.insertOne(doc, {w:1}, function(err, result) {
        console.log('Document insert');
    });

    let customers = db
        .collection('customers')
        .find()
        .toArray(function(err, docs) {
            console.log('Collection:', docs);

            client.close();
        });
});


