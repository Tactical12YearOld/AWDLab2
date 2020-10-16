var express = require('express');
var router = express.Router();
const ctrlHome = require('../controllers/home');
const ctrlBlog = require('../controllers/blog')
/* GET home page. */
router.get('/', ctrlHome.home);
router.get('/blog-list/:blogid', ctrlBlog.blogList);
router.get('/blog-list/', ctrlBlog.blogList);
router.get('/blog-single/:blogid', ctrlBlog.blogShowOne);
router.get('/blogAdd', ctrlBlog.blogAdd);
router.get('/blogEdit/:blogid', ctrlBlog.blogEdit);
router.get('/blogDelete/:blogid', ctrlBlog.blogDelete);
router.post('/blogDelete/:blogid', ctrlBlog.blogDelete);

module.exports = router;
