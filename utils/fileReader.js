// utils/fileReader.js
const fs = require('fs');
const path = require('path');

const ignoreDirs = ['node_modules', '.git', 'yarn.lock', 'package-lock.json'];

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const filePath = path.join(dirPath, file);

    // Skip if the file path contains any ignored folder
    if (ignoreDirs.some(dir => filePath.includes(dir))) {
      return;
    }

    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, arrayOfFiles);
    } else {
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
}

module.exports = getAllFiles;
