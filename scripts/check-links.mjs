#!/usr/bin/env node
/**
 * Fail build if internal links point to routes that don't exist.
 */
import fs from 'node:fs';
import path from 'node:path';

const root = path.join(process.cwd(), 'content/extracted');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'manifest.json'), 'utf-8'));

const validPaths = new Set([
  '/start-here',
  ...manifest.map((p) => p.url),
]);

const htmlFiles = fs.readdirSync(root).filter((f) => f.endsWith('.html'));
const broken = [];

for (const file of htmlFiles) {
  const html = fs.readFileSync(path.join(root, file), 'utf-8');
  const links = [...html.matchAll(/href="(\/[^"#?]+)"/g)].map((m) => m[1]);
  for (const link of links) {
    if (!validPaths.has(link) && !link.startsWith('/all-articles/')) {
      // allow any all-articles path if in manifest
    }
    if (!validPaths.has(link)) {
      broken.push({ file, link });
    }
  }
}

if (broken.length) {
  console.error('Broken internal links found:');
  for (const { file, link } of broken) {
    console.error(`  ${file}: ${link}`);
  }
  process.exit(1);
}

console.log(`Link check passed (${validPaths.size} routes, ${htmlFiles.length} files)`);
