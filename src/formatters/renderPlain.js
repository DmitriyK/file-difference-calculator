import has from 'lodash/has';
import isObject from 'lodash/isObject';


const stringify = (value) => {
  if (isObject(value)) {
    return '[complex value]';
  }
  return (typeof value === 'string') ? `'${value}'` : value;
};

const plain = (obj, path = '') => {
  const operation = {
    added: (key, type, values) => `Property '${key}' was ${type} with value: ${stringify(values[0])}`,
    deleted: (key, type) => `Property '${key}' was ${type}`,
    changed: (key, type, values) => `Property '${key}' was ${type} from ${stringify(values[1])} to ${stringify(values[0])}`,
    nested: (key, type, values) => plain(values[2], `${key}.`),
  };
  const func = (elem) => {
    const {
      type, key, children, value, deletedValue,
    } = elem;
    return (has(operation, type)) ? operation[type](`${path}${key}`, type, [value, deletedValue, children]) : [];
  };
  return obj.map(func);
};

export default (diff) => plain(diff).flat(Infinity).join('\n');
