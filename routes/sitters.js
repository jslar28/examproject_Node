const express = require('express');
const router = express.Router();
const mongo = require('mongodb').MongoClient;
const database = require('../public/javascripts/databaseQueries');

let path = "mongodb://localhost:27017";
let dbName = "nodeExam";

/* GET sitters listing. */
router.get('/', (req, res) => {
  database.getAll(res, "sitters");
});

router.get('/search', (req, res) => {
  database.getAllWithZipCode(res, "sitters", req.query.zipCode);
});

router.get('/dummy', function(req, res, next) {
  database.createDummySitters(res);
});

router.get('/:id', (req, res) => {
  database.getById(res, "sitters", req.params.id)
});

module.exports = router;
