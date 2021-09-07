const generateHTML = (options) => {
	return `
    <!doctype html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>${options.title || 'Document'}</title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
        <h1>${options.title || 'Document'}</h1>
        ${
					options.content.map((phrases) => `<p>${phrases}</p>\n`).join('\n') ||
					''
				} 
    </body>
    </html>
    `;
};
module.exports = generateHTML;
