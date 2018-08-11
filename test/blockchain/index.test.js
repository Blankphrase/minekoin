const expect = require('chai').expect;

const Blockchain = require('../../app/blockchain');
const Block = require('../../app/blockchain/block');

describe('Blockchain', () => {
    let blockchain, data;

    beforeEach(() => {
        blockchain = new Blockchain();
        data = 'data';
    });

    it('should start with a genesis block', () => {
        expect(blockchain.chain[0]).to.deep.equal(Block.getGenesis());
    });

    describe('addBlock()', () => {
        it('should add a new block to the chain', () => {
            blockchain.addBlock(data);
            const lastIndex = blockchain.chain.length - 1;
            expect(blockchain.chain[lastIndex].data).to.equal(data);
        });
    });

    describe('validateChain()', () => {
        it('should validate a valid chain', () => {
            blockchain.addBlock(data);
            expect(Blockchain.isValidChain(blockchain.chain)).to.be.true;
        });

        it('should invalidate a chain with corrupt genesis block', () => {
            blockchain.chain[0].data = 'Corrupt data';
            expect(Blockchain.isValidChain(blockchain.chain)).to.be.false;
        });

        it('should invalidate a corrupt chain', () => {
            blockchain.addBlock('new data');
            blockchain.chain[1].data = 'changed new data';
            expect(Blockchain.isValidChain(blockchain.chain)).to.be.false;
        });
    });

    describe('replaceChain()', () => {
        let blockchain2;

        beforeEach(() => {
            blockchain2 = new Blockchain();
        });

        it('should replace the chain with a valid chain', () => {
            blockchain2.addBlock(data);
            blockchain.replaceChain(blockchain2.chain);
            expect(blockchain.chain).to.equal(blockchain2.chain);
        });

        it('should not replace the chain with a smaller chain', () => {
            blockchain.addBlock('foo');
            blockchain.replaceChain(blockchain2.chain);
            expect(blockchain.chain).to.not.equal(blockchain2.chain);
        });
    });
});
