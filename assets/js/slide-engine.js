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
  const clr=/\((rot|blau|gruen|orange)\)(.*?)\(\1\)/gi;
  md.split(/^---$/m).forEach(chunk=>{
    const sec=document.createElement('section');
    /* 1) Markdown → HTML */
    let html = marked.parse(chunk.trim());
    /* 2) Farbtags */
    html = html.replace(clr,(m,c,t)=>`<span class="clr-${c}">${t}</span>`);
    sec.innerHTML = html;
    /* 3) Listen fragmentieren */
    sec.querySelectorAll('li').forEach(li=>li.classList.add('fragment','fade-in'));
    /* 4) Display‑Formeln als Fragment (jede neue Zeile) */
    sec.querySelectorAll('p').forEach(p=>{
      if(p.textContent.trim().startsWith('[')) p.classList.add('fragment','fade-in');
    });
    host.appendChild(sec);
  });

  /* Reveal erst starten, wenn Slides drin sind */
  Reveal.initialize({ hash:true, slideNumber:true,
    width:1280, height:720, margin:0.05,
    minScale:0.3, maxScale:1.2
  });
  MathJax.typesetPromise().then(()=>Reveal.layout());
  /* Jede Folie neu setzen */
  Reveal.on('slidechanged',()=>MathJax.typesetPromise());

  function initDesmos(){
    const el=document.getElementById('desmos');
    if(el){
      const calc=Desmos.GraphingCalculator(el,{expressions:false});
      calc.setExpression({id:'line',latex:'y=-2/3x+373.15'});
    }
  }

  if(Reveal.isReady()) initDesmos();
  else Reveal.on('ready', initDesmos);
});
