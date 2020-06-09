import isObject from 'lodash/isObject';

const tab = ' ';
const wrap = '\n';

const stringify = (item, depth) => {
  if (!isObject(item)) return `${item}`;
  const [key, value] = Object.entries(item).flat(Infinity);
  return `{${wrap}${tab.repeat(depth + 6)}${key}: ${value}${wrap}${tab.repeat(depth + 2)}}`;
};

const genOperation = (key, value, depth, sign) => `${tab.repeat(depth)}${sign} ${key}: ${stringify(value, depth)}`;

const stylish = (obj, depth = 0) => {
  const operation = {
    added: (key, values) => `${genOperation(key, values.value, depth, '+')}`,
    deleted: (key, values) => `${genOperation(key, values.value, depth, '-')}`,
    unchanged: (key, values) => `${genOperation(key, values.value, depth, ' ')}`,
    changed: (key, values) => `${genOperation(key, values.addedValue, depth, '+')}${wrap}${genOperation(key, values.deletedValue, depth, '-')}`,
    nested: (key, values) => `${tab.repeat(depth)}  ${key}: {${stylish(values.children, depth + 4).join('')}${wrap}${tab.repeat(depth + 2)}}`,
  };
  const func = (elem) => {
    const {
      type, key, children, value, addedValue, deletedValue,
    } = elem;
    return `${wrap}${operation[type](key, {
      value, addedValue, deletedValue, children,
    })}`;
  };
  return obj.map(func);
};
export default (diff) => `{${stylish(diff).join('')}${wrap}}`;
