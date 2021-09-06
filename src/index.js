#! /usr/bin/env node
const yargs = require('yargs');
const version = require('../package.json').version;

//version
yargs.version(version).alias('version', 'v');

//Help
yargs.help('help').alias('help', 'h');

//Usage description
yargs.usage(
	'Static Site Generator: This CLI convert a .txt file into a .html file',
);

console.log(yargs.argv);
