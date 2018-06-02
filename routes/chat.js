const express = require('express');
const router = express.Router();
const mongo = require('mongodb').MongoClient;
const database = require('../public/javascripts/databaseQueries');

let path = "mongodb://localhost:27017";
let dbName = "nodeExam";

/* GET sitters listing. */
router.get('/', (req, res) => {
  
  res.render('chat', {layout: "layoutClean", loggedIn: req.session.user});
});

module.exports = router;
