#! /usr/bin/env node
const yargs = require('yargs');
const version = require('../package.json').version;
const clear = require('clear');
const convertToHtml = require('../ssgHandler');
const chalk = require('chalk');
const figlet = require('figlet');
const { stylesheetCheck } = require('./utils/yargsOptionCheck/stylesheetCheck');
const { outputCheck } = require('./utils/yargsOptionCheck/outputCheck');
const { inputCheck, isFile } = require('./utils/yargsOptionCheck/inputCheck');
const { langCheck } = require('./utils/yargsOptionCheck/langCheck');
const { configurationCheck } = require('./utils/yargsOptionCheck/configurationCheck');
const { readConfig } = require('../applyConfiguration');
//Clear CLI and display Header
clear();
console.log(
	chalk.blue(figlet.textSync('Text - SSG', { horizontalLayout: 'full' })),
);

//version
yargs.version(version).alias('version', 'v');

//Help
yargs.help('help').alias('help', 'h');

//Usage description
yargs.usage(
	'Usage: This is a Static Site Generator CLI that convert .txt and .md files into .html files',
);

//Examples
yargs.example(`ssg --input <path>`);
yargs.example(`ssg --input <path> --output <path>`);
yargs.example(`ssg --input <path> --output <path> --stylesheet <URL>`);
yargs.example(
	`ssg --input <path> --output <path> --stylesheet <URL> --lang <languageCode>`,
);
yargs.example(`ssg -i <path> -o <path> -s <URL> -l <languageCode>`);
yargs.example(`ssg -c <path> -i <path>`);

//reject non explicits
yargs.strict().fail((msg, err, yargs) => {
	//Print Error with help option
	console.log(yargs.help());

	console.error(`\n\n${chalk.red.bold('Error:')} ${chalk.red(msg || err)}`);
	process.exit(1);
});


//Input option
yargs
	.option('i', {
		alias: 'input',
		demandOption: false,
		describe: 'Folder/File input location',
		type: 'string',
		nargs: 1,
	})
	.check((argv) => {
		return inputCheck(argv.i);
	});

//Stylesheet option
yargs
	.option('s', {
		alias: 'stylesheet',
		demandOption: false,
		describe: 'URL to a CSS stylesheet',
		type: 'string',
		nargs: 1,
	})
	.check((argv) => {
		return stylesheetCheck(argv.s);
	});

//Output option
yargs
	.option('o', {
		alias: 'output',
		describe: 'Folder output location',
		type: 'string',
		nargs: 1,
		default: './dist',
	})
	.check((argv) => {
		return outputCheck(argv.o);
	});

//Language option
yargs
	.option('l', {
		alias: 'lang',
		describe: 'HTML lang tag',
		type: 'string',
		nargs: 1,
		default: 'en-CA',
	})
	.check((argv) => {
		return langCheck(argv.l);
	});

//configuration option
yargs
	.option('c', {
		alias: 'config',
		describe: 'Folder/File configuration JSON file location',
		type: 'string',
		nargs: 1
	})
	.check((argv) => {
		return configurationCheck(argv.c);
	});

//if the option is c or config, use the custom configuration
if(yargs.argv.c){
	try {
		const config = readConfig(yargs.argv.c);
		if(!config.input) throw new Error('Directory or file must exist.');
		convertToHtml(
			config.input,
			config.stylesheet,
			config.output || './dist',
			isFile(config.input),
			config.lang,
		);
	} catch (e) {
		console.error(`\n\n${chalk.red.bold('Error:')} ${chalk.red(e)}`);
		process.exit(1);
	}
}else {
	yargs.demandOption['input'];
	//Call convertToHtml
	try {
		convertToHtml(
			yargs.argv.i,
			yargs.argv.s,
			yargs.argv.o,
			isFile(yargs.argv.i),
			yargs.argv.l,
		);
	} catch (e) {
		console.error(`\n\n${chalk.red.bold('Error:')} ${chalk.red(e)}`);
		process.exit(1);
	}
}
yargs.argv;

