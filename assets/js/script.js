let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const showSlide = (index) => {
    if (index < 0 || index >= slides.length) return;
    slides[currentSlide].classList.remove('active');
    currentSlide = index;
    slides[currentSlide].classList.add('active');
    resetFragments(slides[currentSlide]);
};
const resetFragments = (slide) => {
    slide.querySelectorAll('.fragment').forEach(f => f.classList.remove('visible'));
    fragmentIndex = 0;
};
let fragmentIndex = 0;
const nextFragmentOrSlide = () => {
    const fragments = slides[currentSlide].querySelectorAll('.fragment');
    if (fragmentIndex < fragments.length) {
        fragments[fragmentIndex].classList.add('visible');
        fragmentIndex++;
    } else {
        showSlide(currentSlide + 1);
    }
};
const prevSlide = () => {
    showSlide(currentSlide - 1);
};
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
        nextFragmentOrSlide();
    } else if (e.key === 'ArrowLeft') {
        prevSlide();
    }
});
document.addEventListener('click', nextFragmentOrSlide);
showSlide(0);

// Desmos graph
window.addEventListener('load', () => {
    const el = document.getElementById('desmos');
    if (el) {
        const calculator = Desmos.GraphingCalculator(el, {expressions: false});
        calculator.setExpression({id:'line', latex:'y=-2/3 x + 373.15'});
    }
});
