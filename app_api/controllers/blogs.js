/* GET blog page */
var mongoose = require('mongoose');
var blogModel = mongoose.model('blogs');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
  };

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
  res.render('blogList', {
    blogEntries: [{
      blogTitle: 'Title1',
      blogText: 'Text1',
      dateCreated: convertDate(todaysDate)
    },{
      blogTitle: 'Title2',
      blogText: 'Text2',
      dateCreated: convertDate(todaysDate)
    },{
      blogTitle: 'Title3',
      blogText: 'Text3',
      dateCreated: convertDate(todaysDate)
    }]
  });
};
module.exports.blogReadOne = function(req, res){
    console.log('Finding blog details', req.params);
    if (req.params && req.params.blogid)
    {
        blogModel.findById(req.params.blogid).exec(function(err, blogs) 
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
    console.log(req.body);
    blogModel.create({
        blogTitle: req.body.blogTitle,
        blogText: req.body.blogText,
        dateCreated: convertDate(todaysDate)
    }, function(err, blogs) {
        if (err){
            sendJSONresponse(res, 400, err);
        }else {
            sendJSONresponse(res, 201, blogs);
        }
    });
};
module.exports.blogEdit = function(req, res){
  res.render('blogEdit');
};
module.exports.blogDelete = function(req, res){
  res.render('blogDelete');
};