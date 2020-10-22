var express = require('express');
var router = express.Router();
const ctrlBlog = require('../controllers/blogs');

//handles request methods
router.get('/blogs', ctrlBlog.blogList);
router.get('/blogs/:blogid', ctrlBlog.blogReadOne);
router.post('/blogs', ctrlBlog.blogAdd);
router.put('/blogs/:blogid', ctrlBlog.blogEdit);
router.delete('/blogs/:blogid', ctrlBlog.blogDelete);
router.get('/blogs/removeEmpty', ctrlBlog.blogRemoveEmpty);

module.exports = router;
