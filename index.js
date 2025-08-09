// index.js
const fs = require('fs');
const getAllFiles = require('./utils/fileReader');
const extractCommentsFromCode = require('./utils/commentExtractor');

function createContextMap(rootDir) {
  const files = getAllFiles(rootDir);
  const contextMap = {};

  files.forEach(filePath => {
    try {
      const code = fs.readFileSync(filePath, 'utf-8');
      const comments = extractCommentsFromCode(code);
      if (comments.length > 0) {
        contextMap[filePath] = comments;
      }
    } catch (err) {
      console.error(`Error reading ${filePath}:`, err);
    }
  });

  return contextMap;
}

module.exports = { createContextMap };
