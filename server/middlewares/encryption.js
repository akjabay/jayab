const { CRYPTO_SECRET } = process.env;
const crypto = require('crypto')

// Generate secret hash with crypto to use for encryption
const key = crypto
  .createHash('sha512')
  .update(CRYPTO_SECRET)
  .digest('hex')
  .substring(0, 32)
const encryptionIV = crypto
  .createHash('sha512')
  .update('secret_iv')
  .digest('hex')
  .substring(0, 16)

// Encrypt data
module.exports.encrypt = function (data) {
  const cipher = crypto.createCipheriv('aes-256-cbc', key, encryptionIV)
  return Buffer.from(
    cipher.update(data, 'utf8', 'hex') + cipher.final('hex')
  ).toString('base64') // Encrypts data and converts to hex and base64
}

// Decrypt data
module.exports.decrypt = function (encryptedData) {
  const buff = Buffer.from(encryptedData, 'base64')
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, encryptionIV)
  return (
    decipher.update(buff.toString('utf8'), 'hex', 'utf8') +
    decipher.final('utf8')
  ) // Decrypts data and converts to utf8
}