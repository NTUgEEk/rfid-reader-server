const http = require("http");
const spawn = require('child_process').spawn;
const WebSocketServer = require('websocket').server;

// start http server
const server = http.createServer((req, res) => {
  res.writeHead(404);
  res.end();
}).listen(8080, () => {
  console.log("Server has started and is listening on port 8080.");
});

// setup websocket server 
let appConnection = null;

const webSocketServer = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false,
});

webSocketServer.on('request', (request) => {
  // Check here if the request should be accepted (security reasons)
  //
  // For simplicity, allow only one app connection at a time
  if (appConnection !== null) {
    request.reject();
    return;
  }
  
  const connection = request.accept('echo-protocol', request.origin);
  appConnection = connection;
  console.log(`Connection from ${connection.remoteAddress} established.`);

  connection.on('close', (reasonCode, description) => {
    appConnection = null;
    console.log(`Peer ${connection.remoteAddress} disconnected.`);
  });
});

function sendUid(uid) {
  if (appConnection !== null) {
    appConnection.sendUTF(uid);
  }
}
 
function validateUid(uid) {
  if (!(uid instanceof Array) || uid.length !== 4) return false;
  for (let i = 0; i < 4; i ++) {
    if (uid[i] < 0 || uid[i] > 255) return false;
  }
  return true;
}

// spawn the rfid reader python process
const readRFID = spawn('python3', ['./read.py']);

readRFID.stdout.on('data', (data) => {
  // check if the uid is valid
  try {
    const uid = JSON.parse(data);
    if (validateUid(uid)) {
      sendUid(uid.join('.'));
    }
  } catch (e) {
    // catch SyntaxError thrown by JSON.parse()
  }
});
