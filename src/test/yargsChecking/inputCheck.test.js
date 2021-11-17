const { inputCheck } = require('../../utils/yargsOptionCheck/inputCheck');

describe('Input argv check', () => {
  it('Check for correct input file', () => {
    const response = inputCheck('src/test/test_file/folder_with_md_txt/OpenSource.md');
    expect(response).toBe(true);
  });

  it('Check for non exist file', () => {
    try {
      inputCheck('hello.txt');
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toBe('Directory or file must exist.');
    }
  });

  it('Check for not .txt or .md file', () => {
    try {
      inputCheck('src/test/test_file/folder_with_no_md_txt/index.html');
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toBe('File must be a .txt or .md');
    }
  });

  it('Check for folder with .md or .txt files', () => {
    const response = inputCheck('src/test/test_file/folder_with_md_txt');
    expect(response).toBe(true);
  });

  it('Check for folder without .md or .txt file', () => {
    try {
      inputCheck('src/test/test_file/folder_with_no_md_txt');
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toBe("Directory doesn't contain any .txt or .md file.");
    }
  });
});
