const { isFile } = require('../../utils/yargsOptionCheck/inputCheck');

describe('IsFile check', () => {
  it('Check for correct file', () => {
    const response = isFile('src/test/test_file/folder_with_md_txt/Silver Blaze.txt');
    expect(response).toBe(true);
  });

  it('Check for directory', () => {
    const response = isFile('src/test/test_file/folder_with_no_md_txt');
    expect(response).toBe(false);
  });

  it('Check for not .txt or .md files', () => {
    const response = isFile('src/test/test_file/folder_with_no_md_txt/index.html');
    expect(response).toBe(false);
  });
});
