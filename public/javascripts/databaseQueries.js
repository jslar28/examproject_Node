const mongo = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

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
            //res.render('sitterSearch', {layout: 'layoutClean', items: results})
            res.json(results)
        });
    })
}

module.exports.getAllWithZipCode = function getAll(res, collectionName, zipCode) {
  let results = [];
  mongo.connect(path, (err, client) => {
      if (err) {
        console.log("There was an error running MongoDB...", err)
        return;
      }
      const db = client.db(dbName);
      let elements = db.collection(String(collectionName)).find();
      elements.forEach(element => {
        console.log("E, zip: " + element.zipCode + " | zip: " + zipCode)
        if (element.zipCode === zipCode) {
          results.push(element);
        }   
        }, () => {
          client.close();
          res.render('sitterSearch', {layout: 'layoutClean', items: results})
      });
  })
}

module.exports.getById = function getById(res, collectionName, id) {
  mongo.connect(path, (err, client) => {
    if (err) {
      console.log("There was an error running MongoDB...", err)
      return;
    }
    const db = client.db(dbName);
    console.log("Collection: " + (String(collectionName)));
    let element = db.collection(String(collectionName)).findOne(
      {"_id" : ObjectId(id)}, 
        (err, result) => {
          if (err) {
            console.log("There was an error finding an element by that ID... :", err)
            return;
          }
          client.close();
          res.json(result);
      }
    );
  })
}

/* Queries used for testing/presentation */

module.exports.createDummySitters = function createDummySitters(res) {
  mongo.connect(path, (err, client) => {
  if (err) {
    console.log("There was an error running MongoDB...", err)
    return;
  }
  const db = client.db(dbName);
  let collection = db.collection("sitters");
  let newSitter = {
    "username": "dummy1",
    "password": "123",
    "zipCode": "2860"
  }
  collection.insert(newSitter, (err, success => {
    if (err) {
      console.log("There was an error inserting into MongoDB...", err)
    }
    console.log('Created dummy sitters.')
    client.close();
    res.send('Created dummy sitters.');
  }))
})
}

module.exports.createDummyUsers = function createDummyUsers(res) {
  mongo.connect(path, (err, client) => {
  if (err) {
    console.log("There was an error running MongoDB...", err)
    return;
  }
  const db = client.db(dbName);
  let collection = db.collection("sitters");
  let newUser = {
    "username": "dummy1",
    "password": "123"
  }
  collection.insert(newUser, (err, success => {
    if (err) {
      console.log("There was an error inserting into MongoDB...", err)
    }
    console.log('Created dummy users.')
    client.close();
    res.send('Created dummy users.');
  }))
})
}