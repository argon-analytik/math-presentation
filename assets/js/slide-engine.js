/* ---------- Upload-Handling ---------- */
const dz     = document.getElementById('dropZone');
const input  = document.getElementById('mdUpload');

/* Hover-Feedback */
['dragenter','dragover'].forEach(ev =>
  dz.addEventListener(ev, e => { e.preventDefault(); dz.classList.add('hover'); }));
['dragleave','drop'].forEach(ev =>
  dz.addEventListener(ev, e => { e.preventDefault(); dz.classList.remove('hover'); }));

dz.addEventListener('drop',   e => processFile(e.dataTransfer.files[0]));
input.addEventListener('change', e => processFile(e.target.files[0]));

/* Datei lesen & Slides bauen */
function processFile(file){
  if(!file || !file.name.endsWith('.md')) return alert('Bitte eine .md Datei wählen!');
  const reader = new FileReader();
  reader.onload = () => buildSlides(reader.result);
  reader.readAsText(file,'utf-8');
}

function buildSlides(md){
  const host = document.getElementById('slides');
  host.innerHTML = '';
  md.split(/^---$/m).forEach((chunk,i)=>{
    const sec = document.createElement('section');
    sec.className = 'slide';
    sec.id        = `slide${i+1}`;
    sec.innerHTML = marked.parse(chunk.trim());
    host.appendChild(sec);
  });
  document.dispatchEvent(new Event('slides-ready'));   // Trigger Navigation
}
