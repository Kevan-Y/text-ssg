const fs = require('fs');
const generateHTML = require('./generateHtml');
const path = require('path');

/**
 * ReadFile wrapped with Promise
 * @param {string} filePath
 */
const readFile = (filePath) => {
	return new Promise((resolve, reject) => {
		fs.readFile(filePath, 'utf8', (error, fileContent) => {
			if (error != null) {
				reject(error);
				return;
			}

			resolve(fileContent);
		});
	});
};

/**
 * createHtml generateHTML file
 * @param {string} fileName
 * @param {string} data
 */
const createHtmlFile = (fileName = 'index', data, stylesheet = '', dir) => {
	let htmlOption = {
		title: '',
		content: '',
		style: stylesheet,
	};

	//convert data into an array
	data = data.split('\n');

	if (data.length >= 3) {
		//Check if title exist
		if (data[0] && !data[1] && !data[2]) {
			htmlOption.title = data[0];
			data = data.slice(3);
		}
	}

	//Remove empty array and combine sentence together
	data.forEach((phase, i) => {
		if (!phase) data[i] = '_space_';
	});
	data = data.join('').split('_space_');
	htmlOption.content = data;

	//Create a new html file
	fs.writeFileSync(
		`${dir}/${fileName}.html`,
		generateHTML(htmlOption),
		(err) => {
			if (err) throw new Error(err);
		},
	);
};

/**
 * @param {string} paths
 * @param {boolean} isFile
 */
const convertToHtml = (paths, isFile, stylesheet = '', dir) => {
	//Check if ./dist folder exist
	//Remove if exist
	if (fs.existsSync('./dist')) {
		fs.rmSync('./dist', { recursive: true }, (err) => {
			if (err) throw new Error(err);
		});
	}
	if (dir === './dist')
		//Create a new folder call ./dist
		fs.mkdirSync('./dist', { recursive: true }, (err) => {
			if (err) throw new Error(err);
		});

	if (isFile) {
		readFile(paths)
			.then((data) => {
				createHtmlFile(undefined, data, stylesheet, dir);
			})
			.catch((err) => {
				throw new Error(err);
			});
	} else {
		fs.readdirSync(paths).forEach((file) => {
			if (path.extname(file) === '.txt') {
				readFile(path.join(paths, file))
					.then((data) => {
						createHtmlFile(path.basename(file), data, stylesheet, dir);
					})
					.catch((err) => {
						throw err;
					});
			}
		});
	}
};

module.exports = convertToHtml;
