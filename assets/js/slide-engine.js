window.addEventListener('DOMContentLoaded', () => {
  let md = sessionStorage.getItem('mdSource');
  if(!md){
    alert('Kein Markdown im Speicher – bitte zuerst Datei hochladen.');
    return;
  }

  /* Meta-Block am Anfang entfernen */
  const meta=/^<!--\s*meta\s*-->[\s\S]*?\n---\s*$/m;
  if(meta.test(md)) md=md.replace(meta,'');

  const host = document.querySelector('.reveal .slides');
  md.split(/^---$/m).forEach(chunk=>{
    const sec=document.createElement('section');
    sec.innerHTML = marked.parse(chunk.trim());
    sec.querySelectorAll('fragment').forEach(frag=>{
      const span=document.createElement('span');
      span.innerHTML=frag.innerHTML;
      span.classList.add('fragment','fade-in');
      frag.replaceWith(span);
    });
    sec.querySelectorAll('li').forEach(li=>li.classList.add('fragment','fade-in'));
    host.appendChild(sec);
  });

  /* Widgets initialisieren */
  document.dispatchEvent(new Event('slides-ready'));

  /* Reveal erst starten, wenn Slides drin sind */
  Reveal.initialize({ hash:true, slideNumber:true, width:1280, height:720, margin:0.05, minScale:0.2, maxScale:1.5 });
});
