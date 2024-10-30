const env =  'test';

var defaultConfig;

switch (env) {
  case 'test':
    defaultConfig = require('./test.config.js');
    break;
  case 'production':
    defaultConfig = require('./production.config.js');
    break;
  default:
    defaultConfig = require('./dev.config.js');
    break;
}

module.exports = defaultConfig;
