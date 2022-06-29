#!/usr/bin/env node
import { $, fs } from 'zx';
import { Command } from 'commander';
import { blue, green, yellow } from './utils/chalk.mjs';
import { CommandLoader } from './command/CommandLoader.mjs';

$.verbose = false;

const program = new Command();
const pkgStr = fs.readFileSync('./package.json', 'utf8');
const pkg = JSON.parse(pkgStr);

program
  .name('us4ever')
  .description(
    `CLI to
    ${blue('1. generate project linter config')}
    ${green('2. nest.js cli generate commands')}
        `,
  )
  .version(`us4ever@${yellow(pkg.version)}`, '-v, --version', 'Output the current version.')
  .usage(`${blue('<command>')} ${green('[options]')}`)
  .helpOption('-h, --help', 'Output usage information.');

CommandLoader.load(program);

program.parse();
