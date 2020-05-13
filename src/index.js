// @ts-check
import path from 'path';
import fs from 'fs';
import has from 'lodash/has';
import isObject from 'lodash/isObject';
import union from 'lodash/union';
import parser from './parsers';
import render from './formatter/index';

const getData = (file) => {
  const filePath = path.resolve(file);
  const typeFile = path.extname(filePath);
  const data = fs.readFileSync(filePath, { encoding: 'utf8' });
  const parsed = parser(data, typeFile);
  return parsed;
};

const getDiff = (data1, data2) => {
  const keys = union(Object.keys(data1), Object.keys(data2)).sort();
  const buildResult = (key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    if (isObject(value1) && isObject(value2)) {
      return { type: 'compared', key, value: getDiff(value1, value2) };
    }
    if (has(data1, key) && !has(data2, key)) {
      return { type: 'removed', key, removedValue: value1 };
    }
    if (!has(data1, key) && has(data2, key)) {
      return { type: 'added', key, value: value2 };
    }
    if (value1 === value2) {
      return { type: 'unchanged', key, value: value1 };
    }
    return {
      type: 'changed', key, value: value1, removedValue: value2,
    };
  };
  return keys.map(buildResult);
};

const genDiff = (file1, file2, format) => {
  const data1 = getData(file1);
  const data2 = getData(file2);
  const differences = getDiff(data1, data2);
  return render(differences, format);
};

export default genDiff;
