import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

export const WORK_DIR = dirname(resolve(fileURLToPath(import.meta.url), '..'));
