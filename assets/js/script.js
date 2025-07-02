Reveal.on('ready', () => {
  const el = document.getElementById('desmos');
  if (el) {
    const calc = Desmos.GraphingCalculator(el,{expressions:false});
    /* Standardgerade – kann später überschrieben werden */
    calc.setExpression({id:'line',latex:'y=-2/3x+373.15'});
  }
});
