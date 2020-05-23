import has from 'lodash/has';
import isObject from 'lodash/isObject';


const stringify = (value) => {
  if (isObject(value)) {
    return '[complex value]';
  }
  const quote = '\'';
  return (typeof value === 'string') ? `${quote}${value}${quote}` : value;
};

const operation = {
  added: (key, type, value) => `Property '${key}' was ${type} with value: ${stringify(value[0])}`,
  deleted: (key, type) => `Property '${key}' was ${type}`,
  changed: (key, type, values) => `Property '${key}' was ${type} from ${stringify(values[1])} to ${stringify(values[0])}`,
};

const plain = (obj, path = '') => {
  const func = (elem) => {
    const {
      type, key, children, value, deletedValue,
    } = elem;
    if (has(elem, 'children')) {
      return plain(children, `${path}${key}.`);
    }
    if (has(operation, type)) {
      return operation[type](`${path}${key}`, type, [value, deletedValue]);
    }
    return [];
  };
  return obj.map(func);
};

export default (diff) => plain(diff).flat(Infinity).join('\n');
