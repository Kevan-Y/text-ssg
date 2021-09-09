const fs = require('fs');
const generateHtmlTemplate = require('./generateHtmlTemplate');
const path = require('path');

/**
 * readFile wrapped with Promise
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
 * treatData seperate data title and content
 * @param {string} data
 * @return {object} title and content
 */
const treatData = (data) => {
	let dataTreated = { title: '', content: '' };
	//convert data into an array
	data = data.split('\n');

	if (data.length >= 3) {
		//Check if title exist
		if (data[0] && !data[1] && !data[2]) {
			dataTreated.title = data[0];
			data = data.slice(3);
		}
	}

	//Remove empty array and combine sentence together
	data.forEach((phase, i) => {
		if (!phase) data[i] = '_space_';
	});
	data = data.join('').split('_space_');
	dataTreated.content = data;

	return dataTreated;
};

/**
 * createHtmlFile generateHTML file
 * @param {string} fileName
 * @param {string} data
 * @param {string} stylesheet
 * @param {string} outputPath
 */
const createHtmlFile = async (fileName, data, stylesheet = '', outputPath) => {
	let htmlOption = {
		...treatData(data),
		style: stylesheet,
	};
	//Create a new html file
	await fs.promises.writeFile(
		path.join(`${outputPath}`, `${fileName}.html`),
		generateHtmlTemplate(htmlOption),
		(err) => {
			if (err) throw new Error(err);
		},
	);
	console.log(
		`File created -> ${path.join(`${outputPath}`, `${fileName}.html`)}`,
	);
};

/**
 * @param {string} inputPaths
 * @param {string} stylesheet
 * @param {string} outputPath
 * @param {boolean} isFile
 */
const convertToHtml = async (
	inputPaths,
	stylesheet = '',
	outputPath,
	isFile,
) => {
	//Check if ./dist folder exist
	//Remove if exist
	if (fs.existsSync('./dist') && outputPath === './dist') {
		await fs.promises.rm('./dist', { force: true, recursive: true }, (err) => {
			if (err) throw new Error(err);
		});
	}
	if (outputPath === './dist')
		//Create a new folder call ./dist
		await fs.promises.mkdir('./dist', { recursive: true }, (err) => {
			if (err) throw new Error(err);
		});

	if (isFile) {
		readFile(inputPaths)
			.then((data) => {
				createHtmlFile(
					path.basename(inputPaths, '.txt'),
					data,
					stylesheet,
					outputPath,
				);
			})
			.catch((err) => {
				throw new Error(err);
			});
	} else {
		fs.readdir(inputPaths, (err, files) => {
			if (err) throw new Error(err);
			else {
				files.forEach((file) => {
					//Look for .txt file and createHtmlFile if found
					if (path.extname(file) === '.txt') {
						readFile(path.join(inputPaths, file))
							.then((data) => {
								createHtmlFile(
									path.basename(file, '.txt'),
									data,
									stylesheet,
									outputPath,
								);
							})
							.catch((err) => {
								throw new Error(err);
							});
					}
				});
			}
		});
	}
};

module.exports = convertToHtml;
