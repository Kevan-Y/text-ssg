const { outputCheck } = require('../../utils/yargsOptionCheck/outputCheck');

describe('Output argv check', () => {
  it('Check for correct output directory', () => {
    const response = outputCheck('examples');
    expect(response).toBe(true);
  });

  it('Check for not a output directory', () => {
    try {
      outputCheck('src/test/test_file/folder_with_md_txt/OpenSource.md');
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toBe('Path must be a directory.');
    }
  });

  it('Check for non exist output directory', () => {
    try {
      outputCheck('not path');
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toBe('Directory must exist.');
    }
  });
});
