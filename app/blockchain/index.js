const Block = require('./block');

const { hashSHA256 } = require('./utils');

module.exports = class Blockchain {
    constructor() {
        this.chain = [Block.getGenesis()];
    }

    addBlock(data) {
        const lastBlock = this.chain[this.chain.length - 1];
        this.chain.push(Block.mine(data, lastBlock));
    }

    replaceChain(chain) {
        if (chain.length <= this.chain.length) {
            return;
        } else if (!Blockchain.isValidChain(chain)) {
            return;
        }

        this.chain = chain;
    }

    static isValidChain(chain) {
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.getGenesis())) {
            return false;
        }

        for (let i = 1; i < chain.length; i++) {
            const block = chain[i];
            const prevBlock = chain[i - 1];

            if (block.prevHash !== prevBlock.hash) {
                return false;
            }

            const hashedBlock = hashSHA256(
                `${block.timestamp}${block.prevHash}${block.data}`
            );

            if (block.hash !== hashedBlock) {
                return false;
            }
        }

        return true;
    }
};
