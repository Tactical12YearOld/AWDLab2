var request = require('request');
var apiOptions = { 
  server : "http://127.0.0.1:27017"
};

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
};
//mine
module.exports.blogList = function(req, res){
  var requestOptions, path;
  path = '/api/blogs';
  requestOptions = {
    url: apiOptions.server + path,
    method : "GET",
    json : {},
    qs : {}
  };
  request(
    requestOptions,
    function(err, response, body) {
      console.log(body);
      renderListpage(req, res, body);
    }
  );
};
var renderListpage = function(req, res, responseBody){
  var message;
  if (!(responseBody instanceof Array)) {
    console.log("Failed if 1");
    message = "API lookup error";
    responseBody = [];
  } else {
    if (!responseBody.length) {
      console.log("Failed if 2");
      message = "No blog entries found";
    }
  }
  res.render('blog-list', {
    title: 'Blog List',
      pageHeader: {
          title: 'Blog List'
      },
    blogs: responseBody
  });
}
///his
/*module.exports.list = function(req, res){
  var requestOptions, path;
  path = '/api/blogs';
  requestOptions = { 
      url : apiOptions.server + path,
      method : "GET",
      json : {},
      qs : {} 
      };
  request(
      requestOptions,
      function(err, response, body) {
          renderListPage(req, res, body);
      }
  );
};

 Render the book list page 
var renderListPage = function(req, res, responseBody){
  res.render('blog-list', {
      title: 'Blog List',
      pageHeader: {
          title: 'Blog List'
      },
      blogs: responseBody
  });
};
*/
module.exports.blogAdd = function(req, res){
	res.render('blogAdd');
};
module.exports.blogEdit = function(req, res){
  res.render('blogEdit');
};
module.exports.blogDelete = function(req, res){
  res.render('blogDelete');
};