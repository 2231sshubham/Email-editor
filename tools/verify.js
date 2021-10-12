var hmacValidator = require('hmac-validator');
var config = require('../config.json');

exports.verify = function(query) {
var validate = hmacValidator({
  replacements: {
    both: {
      '&': '%26',
      '%': '%25'
    },
    keys: {
      '=': '%3D'
    }
  },
  excludedKeys: ['signature','hmac'],
  algorithm: 'sha256',
  format: 'hex',
  digestKey:'hmac'
});

    // 3. Verify signature
return validate(config.api_secret, null, query);
};
