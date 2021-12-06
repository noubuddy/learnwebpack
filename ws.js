const ws = require('ws');

const wss = new ws.WebSocketServer({ port: 3333 });

wss.on('connection', function connection(ws) {
    ws.on('message', function message(data) {
        wss.clients.forEach(function (client) {
            if (client !== ws && client.readyState === ws.OPEN) {
                client.send(data, { binary: false });
            }
        });
        console.log('received: %s', data);
    });
});