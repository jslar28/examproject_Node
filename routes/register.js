const express = require('express');
const router = express.Router();
const mongo = require('mongodb').MongoClient;
const database = require('../public/javascripts/databaseQueries');
// const registerForm = require('../public/javascripts/registerForm');

let path = "mongodb://localhost:27017";
let dbName = "nodeExam";


/* GET register listing. */
router.get('/', (req, res) => {
  res.render('register');
});

router.post('/', (req, res) => {
    console.log(req.body)
    if (req.body.username == "" ||
        req.body.password == "" ||
        req.body.firstName == "" ||
        req.body.lastName == "" ||
        req.body.age == "" ||
        req.body.email == "" ||
        req.body.phone == "" ||
        req.body.zipCodes == "") {
        res.render("register", {layout: "layoutClean", error: "Please fill in all fields."})
    } 
    
    database.checkUsername(req.body.username, (available) => {
        if (available) {
            console.log("Available is true.");
            database.add(res, "users", {
                "username": req.body.username,
                "password": req.body.password,
                "firstName": req.body.firstName,
                "lastName": req.body.lastName,
                "age": req.body.age,
                "email": req.body.email,
                "phone": req.body.phone,
                "zipCodes": req.body.zipCodes
            }, (user) => {
                res.render("sitterProfile", {layout: "layoutClean", sitter: user})
            });
        } else {
            console.log("In else");
            res.render("register", {layout: "layoutClean", error: "Username is taken."})
        }
    })
});

module.exports = router;
