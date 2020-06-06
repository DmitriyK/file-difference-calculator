import isObject from 'lodash/isObject';

const stringify = (value) => {
  if (isObject(value)) {
    return '[complex value]';
  }
  return (typeof value === 'string') ? `'${value}'` : value;
};

const plain = (obj, path = '') => {
  const operation = {
    added: (key, type, values) => `Property '${key}' was ${type} with value: ${stringify(values.addedValue)}`,
    deleted: (key, type) => `Property '${key}' was ${type}`,
    changed: (key, type, values) => `Property '${key}' was ${type} from ${stringify(values.deletedValue)} to ${stringify(values.addedValue)}`,
    unchanged: () => [],
    nested: (key, type, values) => plain(values.children, `${key}.`),
  };
  const func = (elem) => {
    const {
      type, key, children, addedValue, deletedValue,
    } = elem;
    return operation[type](`${path}${key}`, type, { addedValue, deletedValue, children });
  };
  return obj.map(func);
};

export default (diff) => plain(diff).flat(Infinity).join('\n');
