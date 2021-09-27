/**
 * Check if valide stylesheet option
 * @param {string} argv - stylesheet URL
 * @return {boolean}
 */
const stylesheetCheck = (argv) => {
	if (argv) {
		//Check if it is an URL of a CSS stylesheet
		if (/^http.*\.css$/.test(argv)) return true;
		else throw new Error('Must be an URL to a CSS stylesheet.');
	} else return true;
};

module.exports = { stylesheetCheck };
