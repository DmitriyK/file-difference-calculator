import isObject from 'lodash/isObject';
import has from 'lodash/has';

const tab = ' ';
const wrap = '\n';

const stringify = (item, depth) => {
  if (!isObject(item)) return `${item}`;
  const [key, value] = Object.entries(item).flat(Infinity);
  return `{${wrap}${tab.repeat(depth + 6)}${key}: ${value}${wrap}${tab.repeat(depth + 2)}}`;
};

const genOperation = (key, value, depth, sign) => `${tab.repeat(depth)}${sign} ${key}: ${stringify(value, depth)}`;

const operation = {
  added: (key, value, depth) => `${genOperation(key, value[0], depth, '+')}`,
  deleted: (key, value, depth) => `${genOperation(key, value[1], depth, '-')}`,
  unchanged: (key, value, depth) => `${genOperation(key, value[0], depth, ' ')}`,
  changed: (key, value, depth) => `${operation.added(key, value, depth)}\n${operation.deleted(key, value, depth)}`,
};

const stylish = (obj, depth = 0) => {
  const func = (elem) => {
    const {
      type, key, children, value, deletedValue,
    } = elem;
    if (has(elem, 'children')) {
      return `\n${tab.repeat(depth)}  ${key}: {${stylish(children, depth + 4).join('')}\n${tab.repeat(depth + 2)}}`;
    }
    return `\n${operation[type](key, [value, deletedValue], depth)}`;
  };
  return obj.map(func);
};
export default (diff) => `{${stylish(diff).join('')}\n}`;
