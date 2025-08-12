// index.js
const fs = require('fs');
const path = require('path');
const getAllFiles = require('./utils/fileReader');
const extractCommentsFromCode = require('./utils/commentExtractor');

function createContextTree(rootDir) {
  const files = getAllFiles(rootDir);
  const tree = { name: path.basename(rootDir), type: 'folder', children: [] };

  files.forEach(filePath => {
    try {
      const code = fs.readFileSync(filePath, 'utf-8');
      const comments = extractCommentsFromCode(code);
      const { size }  = fs.statSync(filePath).size;

      const relativePath = path.relative(rootDir, filePath);
      const parts = relativePath.split(path.sep);

      let current = tree;
      parts.forEach((part, i) => {
        const isFile = i === parts.length - 1;
        let child = current.children.find(c => c.name === part);

        if (!child) {
          child = isFile
            ? { name: part, type: 'file', size, comments }
            : { name: part, type: 'folder', children: [] };
          current.children.push(child);
        }
        current = child;
      });

    } catch (err) {
      console.error(`Error reading ${filePath}:`, err);
    }
  });

  return tree;
}

module.exports = { createContextTree };
