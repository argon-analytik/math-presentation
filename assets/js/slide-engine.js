window.addEventListener('DOMContentLoaded', () => {
  const md = sessionStorage.getItem('mdSource');
  if(!md){ alert('Kein Markdown im Speicher – bitte zuerst Datei hochladen.'); return; }

  const host = document.querySelector('.reveal .slides');
  md.split(/^---$/m).forEach(chunk=>{
    const sec=document.createElement('section');
    sec.innerHTML = marked.parse(chunk.trim());
    host.appendChild(sec);
  });

  /* Widgets initialisieren */
  document.dispatchEvent(new Event('slides-ready'));

  /* Reveal erst starten, wenn Slides drin sind */
  Reveal.initialize({ hash:true, slideNumber:true, width:1280, height:720, margin:0.05 });
});
