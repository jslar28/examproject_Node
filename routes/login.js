const express = require('express');
const router = express.Router();
const mongo = require('mongodb').MongoClient;
const database = require('../public/javascripts/databaseQueries');
// const registerForm = require('../public/javascripts/registerForm');

let path = "mongodb://localhost:27017";
let dbName = "nodeExam";


/* GET register listing. */
router.get('/', (req, res) => {
  res.render('loginPage');
});

router.post('/', (req, res) => {
    console.log(req.body)
    if (req.body.username == "" || req.body.password == "") {
        res.render("loginPage", {layout: "layoutClean", error: "Please fill in all fields."})
    } else {
        // Check database
        console.log("Check database.");
        database.validateUser(req.body.username, req.body.password, (valid, message, user) => {
            console.log(message);
            if (valid) {
                delete user.password;
                req.session.user = user;
                console.log("req sess us: " + req.session.user._id)
                // console.log("user: " + user)
                let yourProfile;
                if (req.session.user._id == user._id) {
                    yourProfile = true;
                } else {
                    yourProfile = false;
                }

                res.render("sitterProfile", {layout: "layoutClean", sitter: user, session: req.session, owner: yourProfile, loggedIn: true})
            } else {
                res.render("loginPage", {layout: "layoutClean", error: message})
            }
        })
    }    
});

module.exports = router;
