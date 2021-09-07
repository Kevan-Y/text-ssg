#! /usr/bin/env node
const yargs = require('yargs');
const version = require('../package.json').version;
const fs = require('fs');
const path = require('path');
const convertToHtml = require('../ssgHandler');
let isFile;

//version
yargs.version(version).alias('version', 'v');

//Help
yargs.help('help').alias('help', 'h');

//Usage description
yargs.usage(
	'Static Site Generator: This CLI convert a .txt file into a .html file',
);

//Input option
yargs
	.option('i', {
		alias: 'input',
		demandOption: true,
		describe: 'Folder/File input location',
		type: 'string',
		nargs: 1,
	})
	.check((argv) => {
		//Check if path exist
		if (fs.existsSync(argv.i)) {
			//Check if path is a file or directory
			if (fs.lstatSync(argv.i).isFile()) {
				//Check if path is a file ext end with .txt
				if (path.extname(argv.i) === '.txt') {
					isFile = true;
					return true;
				} else
					throw new Error('Argument check failed: file must be a .txt\n\n');
			} else if (fs.lstatSync(argv.i).isDirectory()) {
				//Check if directory contains any file with ext .txt
				fs.readdirSync(argv.i).forEach((file) => {
					if (path.extname(file) !== '.txt')
						throw new Error(
							"Argument check failed: Directory doesn't contain any .txt file\n\n",
						);
				});
				isFile = false;
			}
			return true;
		} else
			throw new Error(
				'Argument check failed: filepath is not a readable file or folder\n\n',
			);
	})
	.fail((msg, err, yargs) => {
		//Print Error with help option
		console.error(`Error: ${msg}`);
		console.log(yargs.help());
		process.exit(1);
	});

//Call convertToHtml
try {
	convertToHtml(yargs.argv.i, isFile);
	console.log('File created successfully at ./dist');
} catch (e) {
	console.error(`Error: ${e}`);
	process.exit(1);
}
yargs.argv;
