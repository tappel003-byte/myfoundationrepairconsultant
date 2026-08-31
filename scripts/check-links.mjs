#!/usr/bin/env node
/**
 * Fail build if internal links point to routes that don't exist.
 */
import fs from 'node:fs';
import path from 'node:path';

const root = path.join(process.cwd(), 'content/extracted');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'manifest.json'), 'utf-8'));
const htmlFiles = fs.readdirSync(root).filter((f) => f.endsWith('.html'));

const validPaths = new Set([
  '/start-here',
  '/how-the-industry-has-changed',
  '/educational-articles',
  '/industry-articles',
  '/all-articles',
  ...manifest.map((p) => p.url),
  ...htmlFiles.map((f) => `/all-articles/${f.replace(/\.html$/, '')}`),
]);

// Domains that only ever show up in content by accident — leftover from drafting
// the article in an AI chat and pasting its in-chat anchor links as if they were
// real site URLs. A real link would never legitimately point here.
const AUTHORING_ARTIFACT_DOMAINS = ['claude.ai', 'chatgpt.com', 'chat.openai.com'];

const broken = [];
const artifacts = [];

for (const file of htmlFiles) {
  const html = fs.readFileSync(path.join(root, file), 'utf-8');
  const allHrefs = [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);

  for (const href of allHrefs) {
    if (AUTHORING_ARTIFACT_DOMAINS.some((domain) => href.includes(domain))) {
      artifacts.push({ file, href });
    }
  }

  const internalLinks = allHrefs.filter((href) => href.startsWith('/'));
  for (const link of internalLinks.map((href) => href.split(/[#?]/)[0])) {
    if (!validPaths.has(link)) {
      broken.push({ file, link });
    }
  }
}

if (broken.length || artifacts.length) {
  if (broken.length) {
    console.error('Broken internal links found:');
    for (const { file, link } of broken) {
      console.error(`  ${file}: ${link}`);
    }
  }
  if (artifacts.length) {
    console.error('Leftover AI-chat links found (should be real site paths):');
    for (const { file, href } of artifacts) {
      console.error(`  ${file}: ${href}`);
    }
  }
  process.exit(1);
}

console.log(`Link check passed (${validPaths.size} routes, ${htmlFiles.length} files)`);
