const fs = require('fs');

/**
 * readConfig reads the configuration options
 * @param {string} fileName
 * @return {object} json object
 */
const readConfig = (fileName) => {
  const configFile = fs.readFileSync(fileName);
  const data = JSON.parse(configFile);
  return data;
};

module.exports = { readConfig };
