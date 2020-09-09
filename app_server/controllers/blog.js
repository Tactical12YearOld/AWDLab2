/* GET blog page */
module.exports.blog = function(req, res){
  res.render('blog', {title: 'Express' });
};