
import fs from 'fs';
import path from 'path';
import getDiff from '../src/index';

let jsonAfter;
let jsonBefore;
let result;

beforeAll(() => {
  const resultPath = path.resolve(__dirname, '__fixtures__/result.txt');
  result = fs.readFileSync(resultPath, 'utf-8');
  jsonAfter = path.resolve(__dirname, '__fixtures__/after.json');
  jsonBefore = path.resolve(__dirname, '__fixtures__/before.json');
});

test('diff', async () => {
  const diff = getDiff(jsonBefore, jsonAfter);
  expect(diff).toEqual(result);
});
