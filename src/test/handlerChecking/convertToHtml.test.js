const fs = require('fs');
const convertToHtml = require('../../utils/handler/ssgHandler');

describe('Convert to Html', () => {
  it('Should able to create a html file', async () => {
    await convertToHtml(
      'src/test/test_file/folder_with_random_files',
      '',
      './dist',
      false,
      'en-CA'
    );
    expect(fs.existsSync('dist/index.html')).toBe(true);
    expect(fs.existsSync('dist/test/test_file/folder_with_random_files/OpenSource.html')).toBe(
      true
    );
    expect(fs.existsSync('dist/test/test_file/folder_with_random_files/Silver-Blaze.html')).toBe(
      true
    );
  });
});
