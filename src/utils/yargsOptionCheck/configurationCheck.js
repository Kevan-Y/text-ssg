const fs = require('fs');
const path = require('path');

// functions borrowed and modified from inputCheck.js

const configurationCheck = (argv) => {
  if (argv) {
    // Check if path exist
    if (fs.existsSync(argv)) {
      const extname = path.extname(argv);
      if (extname === '.json') {
        return true;
      }
      throw new Error('File must be a JSON type file');
    } else throw new Error('File must exist from config check');
  }
  return true;
};
module.exports = { configurationCheck };
