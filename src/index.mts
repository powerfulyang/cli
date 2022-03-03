#!/usr/bin/env node
import { chalk, $ } from 'zx';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { linterInit } from './linter/index.mjs';

$.verbose = false;

const args = process.argv;
const [, , command] = args;

export const WORK_DIR = dirname(resolve(fileURLToPath(import.meta.url), '..'));

const { green, red, yellow } = chalk;

const showHelp = () => {
  console.log(`
  Usage: @powerfulyang/cli ${green('<command>')} [options]

  Commands:
    ${green('-v, --version')}  Show the version number.
    ${green('-h, --help')}     Show help.
    ${green('linter-init')}    Init project linter.

  Example usage:
    ${red('@powerfulyang/cli')} ${green('linter-init')}     # 初始化项目 linter
  `);
};

const showVersion = () => {
  const pkg = readFileSync(resolve(WORK_DIR, 'package.json'), 'utf-8');
  const { version } = JSON.parse(pkg);
  console.log(yellow(version));
};

const name = await $`cat package.json | grep "name"`;
console.log(red(`running in package ${name}`));

switch (command) {
  case '-h': {
    showHelp();
    break;
  }
  case '--help': {
    showHelp();
    break;
  }
  case '-v': {
    showVersion();
    break;
  }
  case '--version': {
    showVersion();
    break;
  }
  case 'linter-init': {
    linterInit();
    break;
  }
  default: {
    showHelp();
    process.exit(1);
  }
}
