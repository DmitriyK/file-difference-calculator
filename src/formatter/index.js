
import renderDefault from './renderDefault';

const formats = {
  stylish: renderDefault,
};

export default (obj, type) => formats[type](obj);
