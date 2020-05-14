
import fs from 'fs';
import path from 'path';
import genDiff from '../src/index';

const typeFormat = ['json', 'yml', 'ini'];
const styleFormat = ['stylish', 'plain'];

const getFilesPaths = (type) => (
  [path.resolve(__dirname, `__fixtures__/before.${type}`),
    path.resolve(__dirname, `__fixtures__/after.${type}`)]
);

const pathFile1 = path.resolve(__dirname, '__fixtures__/resultDefault.txt');
const resultDefault = fs.readFileSync(pathFile1, 'utf-8');

const pathPlain = path.resolve(__dirname, '__fixtures__/resultPlain.txt');
const resultPlain = fs.readFileSync(pathPlain, 'utf-8');

test.each(typeFormat)('diff_default_%s', (type) => {
  const [before, after] = getFilesPaths(type);
  const diff = genDiff(before, after, styleFormat[0]);
  expect(diff).toEqual(resultDefault);
});

test.each(typeFormat)('diff_plain_%s', (type) => {
  const [before, after] = getFilesPaths(type);
  const diff = genDiff(before, after, styleFormat[1]);
  expect(diff).toEqual(resultPlain);
});
