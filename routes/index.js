var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { loggedIn: req.session.user });
});

router.get('/search', (req, res) => {
  res.render('sitterSearch', { layout: 'layoutClean' })
})

module.exports = router;
