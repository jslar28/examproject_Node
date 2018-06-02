const express = require('express');
const router = express.Router();
const mongo = require('mongodb').MongoClient;
const database = require('../public/javascripts/databaseQueries');
// const registerForm = require('../public/javascripts/registerForm');

let path = "mongodb://localhost:27017";
let dbName = "nodeExam";


/* GET register listing. */
router.get('/', (req, res) => {
  res.render('register', {layout: "layoutClean", loggedIn: req.session.user});
});

router.post('/', (req, res) => {
    console.log(req.body)
    if (filledFields(req)) {
        res.render("register", {layout: "layoutClean", error: "Please fill in all fields.", loggedIn: req.session.user})
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
                res.render("sitterProfile", {layout: "layoutClean", sitter: user, loggedIn: req.session.user})
            });
        } else {
            console.log("In else");
            res.render("register", {layout: "layoutClean", error: "Username is taken.", loggedIn: req.session.user})
        }
    })
});

let filledFields = function filledFields(req) {
    if (req.body.username == "" ||
        req.body.password == "" ||
        req.body.firstName == "" ||
        req.body.lastName == "" ||
        req.body.age == "" ||
        req.body.email == "" ||
        req.body.phone == "" ||
        req.body.zipCodes == "") {
            return false;
    } else {
        return true;
    }
}

module.exports = router;
