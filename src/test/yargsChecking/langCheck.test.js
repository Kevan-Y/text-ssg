const { langCheck } = require('../../utils/yargsOptionCheck/langCheck');

describe('Language argv check', () => {
  it('Check for correct language', () => {
    const response = langCheck('en');
    expect(response).toBe(true);
  });

  it('Check for correct language with different camel case', () => {
    const response = langCheck('eN-cA');
    expect(response).toBe(true);
  });

  it('Check for incorrect language', () => {
    try {
      langCheck('eN-cAd');
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toBe('Must be an valid code language.');
    }
  });
});
