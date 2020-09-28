/* GET blog page */
var todaysDate = new Date();

function convertDate(date) {
  var yyyy = date.getFullYear().toString();
  var mm = (date.getMonth()+1).toString();
  var dd  = date.getDate().toString();

  var mmChars = mm.split('');
  var ddChars = dd.split('');

  return yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);
}
module.exports.blogList = function(req, res){
  res.render('blogList', {
    blogEntries: [{
      blogTitle: 'Title1',
      blogText: 'Text1',
      dateCreated: todaysDate
    },{
      blogTitle: 'Title2',
      blogText: 'Text2',
      dateCreated: todaysDate
    },{
      blogTitle: 'Title3',
      blogText: 'Text3',
      dateCreated: todaysDate
    }]
  });
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