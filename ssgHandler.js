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
const treatData = (data, fileExtension) => {
	let dataTreated = { title: '', content: '' };

	if (fileExtension === '.txt') {
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
	}
	else {
		// If file is .md, assuming the Markdown syntax is correct, replace each Markdown tag to its HTML equivalent

		// heading starts with 1 or more hash sign followed by a white space
		const headings = new RegExp(/^\s*(#{1,6})\s+(.+)$/, 'gm');
		data = data.replaceAll(headings, (match, hash, title) => {
			dataTreated.title = !dataTreated.title ? title : dataTreated.title;

			const tag = `h${hash.length}`;
			return `<${tag}>${title}</${tag}>`;
		});

		// bold texts could be either **text** or __text__
		const bolds = new RegExp(/[\*_]{2}(.+?)[\*_]{2}/, 'gm');
		data = data.replaceAll(bolds, '<strong>$1</strong>');

		// italic texts could be either *text* or _text_
		const italics = new RegExp(/[\*_]{1}(.+?)[\*_]{1}/, 'gm');
		data = data.replaceAll(italics, '<i>$1</i>');

		// Links could be in the form [name](href title) or [name](href)
		const links = new RegExp(/\[(.*?)\]\((.+?)(?:\s"(.*?)")?\)/, 'gm');
		data = data.replaceAll(links, (match, p1, p2, p3) => `<a href="${p2}" ${p3 ? `title="${p3}"`: ''}>${p1}</a>`);

		// in markdown, paragraphs are splitted by one or more New line.
		dataTreated.content =  data.split(/(?:\r?\n)+/);
	}
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
	const extname = path.extname(fileName);
	fileName = path.basename(fileName, extname);

	let htmlOption = {
		...treatData(data, extname),
		style: stylesheet,
		extname,
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
			const extname = path.extname(file);
			if (extname === '.txt' || extname === '.md')
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
			path.basename(inputPaths),
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
				path.basename(noRootFilePath),
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
