routes = (app) ->
	app.get "/login", (req, res) ->
		res.render "login", 
			title: "Login | Having Fun with node"
	
	app.get "/", (req, res) ->
		res.render "index", 
			title: "Simple Chat | We are having fun with node"

	app.post "/sessions", (req, res) ->
		res.redirect "/"

module.exports = routes