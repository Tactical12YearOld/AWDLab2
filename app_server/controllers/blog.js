/* GET blog page */
module.exports.blogList = function(req, res){
  res.render('blogList');
};
module.exports.blogAdd = function(req res){
	res.render('blodAdd');
}