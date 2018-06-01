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
          //res.json(result);
          res.render('sitterProfile', {layout: 'layoutClean', sitter: result})
      }
    );
  })
}

/* Post Stuff */
module.exports.add = function add(res, collectionName, user, callback) {
  console.log("Add called.");
  mongo.connect(path, (err, client) => {
    if (err) {
      console.log("There was an error running MongoDB...", err)
      return;
    }
    const db = client.db(dbName);
    console.log("Collection: " + (String(collectionName)));
    db.collection(String(collectionName)).insert(user);
    client.close();
    callback(user);
    //res.render("welcomePage", {layout: "layoutClean", user: user})
  })
}

module.exports.validateUser = function validateUser(username, password, callback) {
  console.log("Validation user...");
  mongo.connect(path, (err, client) => {
    if (err) {
      console.log("There was an error running MongoDB...", err)
      return;
    }
    const db = client.db(dbName);

    // Find user by username (should only be one)
    db.collection("users").findOne({
      "username": username
    }, (err, result) => {
      if (err) {
        console.log("There was an error finding an element by that ID... :", err)
        return;
      }

      // If we found one, check if password mathes - else, throw error message.
      if (result != null) {
        if (result.password == password) {
          return callback(true, "Valid login!", result);
        } else {
          return callback(false, "Invalid login.")
        }
      } else {
        return callback(false, "Invalid username.")
      }
    })
  })
}

/* Misc */
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

module.exports.checkUsername = function checkUsername(username, callback) {
  mongo.connect(path, (err, client) => {
    if (err) {
      console.log("There was an error when trying to connect to MongoDB...", err)
    }
    const db = client.db(dbName);
    db.collection("users").findOne({"username": String(username)}, (err, result) => {
      if (err) {
        console.log("There was an error finding an element by that name... :", err)
        return;
      }
      console.log("Result: " + result)
      if (result == null) {
        console.log("Username is not taken.")
        return callback(true);
      }
      console.log("Occupied username: " + username)
      return callback(false);
    })
  })
}
