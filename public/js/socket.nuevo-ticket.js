//Comando para establecer la comunicación

var socket = io();

var label = $("#lblNuevoTicket");

socket.on("connect", function () {
  console.log("Conectado al servidor");
});

socket.on("estadoActual", function (response) {
  label.text(response.actual);
});

socket.on("disconnect", function () {
  console.log("Desconectado del servidor");
});

$("button").on("click", function () {
  console.log("click");

  socket.emit("siguienteTicket", null, function (siguienteTicket) {
    label.text(siguienteTicket);
  });
});
