var request = require('request');
var apiOptions = { 
  server : "http://localhost"
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

module.exports.doBlogAdd = function(req, res){
  var requestOptions, path, POSTDATA;
  path = "/api/blogs/";
  console.log("bout to make post struct")
  POSTDATA = {  
    blogTitle: req.body.blogTitle,
    blogText: req.body.blogText
  };
  console.log("Building request options");
  requestOptions = {
    url : apiOptions.server + path,
    method : "POST",
    json : POSTDATA
  };
  console.log(requestOptions.json);
    console.log("Sending request");
    request(
      requestOptions,
      function(err, response, body) {
          console.log("Render list page is next");
          res.redirect('/blog-list/');
      }
    );
};
module.exports.blogAdd = function(req,res){
var requestOptions, path;
path = "/api/blogs/";
requestOptions = {
url: apiOptions.server + path,
method: "GET",
json: {}
};
request(
  requestOptions,
  function(err, response, body){
    console.log(body);
    renderAddPage(req, res, body);
    }
  );
};
var renderAddPage = function(req, res, responseBody){
  res.render('blogAdd', {
    title: "Add a blog",
    blog: responseBody
  });
}

module.exports.blogEdit = function(req, res){
  res.render('blogEdit');
};

var renderDeletepage = function(req, res, responseBody){
  res.render('blogDelete',{
    title: "Delete Blog",
    blog : responseBody});
};

module.exports.blogDelete = function(req, res){
  var requestOptions, path;
  path = "/api/blogs/" + req.params.blogid;
  console.log("Building requests opt struct now SERVER");
  requestOptions = {
  url: apiOptions.server + path,
  method: "GET",
  json: {}
  };
  console.log("Sending request now SERVER");
  request(
    requestOptions,
    function(err, response, body){
      console.log("Printing body now SERVER");
      console.log(body);
      console.log("Rendering delete page SERVER");
      renderDeletepage(req, res, body);
      }
    );
  };
  var renderRemoveEmpty = function(req, res, responseBody){
    res.render('blogDelete',{
      title: "ABOUT TO RUN EMPTY",
      blog : responseBody});
  };
module.exports.doBlogDelete = function(req, res){
  var requestOptions, path;
  path = "/api/blogs/" + req.params.blogid;
  console.log("building request opts for doBlogDelete SERVER");
  requestOptions = {
    url: apiOptions.server + path,
    method : "DELETE",
    json : {}
  };
  console.log("sending request to delete blog SERVER");
  request(
    requestOptions,
    function(err, response, body) {
      if(response.statusCode === 204) {
        res.redirect('/blog-list');
      }else {
        res.redirect('/blog-list');
      }

      console.log(body);
    }
  );
};
