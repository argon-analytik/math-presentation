(function(){
  const deck = new Reveal({
    hash: true,
    slideNumber: true,
    plugins: [ RevealMarkdown, RevealHighlight, RevealMath.KaTeX ]
  })
  deck.initialize();

  // render math with KaTeX after markdown processing
  document.addEventListener('DOMContentLoaded', function(){
    renderMathInElement(document.body, {delimiters:[{left:'$$',right:'$$',display:true},{left:'$',right:'$',display:false}]});
  });

  // Desmos interactive graph
  deck.on('slidechanged', function(event){
    if(event.currentSlide && event.currentSlide.querySelector('#desmos-graph')){
      if(!window.Calculator){
        const script = document.createElement('script');
        script.src = 'https://www.desmos.com/api/v1.6/calculator.js?apiKey=demo';
        script.onload = createGraph;
        document.head.appendChild(script);
      } else {
        createGraph();
      }
    }
  });

  function createGraph(){
    const elt = document.getElementById('desmos-graph');
    if(!elt) return;
    if(elt.dataset.initialized) return;
    const calc = Desmos.GraphingCalculator(elt,{expressions:false});
    calc.setExpression({id:'line', latex:'y=-\frac{2}{3}x+373.15'});
    elt.dataset.initialized = true;
  }
})();
