const path = require('path');

/**
 * Loads the configuration file for the application
 *
 * @return configuration object
 *
 */
const loadConfig = () => {
  try {
    const configFile = require(path.resolve(__dirname, '..', 'config'));
    return configFile;
  } catch(err) {
    return {};
  }
};

module.exports = loadConfig;
