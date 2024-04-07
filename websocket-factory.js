import uWS from 'uWebSockets.js';
const pathSet = new Set();
export function addWebSocket(app, id) {
  let created = false;
  let ready = false;
  try {
    if (!pathSet.has(id)) {
      console.log('websocket create /' + id);
      pathSet.add(id);
      app.ws('/' + id, {
        compression: uWS.DISABLED,
        maxPayloadLength: 1024,
        idleTimeout: 10,
        open: (ws) => {
          console.log('websocket connect /' + id);
          ws.subscribe('broadcast');
        },
        message: (ws, message, isBinary) => {
          console.log('websocket message /' + id);
          console.log(message);
          ws.publish('broadcast', message, isBinary);
        },
        drain: (ws) => {
          console.log('websocket backpressure /' + id);
          console.log('size ' + ws.getBufferedAmount());
        },
        close: (ws, code, message) => {
          console.log('websocket disconnect /' + id);
        },
      });
      created = true;
    }
    ready = true;
  } catch (err) {}
  return { created, ready };
}
