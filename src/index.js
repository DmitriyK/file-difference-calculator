// @ts-check
import path from 'path';
import fs from 'fs';
import has from 'lodash/has';
import parser from './parsers';

const getData = (file) => {
  const filePath = path.resolve(file);
  const typeFile = path.extname(filePath);
  const data = fs.readFileSync(filePath, { encoding: 'utf8' });
  const parsed = parser(data, typeFile);
  return parsed;
};

const getResult = (data1, data2) => {
  const keys = Object.keys(data1).concat(Object.keys(data2));
  const uniqKeys = [...new Set(keys)];
  const buildResult = (acc, key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    if (!has(data1, key) && has(data2, key)) {
      return [...acc, [`+ ${key}: ${value2}`]];
    }
    if (has(data1, key) && !has(data2, key)) {
      return [...acc, [`- ${key}: ${value1}`]];
    }
    if (value1 !== value2) {
      return [...acc, [`+ ${key}: ${value2}`], [`- ${key}: ${value1}`]];
    }
    return [...acc, [`  ${key}: ${value1}`]];
  };
  return uniqKeys.reduce(buildResult, []);
};

const getDiff = (firstFile, secondFile) => {
  const data1 = getData(firstFile);
  const data2 = getData(secondFile);
  const differences = getResult(data1, data2).join('\n ');
  return `{\n ${differences}\n}`;
};

export default getDiff;
