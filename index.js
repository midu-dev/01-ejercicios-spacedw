const fs = require('node:fs/promises')
const path = require('node:path')

const NO_FILE = 'ENOENT'
const LIST_ERRORS = {
  NO_PATH: 'No se ha especificado el path del archivo',
  NO_WORD: 'No se ha especificado la palabra a buscar',
}

// Ejercicio 2
async function writeFile(filePath, data, callback) {
  try {
    const dirPath = path.dirname(filePath)
    await fs.mkdir(dirPath, {recursive: true});
    await fs.writeFile(filePath, data);
    callback(null);
  } catch (err) {
    callback(err)
  }
}

// Ejercicio 3
async function readFileAndCount(word, callback) {
  const argv = process.argv[2];

  if (!argv) {
    const err = new Error(LIST_ERRORS.NO_PATH);
    return callback(err);
  }
  if (!word) {
    const err = new Error(LIST_ERRORS.NO_WORD);
    return callback(err);
  }

  try {
    await fs.access(argv);
    const data = await fs.readFile(argv, 'utf8');
    const searchWord = data.match(new RegExp(word, 'g')) ?? [];
    const count = searchWord.length;
    callback(null, count);
  } catch (err) {
    if (err.code === NO_FILE) {
      callback(null, 0); // El archivo no existe
    } else {
      callback(err);
    }
  }
}


module.exports = {
  writeFile,
  readFileAndCount
}
