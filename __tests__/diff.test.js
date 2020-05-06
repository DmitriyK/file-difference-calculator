
import fs from 'fs';
import path from 'path';
import getDiff from '../src/index';

const typeFormat = ['json', 'yml'];

const getFilesPaths = (type) => (
  [path.resolve(__dirname, `__fixtures__/before.${type}`),
    path.resolve(__dirname, `__fixtures__/after.${type}`)]
);

const resultPath = path.resolve(__dirname, '__fixtures__/result.txt');
const result = fs.readFileSync(resultPath, 'utf-8');

typeFormat.forEach((type) => (
  test(`diff_${type}`, async () => {
    const [jsonBefore, jsonAfter] = getFilesPaths(type);
    const diff = getDiff(jsonBefore, jsonAfter);
    expect(diff).toEqual(result);
  })
));
