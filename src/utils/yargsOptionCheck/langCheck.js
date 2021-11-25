// const fs = require('fs');
const { languageCode } = require('../../languageData/languageCode');
/**
 * Check if valide lang code
 * @param {string} argv - lang code
 * @return {boolean}
 */
const langCheck = (argv) => {
  const langCode = languageCode.map((lang) => lang.toLowerCase());
  if (langCode.includes(argv.toLowerCase())) {
    return true;
  }
  throw new Error('Must be an valid code language.');
};

module.exports = { langCheck };
