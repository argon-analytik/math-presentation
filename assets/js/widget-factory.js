document.addEventListener('slides-ready', () => {
  document.querySelectorAll('widget').forEach(node => {
    const type = node.getAttribute('type');
    ({ slider:makeSlider, reveal:makeReveal }[type]||(()=>{}))(node);
  });
});

function makeSlider(host){
  const tgtId = host.dataset.for;
  const inp   = Object.assign(document.createElement('input'),{
    type:'range',
    min :host.dataset.min||0,
    max :host.dataset.max||10,
    value:host.dataset.init||0
  });
  inp.oninput = () => {
    const x   = Number(inp.value);
    const res = Function('x', `return ${host.dataset.fn}`)(x);   // z. B. "`x*x`"
    document.getElementById(tgtId).innerHTML = res;
    MathJax.typesetPromise();
  };
  host.replaceWith(inp);
}

function makeReveal(host){
  const tgt = document.getElementById(host.dataset.for);
  const btn = document.createElement('button');
  btn.textContent = host.dataset.label||'Zeigen';
  btn.onclick = () => tgt.classList.toggle('visible');
  host.replaceWith(btn);
}
