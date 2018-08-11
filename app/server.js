const WebSocket = require('ws');

const SERVER_PORT = process.env.SERVER_PORT || 5001;
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];

module.exports = class Server {
    constructor(blockchain) {
        this.blockchain = blockchain;
        this.sockets = [];
    }

    listen() {
        const server = new WebSocket.Server({ port: SERVER_PORT });
        server.on('connection', socket => this.connectSocket(socket));

        peers.forEach(peer => {
            const socket = new WebSocket(peer);
            socket.on('open', () => this.connectSocket(socket));
        });
    }

    connectSocket(socket) {
        this.sockets.push(socket);

        socket.on('message', message => {
            const data = JSON.parse(message);
            this.blockchain.replaceChain(data);
        });
        this.sendChain(socket);
    }

    sendChain(socket) {
        socket.send(JSON.stringify(this.blockchain.chain));
    }

    syncChains() {
        this.sockets.forEach(socket => this.sendChain(socket));
    }
};
