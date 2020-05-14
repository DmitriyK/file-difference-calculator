import isArray from 'lodash/isArray';
import has from 'lodash/has';
import isObject from 'lodash/isObject';
import flatten from 'lodash/flatten';

const convert = (value) => {
  if (isObject(value)) {
    return '[complex value]';
  }
  const quote = '\'';
  return (typeof value === 'string') ? `${quote}${value}${quote}` : value;
};

const operation = {
  added: (key, type, value) => `Property '${key}' was ${type} with value: ${convert(value[0])}`,
  deleted: (key, type) => `Property '${key}' was ${type}`,
  changed: (key, type, values) => `Property '${key}' was ${type} from ${convert(values[1])} to ${convert(values[0])}`,
};

const plain = (obj, header = '') => {
  const func = (total, elem) => {
    const {
      type, key, value, deletedValue,
    } = elem;
    if (isArray(value)) {
      return [...total, plain(value, `${header}${key}.`)];
    }
    if (has(operation, type)) {
      return [...total, operation[type](`${header}${key}`, type, [value, deletedValue])];
    }
    return total;
  };
  return obj.reduce(func, []);
};

export default (diff) => flatten(plain(diff)).join('\n');
