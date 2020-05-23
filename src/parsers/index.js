import yaml from 'js-yaml';
import ini from 'ini';
import addIniParser from './parserIni';

const typeParsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: ini.parse,
};

export default (data, type) => {
  if (type === 'ini') return addIniParser(typeParsers[type](data));
  return typeParsers[type](data);
};
