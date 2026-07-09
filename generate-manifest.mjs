#!/usr/bin/env node
// Tự động quét thư mục fonts/ và sinh fonts.json.
// Chạy: node generate-manifest.mjs
import { readdirSync, writeFileSync, existsSync, readFileSync } from 'node:fs';

const FONT_DIR = 'fonts';
if (!existsSync(FONT_DIR)) { console.error('Không tìm thấy thư mục fonts/'); process.exit(1); }

// Giữ lại metadata cũ (cat/note/previewCss) nếu đã có.
const prev = existsSync('fonts.json') ? JSON.parse(readFileSync('fonts.json','utf8')) : [];
const prevByFile = Object.fromEntries(prev.map(f => [f.file, f]));

const files = readdirSync(FONT_DIR).filter(f => /\.(ttf|otf)$/i.test(f));
if (!files.length) {
  console.warn('Chưa có font .ttf/.otf trong fonts/ — giữ nguyên fonts.json hiện tại.');
  process.exit(0);
}
const manifest = files.map(file => {
  const old = prevByFile[file] || {};
  const name = old.name || file.replace(/\.(ttf|otf)$/i,'').replace(/[-_]/g,' ');
  return {
    name,
    cat: old.cat || 'roblox',
    file,
    previewCss: old.previewCss || "-apple-system,sans-serif",
    note: old.note || 'Custom font'
  };
});

writeFileSync('fonts.json', JSON.stringify(manifest, null, 2) + '\n');
console.log(`Đã sinh fonts.json với ${manifest.length} font.`);
