const fs = require('fs');

/**
 * Check if valide lang code
 * @param {string} argv - lang code
 * @return {boolean}
 */
const langCheck = (argv) => {
	const rawData = fs.readFileSync('./src/languageData/languageCode.json');
	const langCode = JSON.parse(rawData);
	langCode.lang = langCode.lang.map((lang) => {
		return lang.toLowerCase();
	});
	if (langCode.lang.includes(argv.toLowerCase())) {
		return true;
	} else throw new Error('Must be an valid code language.');
};

module.exports = { langCheck };
