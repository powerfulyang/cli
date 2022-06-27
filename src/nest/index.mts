import type { Command } from 'commander';
import inquirer from 'inquirer';
import { yellow } from '../utils/chalk.mjs';

export const nestProgram = (program: Command) => {
  program
    .command('nest-generate')
    .alias('g')
    .argument('<schematic>', 'Schematic to generate')
    .argument('[name]', 'Name of the component')
    .argument('[path]', 'Path to the component')
    .description('similar to nest.js cli generate commands')
    .action(async (schematic, name, path) => {
      if (!schematic) {
        const res = await inquirer.prompt({
          type: 'list',
          name: 'command',
          message: 'select type to generate',
          choices: ['controller', 'service', 'model', 'entity', 'repository'],
        });
        console.log(`${yellow(res.command)} is not implemented yet!`);
      }
      console.log(`%s, %s`, name, path);
    });
};
