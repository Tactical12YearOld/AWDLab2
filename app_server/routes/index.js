var express = require('express');
var router = express.Router();
const ctrlHome = require('../controllers/home');
var ctrlBlog = require('../controllers/blog')
/* GET home page. */
router.get('/', ctrlHome.home);
router.get('/blog', ctrlBlog.blog);
//router.get('/blog', ctrlBlog.blog);

module.exports = router;
