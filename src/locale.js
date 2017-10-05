import fs from 'fs';
import path from 'path';

const dirname = path.join(process.cwd(), 'config/locales');

export function locales(lang = 'en') {
  if (lang.length > 2) lang = 'en';

  let locales = [];

  fs.readdirSync(dirname).forEach(filename => {
    locales[filename.split('.')[0]] = require(dirname + '/' + filename);
  });

  return locales[lang];
}
