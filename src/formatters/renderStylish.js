import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';
import flatten from 'lodash/flatten';

const tab = ' ';
const wrap = '\n';

const convert = (item, depth) => {
  if (!isObject(item)) return item;
  const [key, value] = flatten(Object.entries(item));
  return `{${wrap}${tab.repeat(depth + 6)}${key}: ${value}${wrap}${tab.repeat(depth + 2)}}`;
};

const genOperation = (key, value, depth, sign) => `${tab.repeat(depth)}${sign} ${key}: ${convert(value, depth)}`;

const operation = {
  added: (key, value, depth) => genOperation(key, value[0], depth, '+'),
  deleted: (key, value, depth) => genOperation(key, value[1], depth, '-'),
  unchanged: (key, value, depth) => genOperation(key, value[0], depth, ' '),
  changed: (key, value, depth) => `${operation.added(key, value, depth)}\n${operation.deleted(key, value, depth)}`,
};

const stylish = (obj, depth = 0) => {
  const func = (total, elem) => {
    const {
      type, key, value, deletedValue,
    } = elem;
    if (isArray(value)) {
      return [...total, `\n${tab.repeat(depth)}  ${key}: {`, stylish(value, depth + 4), `\n${tab.repeat(depth + 2)}}`];
    }
    return [...total, `\n${operation[type](key, [value, deletedValue], depth)}`];
  };
  return obj.reduce(func, []);
};
export default (diff) => `{${flatten(stylish(diff)).join(' ')}\n}`;
