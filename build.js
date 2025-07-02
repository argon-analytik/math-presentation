const fs = require('fs-extra');
const path = require('path');
const md = require('markdown-it')({html: true})
  .use(require('markdown-it-katex'));
const cheerio = require('cheerio');

const src = path.join(__dirname, 'slides', 'slides.md');
const outDir = path.join(__dirname, 'dist');

async function build() {
  await fs.ensureDir(outDir);
  const raw = await fs.readFile(src, 'utf8');
  const slides = raw.split(/\n---\n/);
  const sections = slides.map(slide => {
    let html = md.render(slide);
    const $ = cheerio.load(html);
    $('[class*=katex]').closest('p, li').addClass('fragment');
    return `<section>${$('body').html()}</section>`;
  }).join('\n');

  const revealPath = path.join(__dirname, 'node_modules', 'reveal.js', 'dist');
  const katexCss = path.join(__dirname, 'node_modules', 'katex', 'dist', 'katex.min.css');
  await fs.copy(revealPath, path.join(outDir, 'reveal'));
  await fs.copy(katexCss, path.join(outDir, 'katex.min.css'));

  const template = `<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <title>Math Presentation</title>
  <link rel="stylesheet" href="reveal/reveal.css">
  <link rel="stylesheet" href="reveal/theme/black.css">
  <link rel="stylesheet" href="katex.min.css">
  <style>
    .reveal { font-family: 'DejaVu Sans', sans-serif; color: #eee; }
  </style>
</head>
<body>
<div class="reveal">
<div class="slides">
${sections}
</div>
</div>
<script src="reveal/reveal.js"></script>
<script>
  Reveal.initialize({
    hash: true,
    slideNumber: true,
    transition: 'fade'
  });
</script>
</body>
</html>`;

  await fs.writeFile(path.join(outDir, 'index.html'), template);
}

build();
