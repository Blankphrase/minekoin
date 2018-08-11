const express = require('express');
const Blockchain = require('./app/blockchain');
const Server = require('./app/server');

const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();
app.use(express.json());

const blockchain = new Blockchain();
const server = new Server(blockchain);

app.post('/mine', (req, res) => {
    blockchain.addBlock(req.body.data);
    server.syncChains();
    res.redirect('/blocks');
});

app.get('/blocks', (req, res) => {
    res.json(blockchain.chain);
});

app.listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}`));
server.listen();
