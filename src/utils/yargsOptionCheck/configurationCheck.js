const fs = require('fs');
const path = require('path');

//functions borrowed and modified from inputCheck.js

/**
 * Check if it is a json file
 * @param {string} argv - json config file path
 * @return {boolean}
 */
// const isJSONFile = (argv) => {
// 	const extname = path.extname(argv);
// 	if (extname === '.json') {
// 		return true;
// 	} else if (fs.lstatSync(argv).isDirectory()) {
// 		return false;
// 	}
// };


/**
 * Check if valide input option
 * @param {string} argv - input path
 * @return {boolean}
 */
 const configCheck = (argv) => {
	//Check if path exist
	if (fs.existsSync(argv)) {
		//Check the path
		if (fs.lstatSync(argv).isJSONFile()) {
			const extname = path.extname(argv);
			//Check if path is a file ext end with .json
			if (extname === '.json') {
				return true;
			} else throw new Error('File must be a JSON type file');
		} else throw new Error('File must exist');
	} else throw new Error('File must exist.');
};

module.exports = { configurationCheck };
