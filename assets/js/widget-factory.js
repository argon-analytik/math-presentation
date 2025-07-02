document.addEventListener('slides-ready', ()=>{

  document.querySelectorAll('widget').forEach(tag=>{
    const t = tag.getAttribute('type');
    if(t==='slider') makeSlider(tag);
    if(t==='reveal') makeReveal(tag);
  });

  /* -------- Funktionen -------- */
  function makeSlider(el){
    const out = el.dataset.for;
    const range = Object.assign(document.createElement('input'),{
      type:'range', min:el.dataset.min||0, max:el.dataset.max||10, value:el.dataset.init||0
    });
      range.oninput = ()=>{ const x=+range.value;
        const target = document.getElementById(out) || (function(){
          const d=document.createElement('div');
          d.id=out;
          el.parentNode.insertBefore(d, el.nextSibling);
          return d;
        })();
        target.innerHTML = Function('x', 'return '+ el.dataset.fn)(x);
        MathJax.typesetPromise();
      };
    el.replaceWith(range);
  }

  function makeReveal(el){
    const btn=document.createElement('button');
    btn.textContent=el.dataset.label||'zeigen';
    btn.onclick=()=>document.getElementById(el.dataset.for).classList.toggle('visible');
    el.replaceWith(btn);
  }

});
