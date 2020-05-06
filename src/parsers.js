import yaml from 'js-yaml';

const typeRender = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
};

export default (data, type) => typeRender[type](data);
