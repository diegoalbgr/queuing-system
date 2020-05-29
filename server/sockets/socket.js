const { io } = require("../server");

const { TicketControl } = require("../classes/ticket-control");

const ticketControl = new TicketControl();

io.on("connection", (client) => {
  console.log("usuario conectado");

  // client.emit("enviarMensaje", {
  //   usuario: "Admin",
  //   mensaje: "Bienvenido a esta aplicación",
  // });

  // client.on("disconnect", () => {
  //   console.log("Usuario desconectado");
  // });

  //Escuchar el cliente
  client.on("siguienteTicket", (data, callback) => {
    let siguiente = ticketControl.siguiente();

    console.log(siguiente);

    callback(siguiente);

    //client.broadcast.emit("enviarMensaje", data);
  });

  //emitir un evento 'estadoActual'

  client.emit("estadoActual", {
    actual: ticketControl.getUltimoTicket(),
    ultimos4: ticketControl.getUltimos4(),
  });

  client.on("atenderTicket", (data, callback) => {
    if (!data.escritorio) {
      return callback({
        err: true,
        mensaje: "El escritorio es necesario",
      });
    }

    let atenderTicket = ticketControl.atenderTicket(data.escritorio);
    callback(atenderTicket);

    client.broadcast.emit("ultimos4", {
      ultimos4: ticketControl.getUltimos4(),
    });
  });
});
