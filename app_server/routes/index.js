var express = require('express');
var router = express.Router();
const ctrlHome = require('../controllers/home');
const ctrlBlog = require('../controllers/blog')
/* GET home page. */
router.get('/', ctrlHome.home);
router.get('/blog/:blogid', ctrlBlog.blogList);
router.get('/blog-list', ctrlBlog.blogList);
router.get('/blogAdd', ctrlBlog.blogAdd);
router.get('/blogEdit', ctrlBlog.blogEdit);
router.delete('/blogDelete', ctrlBlog.blogDelete);
router.delete('/blogDelete/:blogid', ctrlBlog.blogDelete);

module.exports = router;
