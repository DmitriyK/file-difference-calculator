import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';

const tab = ' ';
const wrap = '\n';

const convert = (obj, depth) => {
  if (!(isObject(obj))) return obj;
  const func = (key) => `{${wrap}${tab.repeat(depth + 6)}${key}: ${obj[key]}${wrap}${tab.repeat(depth + 2)}}`;
  return Object.keys(obj).map(func);
};

const operation = {
  added: (key, value, depth) => `${tab.repeat(depth)}+ ${key}: ${convert(value, depth)}${wrap}`,
  removed: (key, removedValue, depth) => `${tab.repeat(depth)}- ${key}: ${convert(removedValue, depth)}${wrap}`,
  unchanged: (key, value, depth) => `${tab.repeat(depth)}  ${key}: ${convert(value, depth)}${wrap}`,
};

const getChildren = (obj, depth) => {
  const {
    type, key, value, removedValue,
  } = obj;
  if (type === 'changed') {
    return operation.added(key, value, depth) + operation.removed(key, removedValue, depth);
  }
  if (type === 'removed') {
    return operation.removed(key, removedValue, depth);
  }
  if (type === 'added') {
    return operation.added(key, value, depth);
  }
  return operation.unchanged(key, value, depth);
};

const stylish = (obj, depth = 2) => {
  const func = (total, elem) => {
    const { key, value } = elem;
    if (isArray(value)) {
      return `${total}${tab.repeat(depth + 1)} ${key}: {${wrap}${stylish(value, depth + 4)}${tab.repeat(depth + 2)}}${wrap}`;
    }
    return total + getChildren(elem, depth);
  };
  return obj.reduce(func, '');
};
export default (diff) => `{\n${stylish(diff)}}`;
