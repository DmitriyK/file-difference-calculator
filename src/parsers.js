import yaml from 'js-yaml';
import ini from 'ini';

const typeRender = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

export default (data, type) => typeRender[type](data);
