const hljs = require('highlight.js');

// Markdown config
const md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true,
  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (e) {
        throw new Error('Error converting markdown to highlight');
      }
    }

    return ''; // use external default escaping
  },
});

/**
 * dataProcessing separate data title and content
 * @param {string} data
 * @return {object} title and content
 */
const dataProcessing = (data_, fileExtension) => {
  const dataTreated = { title: '', content: '' };

  if (fileExtension === '.txt') {
    // convert data into an array
    let data = data_.split('\n').map((sentence) => sentence.replace('\r', ''));

    if (data.length >= 3) {
      // Check if title exist
      if (data[0] && !data[1] && !data[2]) {
        [dataTreated.title] = data;
        data = data.slice(3);
      }
    }

    // Remove empty array and combine sentence together
    data.forEach((phase, i) => {
      if (!phase) data[i] = '_space_';
    });
    data = data.join('').split('_space_');
    dataTreated.content = data.map((paragraph) => `<p>${paragraph}</p>`);
  } else {
    // Convert to markdown
    dataTreated.content = md.render(data_);
  }
  return dataTreated;
};
module.exports = { dataProcessing };
