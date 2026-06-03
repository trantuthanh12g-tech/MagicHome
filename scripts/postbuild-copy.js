#!/usr/bin/env node
import { copyFileSync, existsSync } from 'fs'
import { resolve } from 'path'

const cwd = process.cwd()
const distDir = resolve(cwd, 'dist')
const indexFile = resolve(distDir, 'index.html')
const fallbackFile = resolve(distDir, '404.html')

if (!existsSync(indexFile)) {
  console.error('Error: dist/index.html not found. Run `npm run build` first.')
  process.exit(1)
}

try {
  copyFileSync(indexFile, fallbackFile)
  console.log('Created SPA fallback:', fallbackFile)
} catch (err) {
  console.error('Failed to create 404.html fallback:', err)
  process.exit(1)
}
