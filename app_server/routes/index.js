var express = require('express');
var router = express.Router();
const ctrlHome = require('../controllers/home');
const ctrlBlog = require('../controllers/blog')
/* GET home page. */
router.get('/', ctrlHome.home);
router.get('/blogList', ctrlBlog.blogList);
router.get('/blogAdd', ctrlBlog.blogAdd);
//router.get('/blog', ctrlBlog.blog);

module.exports = router;
