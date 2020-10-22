/* GET blog page */
var mongoose = require('mongoose');
var blogModel = mongoose.model('blogs');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
  };

module.exports.blogList = function(req, res){
  blogModel
            .find()
            .exec(function(err, blogs) {
              if (!blogs) {
                sendJSONresponse(res, 400, {"message": "no blogs found"});
              return;
              } else if(err) {
                console.log(err);
                sendJSONresponse(res,404, err);
                return;
              }
              console.log(blogs);
              sendJSONresponse(res, 200, blogs);
            });
};

module.exports.blogReadOne = function(req, res){
    console.log('Finding blog details API', req.params);
    if (req.params && req.params.blogid)
    {
        blogModel.findById(req.params.blogid)
                 .exec(function(err, blogs) 
        {
          if (!blogs) 
          {
            sendJSONresponse(res, 404, {"message" : "blogid not found"});
            return;
          } 
          else if (err) 
          {
            console.log(err);
            sendJSONresponse(res, 404, err);
            return;
          }
          console.log(blogs);
          sendJSONresponse(res, 200, blogs);
        });
    } 
    else 
    {
      console.log('No blogid specified');
      sendJSONresponse(res, 404, {
        "message": "No blogid in request"
      });
    }
};
module.exports.blogAdd = function(req, res){
  console.log("creating db entry API");
  console.log(req.body);
    blogModel.create({
        blogTitle: req.body.blogTitle,
        blogText: req.body.blogText,
        dateCreated: req.body.dateCreated
    }, function(err, blogs) {
        if (err){
            sendJSONresponse(res, 400, err);
        }else {
            sendJSONresponse(res, 201, blogs);
        }
    });
};
module.exports.blogEdit = function(req, res){
    if (!req.params.blogid) {
        sendJSONresponse(res, 404, {
          "message": "Not found, blogid is required"
        });
        return;
      }
      blogModel
        .findById(req.params.blogid)
        .exec(
          function(err, blogs) {
            if (!blogs) {
              sendJSONresponse(res, 404, {
                "message": "blogid not found"
              });
              return;
            } else if (err) {
              sendJSONresponse(res, 400, err);
              return;
            }
            blogs.blogTitle = req.body.blogTitle;
            blogs.blogText = req.body.blogText;
            blogs.dateCreated = req.body.dateCreated;
            blogs.save(function(err, blogs) {
              if (err) {
                sendJSONresponse(res, 404, err);
              } else {
                sendJSONresponse(res, 200, blogs);
              }
            });
          }
      );
};
module.exports.blogDelete = function(req, res){
  console.log("ENTERING API CONRTOLLER BLOG DELETE");  
  var blogid = req.params.blogid;
    if (blogid) {
      console.log("null check true starting findandRemove");
      blogModel
        .findByIdAndRemove(blogid)
        .exec(
          function(err, response) {
            if (err) {
              console.log(err);
              sendJSONresponse(res, 404, err);
            }
            console.log("blog id " + response + " deleted");
            sendJSONresponse(res, 204, null);
          }
      );
    } else {
      sendJSONresponse(res, 404, {
        "message": "No blogid"
      });
    }
};
module.exports.blogRemoveEmpty = function(req, res){
  blogModel
    .deleteMany({ blogTitle: 'Untitled' }, function (err) {
      if(err) {
        console.log(err);
        sendJSONresponse(res, 404, err);
      }
      console.log("Successful deletion");
      sendJSONresponse(res, 204, null);
    });
}