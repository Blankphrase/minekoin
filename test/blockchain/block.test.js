const expect = require('chai').expect;

const Block = require('../../app/blockchain/block');

describe('Block', () => {
    let block, prevBlock, data;

    beforeEach(() => {
        prevBlock = Block.getGenesis();
        data = 'bar';
        block = Block.mine(data, prevBlock);
    });

    it('should set the data to match the the input', () => {
        expect(block.data).to.equal(data);
    });

    it('should set the previous hash to match the hash of the previous block', () => {
        expect(block.prevHash).to.equal(prevBlock.hash);
    });
});
