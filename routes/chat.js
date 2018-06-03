const router = require('express').Router();
const mongo = require('mongodb').MongoClient;

/* GET sitters listing. */
router.get('/', (req, res) => {
  res.render('chat', {layout: "layoutClean", loggedIn: req.session.user});
});

module.exports = router;
