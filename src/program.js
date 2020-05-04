import commander from 'commander';
import genDiff from './index';

const program = () => {
  commander
    .version('0.0.1')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format <type>', 'output format')
    .arguments('<firstConfig> <secondConfig>')
    .action((firstConfig, secondConfig) => {
      const result = genDiff(firstConfig, secondConfig);
      console.log(`{\n ${result} \n}`);
    });
  commander.parse(process.argv);
};

export default program;
