const { readConfig } = require('../../utils/handler/readConfiguration');

describe('Read configuration file', () => {
  it('Should read json file', () => {
    const data = readConfig('src/test/test_file/config.json');
    const expectJson = {
      input: './samples',
      output: './dist',
    };
    expect(data).toBeInstanceOf(Object);
    expect(data).toEqual(expectJson);
  });

  it('Should read empty json file', () => {
    const data = readConfig('src/test/test_file/emptyConfig.json');
    const expectJson = {};
    expect(data).toBeInstanceOf(Object);
    expect(data).toEqual(expectJson);
  });
});
