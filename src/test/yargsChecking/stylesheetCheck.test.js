const { stylesheetCheck } = require('../../utils/yargsOptionCheck/stylesheetCheck');

describe('Stylesheet argv check', () => {
  it('Check for correct stylesheet URL', () => {
    const response = stylesheetCheck('https://cdn.jsdelivr.net/npm/water.css@2/out/water.css');
    expect(response).toBe(true);
  });

  it('Check for incorrect stylesheet URL', () => {
    try {
      stylesheetCheck('https://cdn.jsdelivr.net/npm/water.css@2/out');
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toBe('Must be an URL to a CSS stylesheet.');
    }
  });
});
