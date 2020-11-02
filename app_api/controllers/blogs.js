/* GET blog page */
var mongoose = require('mongoose');
var blogModel = mongoose.model('blogs');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
  };
//usage ex: alert(dateToNiceString(new Date())); 
//returns this format: "Oct 23 2019 1:09pm"
var dateToNiceString = function (myDate) {
  var month=new Array();
  month[0]="Jan";
  month[1]="Feb";
  month[2]="Mar";
  month[3]="Apr";
  month[4]="May";
  month[5]="Jun";
  month[6]="Jul";
  month[7]="Aug";
  month[8]="Sep";
  month[9]="Oct";
  month[10]="Nov";
  month[11]="Dec";
  var hours = myDate.getHours();
  var minutes = myDate.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ampm;
  return month[myDate.getMonth()]+" "+myDate.getDate()+" "+myDate.getFullYear()+" "+strTime;
}
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
  console.log("INSIDE OF BLOG EDIT API");  
  if (!req.params.blogid) {
        sendJSONresponse(res, 404, {
          "message": "Not found, blogid is required"
        });
        return;
      }
      console.log("Past null check starting edit prog");
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
            console.log("reassigning fields API");
            blogs.blogTitle = req.body.blogTitle;
            blogs.blogText = req.body.blogText;
            blogs.save(function(err, blogs) {
              if (err) {
                sendJSONresponse(res, 404, err);
              } else {
                sendJSONresponse(res, 201, blogs);
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
