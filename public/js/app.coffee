window.getDate = ->
		d 					= new Date()
		curr_date 	= d.getDate()
		curr_month 	= d.getMonth() + 1
		curr_year 	= d.getFullYear()
		curr_hour 	= d.getHours()
		curr_min  	= d.getMinutes()
		"#{curr_date}/#{curr_month}/#{curr_year} #{curr_hour}:#{curr_min}"

# window.socket = io.connect "http://54.200.16.130"
window.socket = io.connect "http://localhost:3000"
console.log socket

jQuery ->
	socket.emit 'setName', ($ "#username").text()

	template = null
	($ "#messageTemplate").load "/templates/message.html", ->
		template = _.template ($ "#messageTemplate").html()

	socket.on 'getMsg', (data) ->
		console.log template(data)
		($ "#messages-list").append(template(data))
		$("#messages-list").scrollTop($("#messages-list")[0].scrollHeight)

	($ "#form").submit (evt) ->
		evt.preventDefault()
		if "" is ($ "#text").val()
			return
		data = 
			name: ($ "#username").text()
			message: ($ "#text").val()
			date: getDate()
		socket.emit "msg", data
		($ "#text").val("")
