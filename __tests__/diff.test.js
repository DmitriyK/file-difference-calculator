import fs from 'fs';
import path from 'path';
import genDiff from '../src/index';

const typeFormat = ['json', 'yml', 'ini'];
const styleFormat = ['stylish', 'plain', 'json'];

const getFilesPaths = (type) => (
  [path.resolve(__dirname, `__fixtures__/before.${type}`),
    path.resolve(__dirname, `__fixtures__/after.${type}`)]
);

const getResultPath = (fileName) => path.resolve(__dirname, `__fixtures__/${fileName}.txt`);
const readResultFile = (fileName) => fs.readFileSync(getResultPath(fileName), 'utf-8');

styleFormat.forEach((style) => {
  test.each(typeFormat)(`diff_${style}_%s`, (type) => {
    const [before, after] = getFilesPaths(type);
    const diff = genDiff(before, after, style);
    expect(diff).toEqual(readResultFile(style));
  });
});
