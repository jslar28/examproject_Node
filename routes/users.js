const express = require('express');
const router = express.Router();
const mongo = require('mongodb').MongoClient;
const database = require('../public/javascripts/databaseQueries');

let path = "mongodb://localhost:27017";
let dbName = "nodeExam";

/* GET users listing. */
router.get('/', (req, res) => {
  database.getAll(res, "users");
});

router.get('/dummy', function(req, res, next) {
  database.createDummyUsers(res);
});

router.get('/id', (req, res) => {
  res.send('respond with id users')
});

module.exports = router;
