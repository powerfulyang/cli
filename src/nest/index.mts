import type { Command } from 'commander';
import inquirer from 'inquirer';
import { yellow } from '../utils/chalk.mjs';

export const nestProgram = (program: Command) => {
  program
    .command('nest')
    .description('familiar to nest.js cli generate commands')
    .action(async () => {
      const res = await inquirer.prompt({
        type: 'list',
        name: 'command',
        message: 'select type to generate',
        choices: ['controller', 'service', 'model', 'entity', 'repository'],
      });
      console.log(`${yellow(res.command)} is not implemented yet!`);
    });
};
