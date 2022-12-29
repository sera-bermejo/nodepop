var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'perro' });
});


router.get("/images/:name", (req, res, next) => {
  const name = req.params.name;
  res.sendFile(path.join(__dirname,'../images/', name))
});

module.exports = router;
