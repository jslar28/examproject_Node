const mongo = require('mongodb').MongoClient;

let path = "mongodb://localhost:27017";
let dbName = "nodeExam";

module.exports.getAll = function getAll(res, collectionName) {
    let results = [];
    mongo.connect(path, (err, client) => {
        if (err) {
          console.log("There was an error running MongoDB...", err)
          return;
        }
        const db = client.db(dbName);
        let elements = db.collection(String(collectionName)).find();
        elements.forEach(element => {
            results.push(element);
          }, () => {
            client.close();
            res.render('sitterSearch', {layout: 'layoutClean', items: results})
        });
    })
}

module.exports.createDummyUsers = function createDummyUsers(res) {
    mongo.connect(path, (err, client) => {
    if (err) {
      console.log("There was an error running MongoDB...", err)
      return;
    }
    const db = client.db(dbName);
    let collection = db.collection("users");
    let newUser = {
      "username": "dummy1",
      "password": "123"
    }
    collection.insert(newUser, (err, success => {
      if (err) {
        console.log("There was an error inserting into MongoDB...", err)
      }
      console.log(success)
      client.close();
      res.send('Created dummy users.');
    }))
  })
}