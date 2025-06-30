const crypto = require('crypto')

const jwtsecret = crypto.randomBytes(64).toString('hex');

console.log('JWT Secret Token gweh : ');
console.log(jwtsecret);