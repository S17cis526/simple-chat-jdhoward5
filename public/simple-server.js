var socket = io();

socket.on('welcome', function(data) {
  $('<li>').text(data.message).css('color', data.color).appendTo('#message-log');
});

socket.on('message', function(data) {
  $('<li>').text(data.message).appendTo('#message-log');
});

$('#chat-send').on('click', function() {
  var text = $('#chat-text').val();
  socket.emit('message', text);
  $('chat-text').val('');
});

$('#color').on('change', function() {
  var color = $(this).val();
  socket.emit('color', color);
});
