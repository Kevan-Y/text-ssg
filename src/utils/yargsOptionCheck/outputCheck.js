const fs = require('fs');

/**
 * Check if valide output option
 * @param {string} argv - output file path
 * @return {boolean}
 */
const outputCheck = (argv) => {
  if (argv !== './dist') {
    // Check if it is a directory and exit
    if (fs.existsSync(argv)) {
      if (fs.lstatSync(argv).isDirectory()) return true;
      throw new Error('Path must be a directory.');
    } else throw new Error('Directory must exist.');
  } else return true;
};

module.exports = { outputCheck };
