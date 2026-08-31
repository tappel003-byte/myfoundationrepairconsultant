#!/usr/bin/env node
/**
 * Fail build if internal links point to routes that don't exist.
 */
import fs from 'node:fs';
import path from 'node:path';

const root = path.join(process.cwd(), 'content/extracted');
const pagesDir = path.join(process.cwd(), 'src/pages');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'manifest.json'), 'utf-8'));
const htmlFiles = fs.readdirSync(root).filter((f) => f.endsWith('.html'));

// Every hand-built page under src/pages/*.astro is a real route (e.g. push-piers.astro
// -> /push-piers). Deriving this from disk means a newly added page is automatically
// valid, instead of needing its path hardcoded here too.
const staticPageRoutes = fs
  .readdirSync(pagesDir)
  .filter((f) => f.endsWith('.astro') && !f.startsWith('[') && f !== '404.astro')
  .map((f) => `/${f.replace(/\.astro$/, '')}`);

const validPaths = new Set([...staticPageRoutes, ...manifest.map((p) => p.url)]);

// Every file actually served is one that's both listed in manifest.json AND
// present on disk (see src/lib/pages.ts). A file that exists but isn't in the
// manifest has no route — it 404s even though nothing about it "looks" broken.
const manifestFiles = new Set(manifest.map((p) => p.file));
const orphanFiles = htmlFiles.filter((f) => f !== 'manifest.json' && !manifestFiles.has(f));

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

if (broken.length || artifacts.length || orphanFiles.length) {
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
  if (orphanFiles.length) {
    console.error('Content files with no manifest.json entry (unreachable — add them or delete the file):');
    for (const file of orphanFiles) {
      console.error(`  ${file}`);
    }
  }
  process.exit(1);
}

console.log(`Link check passed (${validPaths.size} routes, ${htmlFiles.length} files)`);
