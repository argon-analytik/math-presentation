document.addEventListener('slides-ready', () => {
// Initialize Desmos graph on load
window.addEventListener('load', () => {
  const el = document.getElementById('desmos');
  if (el) {
    const calculator = Desmos.GraphingCalculator(el, { expressions: false });
    calculator.setExpression({ id: 'line', latex: 'y=-2/3 x + 373.15' });
  }
});
});
