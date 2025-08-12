# context-mapper

Context-Mapper generate a rich context map of your repository for AI agents
This tool analyzes your codebase and produces a structured context map — a representation of files, relationships, and key content. AI agents can use this map to:

- Understand your project’s structure without scanning the entire repo every time.

- Answer questions about specific files, modules, or dependencies.

- Write code with context-awareness, referencing the right parts of your codebase.

- Summarize and navigate your repository efficiently.

**! Work In Progress**

Npm package Link : https://www.npmjs.com/package/context-mapper

<img width="800" height="600" alt="image" src="https://github.com/user-attachments/assets/82fbddd1-720e-404d-bdc5-b75430568759" />


```
const fs = require('fs');
const path = require('path');
const d3 = require('d3');
const { createContextTree } = require('context-mapper');

const width = 800;
const height = 600;

const rootDir = path.resolve(__dirname, '');
const data = createContextTree(rootDir);

// Build hierarchy & circle packing layout
const root = d3.hierarchy(data)
  .sum(d => d.size || 1) // size controls circle radius
  .sort((a, b) => b.value - a.value);

d3.pack()
  .size([width, height])
  .padding(5)(root);

// Start SVG
let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" style="background:white">`;

// Draw edges from parent to children
root.descendants().forEach(d => {
  if (d.parent) {
    svg += `<line x1="${d.x}" y1="${d.y}" x2="${d.parent.x}" y2="${d.parent.y}" stroke="#ccc"/>`;
  }
});

// Draw circles for each node
root.descendants().forEach(d => {
  const color = d.children ? "#69b3a2" : "#ffb347"; // different color for folders/files
  svg += `<circle cx="${d.x}" cy="${d.y}" r="${d.r}" fill="${color}" stroke="black"/>`;

  // Label only if big enough
  if (d.r > 10) {
    svg += `<text x="${d.x}" y="${d.y}" font-size="8" text-anchor="middle" dominant-baseline="middle" fill="black">${d.data.name}</text>`;
  }
});

svg += '</svg>';

// Save SVG file
fs.writeFileSync('circle-map.svg', svg);
console.log('Circle map saved to circle-map.svg');

```



