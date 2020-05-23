import isObject from 'lodash/isObject';

const additionalProcessing = (obj) => {
  const keys = Object.keys(obj);
  const func = (total, key) => {
    const value = obj[key];
    if (isObject(value)) {
      return { ...total, [key]: additionalProcessing(value) };
    }
    return (parseInt(value, 10)) ? { ...total, [key]: Number(value) } : { ...total, [key]: value };
  };
  return keys.reduce(func, {});
};
export default (data) => additionalProcessing(data);
