const fs = require('fs');
const path = require('path');
const { createHtmlFile, createIndexHtmlFile } = require('./generateHtmlFile');
const { getAllFiles } = require('./getAllFiles');

/**
 * @param {string} inputPath
 * @param {string} stylesheet
 * @param {string} outputPath
 * @param {boolean} isFile
 * @param {string} langCode
 */
const convertToHtml = async (
  inputPath,
  stylesheet = '',
  outputPath = './dist',
  isFile,
  langCode = 'en-CA'
) => {
  const routesList = [];
  // Check if ./dist folder exist
  // Remove if exist
  if (fs.existsSync('./dist') && outputPath === './dist') {
    try {
      await fs.promises.rm('./dist', { force: true, recursive: true });
    } catch (e) {
      throw new Error('On delete folder.');
    }
  }

  if (outputPath === './dist') {
    // Create a new folder call ./dist
    try {
      await fs.promises.mkdir('./dist', { recursive: true });
    } catch (e) {
      throw new Error('On create folder.');
    }
  }

  if (isFile) {
    // Read file data
    let data = null;
    try {
      data = await fs.promises.readFile(inputPath, 'utf8');
    } catch (e) {
      throw new Error('Reading file.');
    }

    // Create the html file
    const createdFileName = await createHtmlFile(
      path.basename(inputPath),
      data,
      stylesheet,
      outputPath,
      langCode
    );

    // Add to the array routesList to generate <a> in index.html
    routesList.push({
      url: createdFileName.replace(path.normalize(outputPath), '').substr(1).replaceAll(' ', '-'),
      name: path.basename(createdFileName, '.html'),
    });
    await createIndexHtmlFile(routesList, stylesheet, outputPath, langCode);
  } else {
    // Get allFiles
    const filesPathList = [];
    await getAllFiles(inputPath, filesPathList);

    const listFolderPath = [];
    // Remove root folder and removes duplicates
    for (let filePath of filesPathList) {
      filePath = filePath.split(/\\|\//);
      filePath.shift();
      filePath = filePath.join('/');
      if (!listFolderPath.includes(path.dirname(filePath))) {
        listFolderPath.push(path.dirname(filePath));
      }
    }

    // Create folder
    for (const dir of listFolderPath) {
      try {
        await fs.promises.mkdir(path.join(outputPath, dir).replaceAll(' ', '-'), {
          recursive: true,
        });
      } catch (e) {
        throw new Error(`Create folder for ${dir}`);
      }
    }

    for (let filePath of filesPathList) {
      // Read file data
      let data = null;
      try {
        data = await fs.promises.readFile(filePath, 'utf8');
      } catch (e) {
        throw new Error('Reading file.');
      }
      // Remove root folder
      filePath = filePath.split(/\\|\//);
      filePath.shift();
      const noRootFilePath = filePath.join('/');

      // Create the html file
      const createdFileName = await createHtmlFile(
        path.basename(noRootFilePath),
        data,
        stylesheet,
        path.join(outputPath, path.dirname(noRootFilePath)).replaceAll(' ', '-'),
        langCode
      );

      // Add to the array routesList to generate <a> in index.html
      routesList.push({
        url: (/^\\|\//.test(createdFileName.replace(path.normalize(outputPath), '')[0])
          ? createdFileName.replace(path.normalize(outputPath), '').substr(1)
          : createdFileName.replace(path.normalize(outputPath), '')
        )
          .replaceAll(' ', '-')
          .replaceAll('\\', '/'),
        name: path.basename(createdFileName, '.html'),
      });
    }
    await createIndexHtmlFile(routesList, stylesheet, outputPath, langCode);
  }
};

module.exports = convertToHtml;
