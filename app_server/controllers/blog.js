/* GET blog page */
module.exports.blogList = function(req, res){
  res.render('blogList', {
    blogEntries: [{
      blogTitle: 'Title1',
      blogText: 'Text1',
      dateCreated: getUTCDate()
    },{
      blogTitle: 'Title2',
      blogText: 'Text2',
      dateCreated: getUTCDate()
    },{
      blogTitle: 'Title3',
      blogText: 'Text3',
      dateCreated: getUTCDate()
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