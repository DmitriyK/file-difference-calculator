// @ts-check
import commander from 'commander';
import genDiff from './index';

const program = () => {
  commander
    .version('0.0.1')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format <type>', 'output format [stylish]', 'stylish')
    .arguments('<filepath1> <filepath2>')
    .action((filepath1, filepath2) => {
      const result = genDiff(filepath1, filepath2, commander.format);
      console.log(result);
    });
  commander.parse(process.argv);
};

export default program;
