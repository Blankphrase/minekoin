const { hashSHA256 } = require('./utils');

module.exports = class Block {
    constructor(timestamp, prevHash, hash, data) {
        this.timestamp = timestamp;
        this.prevHash = prevHash;
        this.hash = hash;
        this.data = data;
    }
    static getGenesis() {
        return new this(0, 'pr3v10u5h45h', 'g3n3515h45h', []);
    }

    static mine(data, prevBlock) {
        const timestamp = Date.now();
        const prevHash = prevBlock.hash;
        const hash = hashSHA256(`${timestamp}${prevHash}${data}`);

        return new this(timestamp, prevHash, hash, data);
    }
};
