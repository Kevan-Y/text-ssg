const fs = require('fs');
const path = require('path');

/**
 * Check if it is a file
 * @param {string} argv - input path
 * @return {boolean}
 */
const isFile = (argv) => {
  const extname = path.extname(argv);
  if (extname === '.txt' || extname === '.md') {
    return true;
  }
  if (fs.lstatSync(argv).isDirectory()) {
    return false;
  }
  return false;
};

/**
 * Check if valide input option
 * @param {string} argv - input path
 * @return {boolean}
 */
const inputCheck = (argv) => {
  if (argv) {
    // Check if path exist
    if (fs.existsSync(argv)) {
      // Check if path is a file or directory
      if (fs.lstatSync(argv).isFile()) {
        const extname = path.extname(argv);
        // Check if path is a file ext end with .txt, or .md
        if (extname === '.txt' || extname === '.md') {
          return true;
        }
        throw new Error('File must be a .txt or .md');
      } else if (fs.lstatSync(argv).isDirectory()) {
        // checkValidFile recursively check if any .txt or .md file exist
        const checkValidFile = (dirPath) => {
          const dirContents = fs.readdirSync(dirPath);

          // Loop through the content of the directory
          for (const dirContent of dirContents) {
            const dirContentLstat = fs.lstatSync(path.join(dirPath, dirContent));

            if (dirContentLstat.isDirectory()) {
              if (checkValidFile(path.join(dirPath, dirContent))) return true;
            } else {
              const extname = path.extname(dirContent);
              if (extname === '.txt' || extname === '.md') return true;
            }
          }
          return false;
        };

        // Check if directory contains at least one .txt or .md file
        const hasValidFile = checkValidFile(argv);

        if (!hasValidFile) throw new Error("Directory doesn't contain any .txt or .md file.");
      }
      return true;
    }
    throw new Error('Directory or file must exist.');
  }
  return true;
};

module.exports = { inputCheck, isFile };
