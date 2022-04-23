import { join } from 'path';
import fs from 'fs';
import { chalk } from 'zx';
// eslint-disable-next-line import/no-unresolved
import { WORK_DIR } from '../index.mjs';

export const linterInit = () => {
  const { yellow } = chalk;

  const dir = process.cwd();
  const pkgPath = join(dir, 'package.json');
  const isExist = fs.existsSync(pkgPath);
  if (!isExist) {
    console.error(yellow('package.json not found!'));
    process.exit(1);
  }

  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));

  const isEsModule = pkg.type === 'module';

  const templateDir = join(WORK_DIR, 'template');

  const getTemplateFilePath = (name: string) => join(templateDir, name);

  /**
   * eslint
   */
  const eslintrcFileName = isEsModule ? '.eslintrc.cjs' : '.eslintrc.js';
  const eslintrcPath = join(dir, eslintrcFileName);
  if (!fs.existsSync(eslintrcPath)) {
    const data = fs.readFileSync(getTemplateFilePath('.eslintrc.js.template'));
    fs.writeFileSync(eslintrcPath, data);
  } else {
    console.log(yellow(`${eslintrcFileName} already exists!`));
  }

  const prettierrcFileName = isEsModule ? '.prettierrc.cjs' : '.prettierrc.js';
  const prettierrcPath = join(dir, prettierrcFileName);
  if (!fs.existsSync(prettierrcPath)) {
    const data = fs.readFileSync(getTemplateFilePath('.prettierrc.js.template'));
    fs.writeFileSync(prettierrcPath, data);
  } else {
    console.log(yellow(`${prettierrcFileName} already exists!`));
  }

  const stylelintrcFileName = isEsModule ? '.stylelintrc.cjs' : '.stylelintrc.js';
  const stylelintrcPath = join(dir, stylelintrcFileName);
  if (!fs.existsSync(stylelintrcPath)) {
    const data = fs.readFileSync(getTemplateFilePath('.stylelintrc.js.template'));
    fs.writeFileSync(stylelintrcPath, data);
  } else {
    console.log(yellow(`${stylelintrcFileName} already exists!`));
  }

  const commitlintrcFileName = isEsModule ? '.commitlintrc.cjs' : '.commitlintrc.js';
  const commitlintrcPath = join(dir, commitlintrcFileName);
  if (!fs.existsSync(commitlintrcPath)) {
    const data = fs.readFileSync(getTemplateFilePath('.commitlintrc.js.template'));
    fs.writeFileSync(commitlintrcPath, data);
  } else {
    console.log(yellow(`${commitlintrcFileName} already exists!`));
  }

  const editorconfigPath = join(dir, '.editorconfig');
  if (!fs.existsSync(editorconfigPath)) {
    const data = fs.readFileSync(getTemplateFilePath('.editorconfig.template'));
    fs.writeFileSync(editorconfigPath, data);
  } else {
    console.log(yellow('.editorconfig already exists!'));
  }

  const gitattributesPath = join(dir, '.gitattributes');
  if (!fs.existsSync(gitattributesPath)) {
    const data = fs.readFileSync(getTemplateFilePath('.gitattributes.template'));
    fs.writeFileSync(gitattributesPath, data);
  } else {
    console.log(yellow('.gitattributes already exists!'));
  }

  const lintstagedrcPath = join(dir, '.lintstagedrc');
  if (!fs.existsSync(lintstagedrcPath)) {
    const data = fs.readFileSync(getTemplateFilePath('.lintstagedrc.template'));
    fs.writeFileSync(lintstagedrcPath, data);
  } else {
    console.log(yellow('.lintstagedrc already exists!'));
  }

  const renovateJsonPath = join(dir, 'renovate.json');
  if (!fs.existsSync(renovateJsonPath)) {
    const data = fs.readFileSync(getTemplateFilePath('renovate.json.template'));
    fs.writeFileSync(renovateJsonPath, data);
  } else {
    console.log(yellow('renovate.json already exists!'));
  }
};
