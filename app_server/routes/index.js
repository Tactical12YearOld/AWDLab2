var express = require('express');
var router = express.Router();
var ctrlHome = require('../controllers/home');
var crtlBlog = require('../controllers/blog')
/* GET home page. */
router.get('/', ctrlHome.home);
//router.get('/blog', ctrlBlog.blog);

module.exports = router;
