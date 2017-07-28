import fs from 'fs-extra';
import path from 'path';
import transforms from './transforms';
import source from './src';

const DIST_DIR = 'dist';
const FILENAMES = {
  communes: 'communes.json',
  districts: 'districts.json',
  provinces: 'provinces.json',
  provincialCircumscriptions: 'provincial-circumscriptions.json',
  regions: 'regions.json',
  senatorialCircumscriptions: 'senatorial-circumscriptions.json',
};

const JSON_SPACES = 2;

const distDirectory = (transformKey, filename = '') =>
  path.join(__dirname, `${DIST_DIR}`, transformKey, filename);

const writeCallback = item => err => {
  if (err) {
    throw err;
  }
  console.log(`${item} successfully transformed ✔︎`);
};

for (const key in transforms) {
  let result = transforms[key].transform(source);

  fs.remove(distDirectory(key)).then(() => {
    for (const resultKey in result) {
      fs.outputJson(
        distDirectory(key, FILENAMES[resultKey]),
        result[resultKey],
        {
          spaces: JSON_SPACES,
        },
        writeCallback(`${key}.${resultKey}`)
      );
    }
  });
}
