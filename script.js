const DEFAULT_COLOR = '#ff6347';
let currentColor = DEFAULT_COLOR;

addHeaderListeners();
createGrid(16);

function addHeaderListeners() {
    const resetButton = document.querySelector('#reset');
    resetButton.addEventListener('click', resetGrid);
    const colorDots = document.querySelectorAll('.dot');
    colorDots.forEach(colorDot => {
        colorDot.addEventListener('click', toggleColor);
    });
}

function createGrid(size) {
    const canvas = document.querySelector('div.canvas');
    removeGridBoxes(canvas);
    canvas.style.setProperty('grid-template-columns', `repeat(${size}, 1fr)`);
    canvas.style.setProperty('grid-template-rows', `repeat(${size}, 1fr)`);
    createGridBoxes(canvas, size);
}

function removeGridBoxes(canvas) {
    while (canvas.firstChild) {
        canvas.removeChild(canvas.firstChild);
    }
}

function createGridBoxes(canvas, size) {
    for (let i = 0; i < Math.pow(size, 2); i++) {
        let box = document.createElement('div');
        box.classList.add('box');
        box.addEventListener('mouseover', hoverTrail);
        box.addEventListener('touchmove', hoverTrail);
        canvas.appendChild(box);
    }
}

function toggleColor() {
    const currentSelection = document.querySelector('.selected');
    if (currentSelection === this) return;
    currentSelection.classList.toggle('selected');
    this.classList.toggle('selected');
    currentColor = window.getComputedStyle(this).getPropertyValue('background-color');
}

function hoverTrail(e) {
    this.style.backgroundColor = currentColor;
}

function resetGrid() {
    let size = askForInput();
    if (size === null) return;
    createGrid(size);
}

function askForInput() {
    let input = prompt('Enter grid size (whole number, max 100)', '16');
    if (input === null || isNaN(input)) return null;
    if (parseInt(input) > 100) {
        input = askForInput();
    }
    return parseInt(input);
}