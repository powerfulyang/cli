#!/usr/bin/env node
import { $, chalk } from 'zx';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { linterInit } from './linter/index.mjs';
import { WORK_DIR } from './constant.mjs';

$.verbose = false;

const args = process.argv;
const [, , command] = args;

const { green, red, yellow } = chalk;

const showHelp = () => {
  console.log(`
  Usage: pyc ${green('<command>')} [options]

  Commands:
    ${green('-v, --version')}  Show the version number.
    ${green('-h, --help')}     Show help.
    ${green('linter-init')}    Init project linter.

  Example usage:
    ${red('pyc')} ${green('linter-init')}     # 初始化项目 linter
  `);
};

const showVersion = () => {
  const pkg = readFileSync(resolve(WORK_DIR, 'package.json'), 'utf-8');
  const { version } = JSON.parse(pkg);
  console.log(yellow(version));
};

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
