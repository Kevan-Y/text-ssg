const path = require('path');
const fs = require('fs');
const { generateHtmlTemplate, generateHtmlMenuTemplate } = require('./htmlTemplate');
const { dataProcessing } = require('./dataProcessing');

/**
 * createHtmlFile generateHTML file
 * @param {string} fileName
 * @param {string} data
 * @param {string} stylesheet
 * @param {string} outputPath
 * @param {string} langCode
 */
const createHtmlFile = async (fileName_, data, stylesheet, outputPath, langCode) => {
  const extname = path.extname(fileName_);
  const fileName = path.basename(fileName_, extname);

  const htmlOption = {
    ...dataProcessing(data, extname),
    style: stylesheet,
    extname,
    langCode,
  };
  const noSpaceFileName = fileName.replaceAll(' ', '-');
  try {
    // Create a new html file
    await fs.promises.writeFile(
      path.join(`${outputPath}`, `${noSpaceFileName}.html`),
      generateHtmlTemplate(htmlOption)
    );
  } catch (e) {
    throw new Error(`On write file ${path.join(`${outputPath}`, `${noSpaceFileName}.html`)}`);
  }
  console.log(`File created -> ${path.join(`${outputPath}`, `${noSpaceFileName}.html`)}`);
  return path.join(`${outputPath}`, `${fileName}.html`);
};

/**
 * createHtmlFile generateHTML file
 * @param {Array} routeList - Array containing name and url for the file route
 * @param {string} stylesheet
 * @param {string} outputPath
 * @param {string} langCode
 */
const createIndexHtmlFile = async (routeList, stylesheet, outputPath, langCode) => {
  const htmlOption = {
    routeList,
    style: stylesheet,
    langCode,
  };
  try {
    // Create a new html file
    await fs.promises.writeFile(
      path.join(`${outputPath}`, 'index.html'),
      generateHtmlMenuTemplate(htmlOption),
      (err) => {
        if (err) throw new Error(err);
      }
    );
  } catch (e) {
    throw new Error(`On write file ${path.join(`${outputPath}`, 'index.html')}`);
  }
  console.log(`File created -> ${path.join(`${outputPath}`, 'index.html')}`);
};

module.exports = { createHtmlFile, createIndexHtmlFile };
