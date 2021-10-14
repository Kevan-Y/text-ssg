/**
 * dataProcessing separate data title and content
 * @param {string} data
 * @return {object} title and content
 */
const dataProcessing = (data, fileExtension) => {
	let dataTreated = { title: '', content: '' };

	if (fileExtension === '.txt') {
		//convert data into an array
		data = data.split('\n').map((sentence) => sentence.replace('\r', ''));

		if (data.length >= 3) {
			//Check if title exist
			if (data[0] && !data[1] && !data[2]) {
				dataTreated.title = data[0];
				data = data.slice(3);
			}
		}

		//Remove empty array and combine sentence together
		data.forEach((phase, i) => {
			if (!phase) data[i] = '_space_';
		});
		data = data.join('').split('_space_');
		dataTreated.content = data.map((paragraph) => `<p>${paragraph}</p>`);
	} else {
		// If file is .md, assuming the Markdown syntax is correct, replace each Markdown tag to its HTML equivalent

		// convert --- to <hr>
		const hr = new RegExp(/^---$/, 'gm');
		data = data.replaceAll(hr, '<hr>');

		// Links could have the form of [name](href title) or [name](href)
		const links = new RegExp(/\[(.*?)\]\((.+?)(?:\s"(.*?)")?\)/, 'gm');
		data = data.replaceAll(
			links,
			(match, p1, p2, p3) =>
				`<a href="${p2}" ${p3 ? `title="${p3}"` : ''}>${p1}</a>`,
		);

		const bolds = new RegExp(/\*{2}(.+?)\*{2}/, 'gm');
		data = data.replaceAll(bolds, '<strong>$1</strong>');

		const italics = new RegExp(/\*{1}(.+?)\*{1}/, 'gm');
		data = data.replaceAll(italics, '<i>$1</i>');

		data = data.split(/(?:\r?\n)+/).map((paragraph) => {
			// heading starts with 1 or more hash sign followed by a white space
			const headings = new RegExp(/^\s*(#{1,6})\s+(.+)$/, 'gm');
			if (headings.test(paragraph)) {
				return paragraph.replaceAll(headings, (match, hash, title) => {
					dataTreated.title =
						!dataTreated.title && hash.length === 1 ? title : dataTreated.title;
					const tag = `h${hash.length}`;
					return `<${tag}>${title}</${tag}>`;
				});
			}
			if (/^<.*>$/.test(paragraph)) return paragraph;
			return `<p>${paragraph}</p>`;
		});

		// in markdown, paragraphs are splitted by one or more New line.
		dataTreated.content = data;
	}
	return dataTreated;
};
module.exports = { dataProcessing };
