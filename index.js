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
  if (!argv) return callback(new Error(LIST_ERRORS.NO_PATH)); // r: No se ha especificado el path del archivo
  if (!word) return callback(new Error(LIST_ERRORS.NO_WORD)); // r: No se ha especificado la palabra a buscar
  fs.exists(argv, (existFilePath) => {
    if (!existFilePath) return callback(null, 0); // r: El archivo no existe
    fs.readFile(argv, 'utf8', (err, data) => {
      if (err) return callback(err);
      const count = (data.match(new RegExp(word, 'g')) ?? []).length; // Otra forma de hacerlo: data.split(word).length - 1;
      callback(null, count);
    });
  });
}

module.exports = {
  writeFile,
  readFileAndCount
}
