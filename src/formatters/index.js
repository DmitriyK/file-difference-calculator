
import renderDefault from './renderDefault';
import renderPlain from './renderPlain';

const formats = {
  stylish: renderDefault,
  plain: renderPlain,
};

export default (obj, type) => formats[type](obj);
