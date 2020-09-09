var express = require('express');
var router = express.Router();
var ctrlHome = require('../controllers/home');
var crtlBlog = require('../controllers/blog')
/* GET home page. */
router.get('/', ctrlHome.home);
<<<<<<< HEAD
router.get('/blog', ctrlBlog.blog);
=======
//router.get('/blog', ctrlBlog.blog);
>>>>>>> 8dae91090151571492a8f8c79f6f7bd686b25065

module.exports = router;
