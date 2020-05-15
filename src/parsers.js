import yaml from 'js-yaml';
import ini from 'ini';

const typeParsers = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

export default (data, type) => typeParsers[type](data);
