import uWS from 'uWebSockets.js';
import { addWebSocket } from './websocket-factory.js';
const port = process.env.PORT || 3000;
const app = uWS.App({});
app.get('/*', async (res, req) => {
  const url = req.getUrl();
  const id = url.slice(url.lastIndexOf('/') + 1);
  res.writeHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify(addWebSocket(app, id)));
});
app.listen(port, (token) => {
  if (token) {
    console.log('URL:', `http://127.0.0.1:${port}/`);
  } else {
    console.log('Failed to listen to port ' + port);
  }
});
