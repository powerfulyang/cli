import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { chalk } from 'zx';

export const WORK_DIR = dirname(resolve(fileURLToPath(import.meta.url), '..'));

export const ERROR_PREFIX = chalk.bgRgb(210, 0, 75).bold.rgb(0, 0, 0)(' Error ');
export const INFO_PREFIX = chalk.bgRgb(60, 190, 100).bold.rgb(0, 0, 0)(' Info ');
