import uWS from 'uWebSockets.js';
import { addWebSocket } from './websocket-factory.js';
function toInt(text, defaultValue) {
  const value = Number.parseInt(text);
  return Number.isNaN(value) ? defaultValue : value;
}
const host = process.env.HOST ?? '0.0.0.0';
const port = toInt(process.env.PORT, 10000);
const app = uWS.App({});
app.get('/*', async (res, req) => {
  const url = req.getUrl();
  const id = url.slice(url.lastIndexOf('/') + 1);
  res.writeHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify(addWebSocket(app, id)));
});
app.listen(host, port, (token) => {
  if (token) {
    console.log('URL:', `http://${host}:${port}/`);
  } else {
    console.log(`Failed to listen on http://${host}:${port}/`);
  }
});
