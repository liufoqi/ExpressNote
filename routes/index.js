var express = require('express');
var router = express.Router();
const user= require('../controller/user')
const category=require('../controller/category')
const article=require('../controller/article')
/* GET home page. */
router.use(user)
router.use(category)
router.use(article)
// get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = router;
