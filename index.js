const fs = require('node:fs')
const path = require('node:path')

const LIST_ERRORS = {
  NO_PATH: 'No se ha especificado el path del archivo',
  NO_WORD: 'No se ha especificado la palabra a buscar'
}
// Ejercicio 2
async function writeFile (filePath, data, callback) {
  const dirPath = path.dirname(filePath);
  fs.mkdirSync(dirPath, { recursive: true });
  fs.writeFile(filePath, data, callback);
}

// Ejercicio 3
async function readFileAndCount(word, callback) {
  const argv = process.argv[2];

  if (!argv) {
    callback(new Error(LIST_ERRORS.NO_PATH));
  } else if (!word) {
    callback(new Error(LIST_ERRORS.NO_WORD));
  } else {
    const existFilePath = await fs.existsSync(argv);

    if (!existFilePath) {
      callback(null, 0);
    } else {
      fs.readFile(argv, 'utf8', (err, data) => {
        if (err) {
          callback(err);
        } else {
          // const count = data.split(word).length - 1;
          const count = (data.match(new RegExp(word, 'g')) ?? []).length;
          callback(null, count);
        }
      });
    }
  }
}

module.exports = {
  writeFile,
  readFileAndCount
}
