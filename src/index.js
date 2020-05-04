import path from 'path';
import fs from 'fs';
import has from 'lodash/has';

const getData = (config) => {
  const filepath = path.resolve(process.cwd(), config);
  const data = fs.readFileSync(filepath, { encoding: 'utf8' });
  const parsed = JSON.parse(data);
  return parsed;
};

const searchDiff = (data1, data2) => {
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

const getDiff = (firstConfig, secondConfig) => {
  const data1 = getData(firstConfig);
  const data2 = getData(secondConfig);
  const differences = searchDiff(data1, data2).join('\n ');
  return differences;
};

export default getDiff;
