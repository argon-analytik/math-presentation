const drop = document.getElementById('dropZone');
const fileInput = document.getElementById('mdUpload');

/* Hover‑Effekte */
['dragenter','dragover'].forEach(ev=>drop.addEventListener(ev,e=>{e.preventDefault();drop.classList.add('hover');}));
['dragleave','drop'].forEach(ev=>drop.addEventListener(ev,e=>{e.preventDefault();drop.classList.remove('hover');}));

/* Datei empfangen */
drop.addEventListener('drop',   e=>handle(e.dataTransfer.files[0]));
fileInput.addEventListener('change',e=>handle(e.target.files[0]));

function handle(file){
  if(!file || !file.name.endsWith('.md')) return alert('Bitte eine .md‑Datei wählen!');
  const r=new FileReader();
  r.onload=()=>{ sessionStorage.setItem('mdSource', r.result); location.href='viewer.html'; };
  r.readAsText(file,'utf-8');
}
