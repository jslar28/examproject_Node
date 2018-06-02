var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', condition: true, myArray: [1,2,3], loggedIn: req.session.user });
});

router.get('/search', (req, res) => {
  res.render('sitterSearch', {layout: 'layoutClean'})
})

module.exports = router;
