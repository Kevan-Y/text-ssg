const { configurationCheck } = require('../../utils/yargsOptionCheck/configurationCheck');

describe('Configuration argv check', () => {
  it('Check for correct json file', () => {
    const response = configurationCheck('src\\test\\test_file\\config.json');
    expect(response).toBe(true);
  });

  it('Check for not json file', () => {
    try {
      configurationCheck('src\\test\\test_file\\folder_with_random_files\\Silver Blaze.txt');
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toBe('File must be a JSON type file');
    }
  });

  it('Check for non exist file', () => {
    try {
      configurationCheck('notfound.json');
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toBe('File must exist from config check');
    }
  });
});
