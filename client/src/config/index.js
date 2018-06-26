const devEnv = require('./config.dev.json');
const prodEnv = require('./config.prod.json');

const env = process.env.REACT_APP_ENV || 'dev';

const config = {
  dev: devEnv,
  prod: prodEnv,
};

export default config[env];
