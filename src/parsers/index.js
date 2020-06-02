import yaml from 'js-yaml';
import iniParser from './parserIni';

const typeParsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: iniParser,
};

export default (data, type) => typeParsers[type](data);
