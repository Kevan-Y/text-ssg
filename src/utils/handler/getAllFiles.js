const path = require('path');
const fs = require('fs');

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
      filesPathList = await getAllFiles(path.join(dirPath, file), filesPathList);
    } else {
      const extname = path.extname(file);
      if (extname === '.txt' || extname === '.md') filesPathList.push(path.join(dirPath, file));
    }
  }

  return filesPathList;
};

module.exports = { getAllFiles };
