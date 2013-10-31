// Generated by CoffeeScript 1.6.3
var User, restrict, routes;

User = require("../../models/user");

restrict = function(req, res, next) {
  if (req.session.currentUser) {
    return next();
  } else {
    return res.redirect("/login");
  }
};

routes = function(app) {
  app.get("/login", function(req, res) {
    return res.render("login", {
      title: "Login | Having Fun with node"
    });
  });
  app.get("/", restrict, function(req, res) {
    return res.render("index", {
      title: "Simple Chat | We are having fun with node",
      user: req.session.currentUser
    });
  });
  return app.post('/sessions', function(req, res) {
    req.session.currentUser = req.body.user_name;
    res.redirect('/');
    return app.del('/sessions', function(req, res) {
      return req.session.regenerate(function(err) {
        return res.redirect('/login');
      });
    });
  });
};

module.exports = routes;
