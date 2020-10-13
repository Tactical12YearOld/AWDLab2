var express = require('express');
var router = express.Router();
const ctrlHome = require('../controllers/home');
const ctrlBlog = require('../controllers/blog')
/* GET home page. */
router.get('/', ctrlHome.home);
router.get('/blog/:blogid', ctrlBlog.list);
router.get('/blogList', ctrlBlog.blogList);
router.get('/blogAdd', ctrlBlog.blogAdd);
router.get('/blogEdit', ctrlBlog.blogEdit);
router.get('/blogDelete', ctrlBlog.blogDelete);

module.exports = router;
