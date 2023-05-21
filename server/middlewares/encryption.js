const Cryptr = require("cryptr");
const { CRYPTO_SECRET } = process.env;

const cryptr = new Cryptr(CRYPTO_SECRET);

const encrypt = function (plain_text) {
    return cryptr.encrypt(plain_text);
};

const decrypt = function (encryptedMessage) {
    return cryptr.decrypt(encryptedMessage);
};

module.exports = {
    encrypt,
    decrypt,
};
