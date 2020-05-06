
import fs from 'fs';
import path from 'path';
import getDiff from '../src/index';

const typeFormat = ['json', 'yml', 'ini'];

const getFilesPaths = (type) => (
  [path.resolve(__dirname, `__fixtures__/before.${type}`),
    path.resolve(__dirname, `__fixtures__/after.${type}`)]
);

const resultPath = path.resolve(__dirname, '__fixtures__/result.txt');
const resultFile = fs.readFileSync(resultPath, 'utf-8');

test.each(typeFormat)('diff_%s', (type) => {
  const [before, after] = getFilesPaths(type);
  const diff = getDiff(before, after);
  expect(diff).toEqual(resultFile);
});
