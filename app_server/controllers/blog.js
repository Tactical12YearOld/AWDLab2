var request = require('request');
var apiOptions = { 
  server : "http://127.0.0.1:80"
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
var renderListpage = function(req, res, responseBody){
  res.render('blog-list', {
    title : "blog-list",
    blogs : responseBody
  });
};
var renderSinglePage = function(req, res, responseBody){
  res.render('blog-single', {
    title : "blog single view",
    blog : responseBody
  });
};
module.exports.blogList = function(req, res){
  var requestOptions, path;
  path = "/api/blogs";
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
module.exports.blogShowOne = function(req, res){
  var requestOptions, path;
  path = "/api/blogs/" + req.params.blogid;
  requestOptions = {
    url: apiOptions.server + path,
    method : "GET",
    json : {},
  };
  request(
    requestOptions,
    function(err, response, body) {
      console.log(body);
      renderSinglePage(req, res, body);
    }
  );
};
module.exports.blogAdd = function(req, res){
	res.render('blogAdd');
};
module.exports.blogEdit = function(req, res){
  res.render('blogEdit');
};
var renderDeletepage = function(req, res, responseBody){
  res.render('blogDelete',{
              blog : responseBody});
};
module.exports.doblogDelete = function(req, res){
  var requestOptions, path;
  path = "/api/blogs/" + req.params.blogid;
  requestOptions = {
    url: apiOptions.server + path,
    method : "POST",
    json : {}
  };
  request(
    requestOptions,
    function(err, response, body) {
      console.log(body);
      renderDeletepage(req, res, body);
    }
  );
};

module.exports.blogDelete = function(req, res){
  var requestOptions, path;
  path = "/api/blogs/" + req.params.blogid;
  requestOptions = {
  url: apiOptions.server + path,
  method: "GET",
  json: {}
  };
  request(
  requestOptions,
  function(err, response, body){
  renderDeletepage(req, res, body);
  }
  );
  };