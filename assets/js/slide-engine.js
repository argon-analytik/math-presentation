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
  const colorTag = /\((rot|blau|gruen|orange)\)(.*?)\(\1\)/gi;
  md.split(/^---$/m).forEach(chunk=>{
    const sec=document.createElement('section');
    sec.innerHTML = marked.parse(chunk.trim()).replace(colorTag,(m,c,t)=>`<span class="clr-${c}">${t}</span>`);
    sec.querySelectorAll('fragment').forEach(frag=>{
      const span=document.createElement('span');
      span.innerHTML=frag.innerHTML;
      span.classList.add('fragment','fade-in');
      frag.replaceWith(span);
    });
    sec.querySelectorAll('li').forEach(li=>li.classList.add('fragment','fade-in'));
    host.appendChild(sec);
  });

  /* Reveal erst starten, wenn Slides drin sind */
  Reveal.initialize({ hash:true, slideNumber:true, width:1280, height:720, margin:0.05, minScale:0.2, maxScale:1.5 });
  MathJax.typesetPromise();
});
