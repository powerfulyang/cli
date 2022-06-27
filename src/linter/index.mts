import { join } from 'path';
import fs from 'fs';
import inquirer from 'inquirer';
import { getEnumKeys } from '@powerfulyang/utils';
import type { Command } from 'commander';
import { red, yellow } from '../utils/chalk.mjs';
import { WORK_DIR } from '../constant.mjs';

export enum LinterType {
  ALL = 'all',
  ESLINT = 'eslint',
  PRETTIER = 'prettier',
  STYLELINT = 'stylelint',
  COMMITLINT = 'commitlint',
  'LINT-STAGED' = 'lint-staged',
  EDITORCONFIG = 'editorconfig',
  GITATTRIBUTES = 'gitattributes',
  GITIGNORE = 'gitignore',
  RENOVATE = 'renovate',
}

export enum LinterFilename {
  ESLINT = '.eslintrc.cjs',
  PRETTIER = '.prettierrc.cjs',
  STYLELINT = '.stylelintrc.cjs',
  COMMITLINT = '.commitlintrc.cjs',
  EDITORCONFIG = '.editorconfig',
  'LINT-STAGED' = '.lintstagedrc.cjs',
  GITATTRIBUTES = '.gitattributes',
  GITIGNORE = '.gitignore',
  RENOVATE = 'renovate.json',
}

const getFilename = (type: Uppercase<LinterType>) => {
  return LinterFilename[type as unknown as keyof typeof LinterFilename];
};

const getTemplateFilePath = (type: Uppercase<LinterType>) => {
  const filename = getFilename(type);
  const templateDir = join(WORK_DIR, 'template');
  return join(templateDir, filename);
};

export const generateLinterConfig = (type: LinterType, force: boolean = false): void => {
  const tmp = type.toUpperCase() as Uppercase<LinterType>;
  const targetFilename = getFilename(tmp);
  const dir = process.cwd();
  const targetPath = join(dir, targetFilename);
  if (!fs.existsSync(targetPath) || force) {
    const data = fs.readFileSync(getTemplateFilePath(tmp));
    fs.writeFileSync(targetPath, data);
    if (force) {
      console.log(`%s is force generated!`, yellow(targetFilename));
    }
  } else {
    console.log(yellow(`${targetFilename} already exists!`));
  }
};

export const linterInit = (type: LinterType, force: boolean = false) => {
  switch (type) {
    case LinterType.ESLINT:
      generateLinterConfig(LinterType.ESLINT, force);
      break;
    case LinterType.PRETTIER:
      generateLinterConfig(LinterType.PRETTIER, force);
      break;
    case LinterType.STYLELINT:
      generateLinterConfig(LinterType.STYLELINT, force);
      break;
    case LinterType.COMMITLINT:
      generateLinterConfig(LinterType.COMMITLINT, force);
      break;
    case LinterType.EDITORCONFIG:
      generateLinterConfig(LinterType.EDITORCONFIG, force);
      break;
    case LinterType['LINT-STAGED']:
      generateLinterConfig(LinterType['LINT-STAGED'], force);
      break;
    case LinterType.GITATTRIBUTES:
      generateLinterConfig(LinterType.GITATTRIBUTES, force);
      break;
    case LinterType.GITIGNORE:
      generateLinterConfig(LinterType.GITIGNORE, force);
      break;
    case LinterType.RENOVATE:
      generateLinterConfig(LinterType.RENOVATE, force);
      break;
    case LinterType.ALL:
      generateLinterConfig(LinterType.ESLINT, force);
      generateLinterConfig(LinterType.PRETTIER, force);
      generateLinterConfig(LinterType.STYLELINT, force);
      generateLinterConfig(LinterType.COMMITLINT, force);
      generateLinterConfig(LinterType.EDITORCONFIG, force);
      generateLinterConfig(LinterType['LINT-STAGED'], force);
      generateLinterConfig(LinterType.GITATTRIBUTES, force);
      generateLinterConfig(LinterType.GITIGNORE, force);
      generateLinterConfig(LinterType.RENOVATE, force);
      break;
    default:
      console.log(red(`${String(type)} is not supported!`));
  }
};

export const linterProgram = (program: Command) => {
  program
    .command('linter')
    .alias('l')
    .description(`init project linter config.`)
    .argument('[type]', 'init specify config, e.g. all, eslint, prettier etc.')
    .option('-f, --force', 'force init config')
    .action(async (type, options) => {
      if (type) {
        linterInit(type, options.force);
      } else {
        const res = await inquirer.prompt({
          type: 'list',
          name: 'type',
          pageSize: 10,
          message: 'init which config?',
          choices: getEnumKeys(LinterType).map((key) => key.toLowerCase()),
        });
        if (options.force) {
          linterInit(res.type, options.force);
        } else {
          const isForce = await inquirer.prompt({
            type: 'confirm',
            name: 'isForce',
            message: `force init ${yellow(res.type)} config?`,
          });
          linterInit(res.type, isForce.isForce);
        }
      }
    });
};
