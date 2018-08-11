const crypto = require('crypto');

module.exports = {
    hashSHA256: data => {
        return crypto
            .createHash('sha256')
            .update(data)
            .digest('hex');
    }
};
