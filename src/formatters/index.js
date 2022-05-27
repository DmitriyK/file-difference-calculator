import renderStylish from './renderStylish.js';
import renderPlain from './renderPlain.js';
import renderJson from './renderJson.js';

const formats = {
  stylish: renderStylish,
  plain: renderPlain,
  json: renderJson,
};

export default (obj, type) => formats[type](obj);
