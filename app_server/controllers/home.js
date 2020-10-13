/* GET home page */
var request = require('request');
var apiOptions = { 
  server : "http://127.0.0.1:27017"
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = "http://54.89.191.207";
}
var renderListpage = function(req, res, responseBody){
  var message;
  if (!(responseBody instanceof Array)) {
    message = "API lookup error";
    responseBody = [];
  } else {
    if (!responseBody.length) {
      message = "No blog entries found";
    }
  }
  res.render('blogList', {
    pageHeader: {
      title : 'Blog List',
    },
    blogs: responseBody,
    message: message
  });
}
module.exports.home = function(req, res){
  var requestOptions, path;
  path = '/api/blogs';
  requestOptions = {
    url: apiOptions.server + path,
    method: "GET",
    json : {},
    qs: {}
  };
  request(
    requestOptions,
    function(err, response, body) {
      renderListpage(req, res, body);
    }
  );

};