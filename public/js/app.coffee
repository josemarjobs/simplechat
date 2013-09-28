window.getDate = ->
		d 					= new Date()
		curr_date 	= d.getDate()
		curr_month 	= d.getMonth() + 1
		curr_year 	= d.getFullYear()
		curr_hour 	= d.getHours()
		curr_min  	= d.getMinutes()
		"#{curr_date}/#{curr_month}/#{curr_year} #{curr_hour}:#{curr_min}"

jQuery ->
	template = null
	($ "#messageTemplate").load "/templates/message.html", ->
		template = _.template ($ "#messageTemplate").html()

	($ "#form").submit (evt) ->
		evt.preventDefault()
		if "" is ($ "#text").val()
			return
		
		data = 
			name: "Josemar"
			message: ($ "#text").val()
			date: getDate()
		console.log template(data)
		($ "#messages-list").append(template(data))
		($ "#text").val("")
		$("#messages-list").scrollTop($("#messages-list")[0].scrollHeight)