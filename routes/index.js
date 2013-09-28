
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Having fun with NODE.JS' });
};
exports.login = function(req, res){
  res.render('login', { title: 'Having fun with NODE.JS' });
};