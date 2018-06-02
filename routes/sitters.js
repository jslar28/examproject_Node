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
  database.getAllWithZipCode("users", req.query.zipCode, (sitters) => {
    res.render("sitterSearch", { layout: "layoutClean", items: sitters, loggedIn: req.session.user })
  });
});

router.get('/:username', (req, res) => {
  database.getByUsername("users", req.params.username, (result) => {
    let yourProfile;
      if (req.session && req.session.user) {
        if (req.session.user._id == result._id) {
          console.log("getById session ID: " + req.session.user._id)
          yourProfile = true;
        } else {
          yourProfile = false;
          }
        } else {
        yourProfile = false
      }    
      res.render('sitterProfile', {layout: 'layoutClean', sitter: result, owner: yourProfile, loggedIn: req.session.user})
    })
});

router.get('/dummy', function(req, res, next) {
  database.createDummySitters(res);
});



module.exports = router;
