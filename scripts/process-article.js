const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

function processArticle(htmlContent, topic, articleName) {
  // Parse HTML
  const dom = new JSDOM(htmlContent);
  const document = dom.window.document;

  // Extract images
  const images = document.querySelectorAll('img');
  images.forEach((img, index) => {
    const src = img.getAttribute('src');
    const ext = path.extname(src);
    const newFileName = `image${index + 1}${ext}`;
    const newPath = `/images/${topic}/${articleName}/${newFileName}`;
    
    // Update image src in HTML without copying
    img.setAttribute('src', newPath);
    
    console.log(`Image path updated: ${newPath}`);
  });

  // Generate React component
  const componentContent = `
import React from 'react';
import Image from 'next/image';
import { playfair } from '../../../fonts';

const ${articleName.replace(/-/g, '')}Article: React.FC = () => {
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      ${dom.window.document.body.innerHTML}
    </article>
  );
};

export default ${articleName.replace(/-/g, '')}Article;
  `;

  // Write React component to file
  const componentPath = path.join(process.cwd(), 'app', 'articles', topic, `${articleName}.tsx`);
  fs.writeFileSync(componentPath, componentContent);

  console.log(`Article processed and saved to ${componentPath}`);
}

// Usage
const args = process.argv.slice(2);
if (args.length < 3) {
  console.log('Usage: node process-article.js <path-to-html-file> <topic> <article-name>');
  process.exit(1);
}

const [htmlFilePath, topic, articleName] = args;

try {
  const htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');
  processArticle(htmlContent, topic, articleName);
} catch (error) {
  console.error(`Error processing file: ${error.message}`);
  process.exit(1);
}