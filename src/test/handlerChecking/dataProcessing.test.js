const { dataProcessing } = require('../../utils/handler/dataProcessing');

describe('Data processing', () => {
  it('Should convert .txt data with content with title', () => {
    const data = dataProcessing(
      'This is the title\n\n\nHello world,\n\n2021\n\nThis is a static site\n\nI love programing',
      '.txt'
    );
    const expectDataContent = [
      '<p>Hello world,</p>',
      '<p>2021</p>',
      '<p>This is a static site</p>',
      '<p>I love programing</p>',
    ];
    const expectDataTitle = 'This is the title';

    expect(data.content).toEqual(expectDataContent);
    expect(data.title).toEqual(expectDataTitle);
  });

  it('Should convert .txt data with content without title', () => {
    const data = dataProcessing('Hello world,\n\n2021', '.txt');
    const expectDataContent = ['<p>Hello world,</p>', '<p>2021</p>'];
    const expectDataTitle = '';

    expect(data.content).toEqual(expectDataContent);
    expect(data.title).toEqual(expectDataTitle);
  });

  it('Should convert .txt data with empty content', () => {
    const data = dataProcessing('', '.txt');
    const expectDataContent = '';
    const expectDataTitle = '';

    expect(data.content).toEqual(expectDataContent);
    expect(data.title).toEqual(expectDataTitle);
  });

  it('Should convert .md data with content', () => {
    const data = dataProcessing(
      '# H1\n\n## H2\n\n### H3\n\n#### H4\n\n##### H5\n\n###### H6\n\n',
      '.md'
    );
    const expectDataContent = `<h1>H1</h1>\n<h2>H2</h2>\n<h3>H3</h3>
<h4>H4</h4>\n<h5>H5</h5>\n<h6>H6</h6>\n`;

    expect(data.content).toEqual(expectDataContent);
  });

  it('Should convert .md data with empty content', () => {
    const data = dataProcessing('', '.md');
    const expectDataContent = '';

    expect(data.content).toEqual(expectDataContent);
  });
});
