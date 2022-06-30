import type { Command } from 'commander';
import { spawnSync } from 'child_process';
import inquirer from 'inquirer';

export const nestProgram = (program: Command) => {
  program
    .command('nest-generate')
    .alias('g')
    .argument('[schematic]', 'Schematic to generate')
    .argument('[name]', 'Name of the component')
    .argument('[path]', 'Path to the component')
    .description('similar to nest.js cli generate commands')
    .action(async (schematic: string = '', name: string = '', path: string = '') => {
      let s: string = schematic;
      let n: string = name;
      let p: string = path;
      if (!schematic) {
        const res = await inquirer.prompt({
          type: 'list',
          name: 'schematic',
          message: 'Which schematic would you like to use?',
          pageSize: 20,
          choices: [
            'controller',
            'decorator',
            'filter',
            'guard',
            'interceptor',
            'interface',
            'middleware',
            'module',
            'pipe',
            'provider',
            'resolver',
            'service',
            'library',
            'resource',
          ],
        });
        s = res.schematic;
      }
      if (!n) {
        const res = await inquirer.prompt({
          type: 'input',
          name: 'name',
          message: 'What is the name of the component?',
        });
        n = res.name;
      }
      if (!p) {
        const res = await inquirer.prompt({
          type: 'input',
          name: 'path',
          message: 'What is the path of the component?',
        });
        p = res.path;
      }
      spawnSync(`nest generate ${s} ${n} ${p}`, { stdio: 'inherit', shell: true });
    });
};
