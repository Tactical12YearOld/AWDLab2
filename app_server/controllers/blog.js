var request = require('request');
var apiOptions = { 
  server : "http://127.0.0.1:27017"
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = "http://54.89.191.207";
}

/* GET blog page */
var todaysDate = new Date();

function convertDate(date) {
  var yyyy = date.getFullYear().toString();
  var mm = (date.getMonth()+1).toString();
  var dd  = date.getDate().toString();
  var hh = date.getHours().toString();
  var m = date.getMinutes().toString();
  var ss = date.getSeconds().toString();
  var mmm = date.getMilliseconds().toString();

  var mmChars = mm.split('');
  var ddChars = dd.split('');
  var hhChars = hh.split('');
  var mChars = m.split('');
  var ssChars = ss.split('');
  var mmmChars = mmm.split('');

  return yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]) 
         + 'T' + (hhChars[1]?hh:"0"+hhChars[0]) + ':' + (mChars[1]?m:"0"+mChars[0]) 
         + ':' + (ssChars[1]?ss:"0"+ssChars[0]) + ':' + (mmmChars[1]?mmm:"0"+mmmChars[0]) + 'Z';
}
module.exports.blogList = function(req, res){
  blogs = buildBlogList(req, res);
      sendJSONresponse(res, 200, blogs);
};

var buildBlogList = function(req, res) {
  var blogs = [];
  results.forEach(function(doc) {
    blogs.push({
      blogTitle: doc.obj.blogTitle,
      blogText: doc.obj.blogText,
      _id: doc.obj._id
    });
  });
  return blogs;
};
module.exports.blogAdd = function(req, res){
	res.render('blogAdd');
};
module.exports.blogEdit = function(req, res){
  res.render('blogEdit');
};
module.exports.blogDelete = function(req, res){
  res.render('blogDelete');
};