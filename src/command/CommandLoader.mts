import type { Command } from 'commander';
import { chalk } from 'zx';
import { ERROR_PREFIX } from '../constant.mjs';
import { linterProgram } from '../linter/index.mjs';
import { nestProgram } from '../nest/index.mjs';

export class CommandLoader {
  public static load(program: Command): void {
    linterProgram(program);
    nestProgram(program);
    this.handleInvalidCommand(program);
  }

  private static handleInvalidCommand(program: Command) {
    program.on('command:*', () => {
      console.error(
        `\n${ERROR_PREFIX} Invalid command: ${chalk.red('%s')}`,
        program.args.join(' '),
      );
      console.log(`See ${chalk.red('--help')} for a list of available commands.\n`);
      process.exit(1);
    });
  }
}
