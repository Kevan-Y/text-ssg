const fs = require('fs');
const path = require('path');
const { createHtmlFile, createIndexHtmlFile } = require('../../utils/handler/generateHtmlFile');

describe('Create HTML file', () => {
  beforeAll(async () => {
    await fs.promises.mkdir('./dist', { recursive: true });
  });

  it('Should able to create a html file', async () => {
    const returnFilePath = await createHtmlFile('hello.txt', '<p>123<p>', '', './dist', 'en-fr');
    const expectFilePath = 'dist/hello.html';
    expect(fs.existsSync('dist/hello.html')).toBe(true);
    expect(returnFilePath).toEqual(path.normalize(expectFilePath));
  });
});

describe('Create index HTML file', () => {
  it('Should able to create a index html file', async () => {
    await createIndexHtmlFile(
      [
        { url: 'hello/helloworld', name: 'helloworld' },
        { url: 'helloworld2', name: 'helloworld2' },
      ],
      '',
      './dist',
      'en-fr'
    );
    expect(fs.existsSync('dist/index.html')).toBe(true);
  });

  afterAll(async () => {
    await fs.promises.rm('./dist', { force: true, recursive: true });
  });
});
