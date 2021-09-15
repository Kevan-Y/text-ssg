const fs = require('fs');
const generateHTML = require('./generateHtmlTemplate');
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
	data = data.split('\n').map((sentence) => sentence.replace('\r', ''));

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

	const noSpaceFileName = fileName.replaceAll(' ', '-');
	//Create a new html file
	await fs.promises.writeFile(
		path.join(`${outputPath}`, `${noSpaceFileName}.html`),
		generateHTML.generateHtmlTemplate(htmlOption),
		(err) => {
			if (err) throw new Error(err);
		},
	);
	console.log(
		`File created -> ${path.join(`${outputPath}`, `${noSpaceFileName}.html`)}`,
	);
	return path.join(`${outputPath}`, `${fileName}.html`);
};

/**
 * createHtmlFile generateHTML file
 * @param {Array} routeList - Array containing name and url for the file route
 * @param {string} stylesheet
 * @param {string} outputPath
 */
const createIndexHtmlFile = async (routeList, stylesheet = '', outputPath) => {
	let htmlOption = {
		routeList,
		style: stylesheet,
	};

	//Create a new html file
	await fs.promises.writeFile(
		path.join(`${outputPath}`, `index.html`),
		generateHTML.generateHtmlMenuTemplate(htmlOption),
		(err) => {
			if (err) throw new Error(err);
		},
	);
	console.log(`File created -> ${path.join(`${outputPath}`, `index.html`)}`);
};

/**
 * getAllFiles getting all file of a folder recursively
 * @param {string} dirPath
 * @param {Array} filesPathList
 */
const getAllFiles = async (dirPath, filesPathList) => {
	const files = await fs.promises.readdir(dirPath);
	filesPathList ||= [];

	for (const file of files) {
		const fileLstat = await fs.promises.lstat(path.join(dirPath, file));
		if (fileLstat.isDirectory()) {
			filesPathList = await getAllFiles(
				path.join(dirPath, file),
				filesPathList,
			);
		} else {
			if (path.extname(file) === '.txt')
				filesPathList.push(path.join(dirPath, file));
		}
	}

	return filesPathList;
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
	let routesList = [];
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
		//Read file data
		const data = await readFile(inputPaths);

		//Create the html file
		let createdFileName = await createHtmlFile(
			path.basename(inputPaths, '.txt'),
			data,
			stylesheet,
			outputPath,
		);

		//Add to the array routesList to generate <a> in index.html
		routesList.push({
			url: createdFileName
				.replace(path.normalize(outputPath), '')
				.substr(1)
				.replaceAll(' ', '-'),
			name: path.basename(createdFileName, '.html'),
		});
		await createIndexHtmlFile(routesList, stylesheet, outputPath);
	} else {
		//Get allFiles
		const filesPathList = [];
		await getAllFiles(inputPaths, filesPathList);

		const listFolderPath = [];
		//Remove root folder and removes duplicates
		for (let filePath of filesPathList) {
			filePath = filePath.split(/\\|\//);
			filePath.shift();
			filePath = filePath.join('/');
			if (!listFolderPath.includes(path.dirname(filePath))) {
				listFolderPath.push(path.dirname(filePath));
			}
		}

		//Create folder
		for (let dir of listFolderPath) {
			await fs.promises.mkdir(
				path.join(outputPath, dir).replaceAll(' ', '-'),
				{ recursive: true },
				(err) => {
					if (err) throw new Error(err);
				},
			);
		}

		for (let filePath of filesPathList) {
			//Read file data
			const data = await readFile(filePath);

			//Remove root folder
			filePath = filePath.split(/\\|\//);
			filePath.shift();
			const noRootFilePath = filePath.join('/');

			//Create the html file
			let createdFileName = await createHtmlFile(
				path.basename(noRootFilePath, '.txt'),
				data,
				stylesheet,
				path
					.join(outputPath, path.dirname(noRootFilePath))
					.replaceAll(' ', '-'),
			);

			//Add to the array routesList to generate <a> in index.html
			routesList.push({
				url: (/^\\|\//.test(
					createdFileName.replace(path.normalize(outputPath), '')[0],
				)
					? createdFileName.replace(path.normalize(outputPath), '').substr(1)
					: createdFileName.replace(path.normalize(outputPath), '')
				).replaceAll(' ', '-').replaceAll('\\', '/'),
				name: path.basename(createdFileName, '.html'),
			});
		}
		await createIndexHtmlFile(routesList, stylesheet, outputPath);
	}
};

module.exports = convertToHtml;
