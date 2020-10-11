var express = require('express');
var router = express.Router();
const ctrlBlog = require('../controllers/blogs');

//handles request methods
router.get('/blogs', ctrlBlog.blogList);
router.post('/blogs', ctrlBlog.blogAdd);
router.get('/blogs/:blogid', ctrlBlog.blogReadOne);
router.put('/blogs/:blogid', ctrlBlog.blogEdit);
router.delete('/blogs/:blogid', ctrlBlog.blogDelete);

module.exports = router;
