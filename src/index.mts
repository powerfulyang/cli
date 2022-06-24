#!/usr/bin/env node
import { $, fs } from 'zx';
import { Command } from 'commander';

$.verbose = false;
const program = new Command();
const pkgStr = fs.readFileSync('./package.json', 'utf8');
const pkg = JSON.parse(pkgStr);

program
  .name('us4ever')
  .description(
    `CLI to
  1. generate project linter config
  2. nest.js cli commands
  `,
  )
  .version(pkg.version);

program.parse();
