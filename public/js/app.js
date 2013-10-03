// Generated by CoffeeScript 1.6.3
window.getDate = function() {
  var curr_date, curr_hour, curr_min, curr_month, curr_year, d;
  d = new Date();
  curr_date = d.getDate();
  curr_month = d.getMonth() + 1;
  curr_year = d.getFullYear();
  curr_hour = d.getHours();
  curr_min = d.getMinutes();
  return "" + curr_date + "/" + curr_month + "/" + curr_year + " " + curr_hour + ":" + curr_min;
};

window.socket = io.connect("http://54.200.16.130");

console.log(socket);

jQuery(function() {
  var template;
  template = null;
  ($("#messageTemplate")).load("/templates/message.html", function() {
    return template = _.template(($("#messageTemplate")).html());
  });
  socket.on('getMsg', function(data) {
    console.log(template(data));
    ($("#messages-list")).append(template(data));
    return $("#messages-list").scrollTop($("#messages-list")[0].scrollHeight);
  });
  return ($("#form")).submit(function(evt) {
    var data;
    evt.preventDefault();
    if ("" === ($("#text")).val()) {
      return;
    }
    data = {
      name: ($("#username")).val(),
      message: ($("#text")).val(),
      date: getDate()
    };
    socket.emit("msg", data);
    return ($("#text")).val("");
  });
});
