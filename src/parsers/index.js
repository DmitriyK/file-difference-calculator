import yaml from 'js-yaml';
import iniParser from './parserIni.js';

const typeParsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: iniParser,
};

export default (data, type) => typeParsers[type](data);
