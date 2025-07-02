document.addEventListener('DOMContentLoaded', () => {
  Reveal.on('ready', () => {
    const el = document.getElementById('desmos');
    if (el) {
      const calculator = Desmos.GraphingCalculator(el, { expressions: false });
      calculator.setExpression({ id: 'line', latex: 'y=-2/3 x + 373.15' });
    }
  });
});
