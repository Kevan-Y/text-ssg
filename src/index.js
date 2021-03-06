#! /usr/bin/env node
const yargs = require('yargs');
const clear = require('clear');
const chalk = require('chalk');
const figlet = require('figlet');
const { version } = require('../package.json');
const convertToHtml = require('./utils/handler/ssgHandler');
const { stylesheetCheck } = require('./utils/yargsOptionCheck/stylesheetCheck');
const { outputCheck } = require('./utils/yargsOptionCheck/outputCheck');
const { inputCheck, isFile } = require('./utils/yargsOptionCheck/inputCheck');
const { langCheck } = require('./utils/yargsOptionCheck/langCheck');
const { configurationCheck } = require('./utils/yargsOptionCheck/configurationCheck');
const { readConfig } = require('./utils/handler/readConfiguration');

// Clear CLI and display Header
clear();
console.log(chalk.blue(figlet.textSync('Text - SSG', { horizontalLayout: 'full' })));

// version
yargs.version(version).alias('version', 'v');

// Help
yargs.help('help').alias('help', 'h');

// Usage description
yargs.usage(
  'Usage: This is a Static Site Generator CLI that convert .txt and .md files into .html files'
);

// Examples
yargs.example('ssg --input <path>');
yargs.example('ssg --input <path> --output <path>');
yargs.example('ssg --input <path> --output <path> --stylesheet <URL>');
yargs.example('ssg --input <path> --output <path> --stylesheet <URL> --lang <languageCode>');
yargs.example('ssg -i <path> -o <path> -s <URL> -l <languageCode>');
yargs.example('ssg -c <path> -i <path>');

// reject non explicits
yargs.strict().fail((msg, err) => {
  // Print Error with help option
  yargs.showHelp('log');
  console.error(`\n\n${chalk.red.bold('Error:')} ${chalk.red(msg || err)}`);
  process.exit(1);
});

// Input option
yargs
  .option('i', {
    alias: 'input',
    demandOption: false,
    describe: 'Folder/File input location',
    type: 'string',
    nargs: 1,
  })
  .check((argv) => inputCheck(argv.i));

// Stylesheet option
yargs
  .option('s', {
    alias: 'stylesheet',
    demandOption: false,
    describe: 'URL to a CSS stylesheet',
    type: 'string',
    nargs: 1,
  })
  .check((argv) => stylesheetCheck(argv.s));

// Output option
yargs
  .option('o', {
    alias: 'output',
    describe: 'Folder output location',
    type: 'string',
    nargs: 1,
    default: './dist',
  })
  .check((argv) => outputCheck(argv.o));

// Language option
yargs
  .option('l', {
    alias: 'lang',
    describe: 'HTML lang tag',
    type: 'string',
    nargs: 1,
    default: 'en-CA',
  })
  .check((argv) => langCheck(argv.l));

// configuration option
yargs
  .option('c', {
    alias: 'config',
    describe: 'Folder/File configuration JSON file location',
    type: 'string',
    nargs: 1,
  })
  .check((argv) => configurationCheck(argv.c));

// if the option is c or config, use the custom configuration
try {
  let config = null;
  if (yargs.argv.c) {
    config = readConfig(yargs.argv.c);
    inputCheck(config.input);
    langCheck((config.lang ||= 'en-CA'));
    outputCheck((config.output ||= './dist'));
    stylesheetCheck(config.stylesheet);
  } else yargs.demandOption(['input']);

  // Call convertToHtml
  convertToHtml(
    config ? config.input : yargs.argv.i,
    config ? config.stylesheet : yargs.argv.s,
    config ? config.output : yargs.argv.o,
    isFile(config ? config.input : yargs.argv.i),
    config ? config.lang : yargs.argv.l
  );
} catch (e) {
  yargs.showHelp('log');
  console.error(`\n\n${chalk.red.bold('Error:')} ${chalk.red(e.message)}`);
  process.exit(1);
}
// eslint-disable-next-line no-unused-expressions
yargs.argv;
