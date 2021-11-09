const { getAllFiles } = require('../../utils/handler/getAllFiles');

describe('Get all files check', () => {
  it('Should return only list of path of md and txt files', () => {
    getAllFiles('src/test/test_file/folder_with_random_files').then((data) => {
      const expectArray = [
        'src\\test\\test_file\\folder_with_random_files\\OpenSource.md',
        'src\\test\\test_file\\folder_with_random_files\\Silver Blaze.txt',
      ];
      expect(data).toEqual(expectArray);
    });
  });

  it('Should return nothing', () => {
    getAllFiles('src/test/test_file/folder_with_no_md_txt').then((data) => {
      const expectArray = [];
      expect(data).toEqual(expectArray);
    });
  });
});
