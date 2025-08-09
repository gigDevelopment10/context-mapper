// utils/commentExtractor.js
function extractCommentsFromCode(code) {
  const commentRegex = /\/\/(.*)$|\/\*([\s\S]*?)\*\//gm;
  let matches;
  const comments = [];

  while ((matches = commentRegex.exec(code)) !== null) {
    const singleLine = matches[1] ? matches[1].trim() : null;
    const multiLine = matches[2] ? matches[2].trim() : null;
    comments.push(singleLine || multiLine);
  }

  return comments;
}

module.exports = extractCommentsFromCode;
