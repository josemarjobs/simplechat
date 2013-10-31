User = require "../../models/user"


restrict = (req, res, next) ->
	if req.session.currentUser
		next()
	else
		res.redirect "/login"

routes = (app) ->
	app.get "/login", (req, res) ->
		res.render "login", 
			title: "Login | Having Fun with node"
	
	app.get "/", restrict, (req, res) ->
		res.render "index", 
			title: "Simple Chat | We are having fun with node"
			user: req.session.currentUser

	app.post '/sessions', (req, res) ->
		req.session.currentUser = req.body.user_name
		res.redirect '/'

  app.del '/sessions', (req, res) ->
    req.session.regenerate (err) ->
      res.redirect '/login'

module.exports = routes