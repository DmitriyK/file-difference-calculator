
import renderStylish from './renderStylish';
import renderPlain from './renderPlain';
import renderJson from './renderJson';

const formats = {
  stylish: renderStylish,
  plain: renderPlain,
  json: renderJson,
};

export default (obj, type) => formats[type](obj);
