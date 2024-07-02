const etchBoard = document.querySelector('#etchBoard');
const etchContainer = document.querySelector('#etchContainer');
const resetBtn = document.querySelector('#resetBtn');

function createGrid(numberAcross) {
    for (i = 0; i < numberAcross * numberAcross; i++) {
        let pixelWidth = (100/numberAcross)-0.2;
        let pixelBlock = document.createElement('div');
        pixelBlock.classList.add('pixelBlock');
        pixelBlock.style.flexBasis = `${pixelWidth}%`;
        etchBoard.appendChild(pixelBlock);
    }

    const pixels = document.querySelectorAll('div.pixelBlock');
    pixels.forEach(pixel => {
        pixel.addEventListener('mouseover', () => {
            pixel.classList.add('hoveredPixel');
        })
        pixel.addEventListener('mousedown', event => {
            if (event.button == 1) {
                pixel.classList.remove('hoveredPixel');
            }
        })
    })
}

function createPopUp() {
    let popUp = document.createElement('div');
    popUp.classList.add('popUp');
    let title = document.createElement('h1');
    title.textContent = 'Choose the size of your grid';
    popUp.appendChild(title);
    let closeBtn = document.createElement('button');
    closeBtn.setAttribute('id', 'closeBtn');
    closeBtn.textContent = 'x';
    popUp.appendChild(closeBtn);
    let inputBox = document.createElement('input');
    inputBox.value = '25';
    popUp.appendChild(inputBox);
    let confirmBtn = document.createElement('button');
    confirmBtn.textContent = 'Create';
    popUp.appendChild(confirmBtn);
    
    etchContainer.appendChild(popUp);
    
    confirmBtn.addEventListener('click', () => {
        const input = inputBox.value;
    
        if (input > 0 && input <= 100) {
            etchBoard.innerHTML = "";
            
            createGrid(input);
            popUp.remove();
        } else {
            alert (`Please enter a number between 0 and 100`);
        }
    })
    
    closeBtn.addEventListener('click', () => {
        popUp.remove();
    })
}

resetBtn.addEventListener('click', () => {
    createPopUp();
})

createGrid(25);

// const eraserBtn = document.querySelector('eraser');
// eraserBtn.addEventListener('click', () => {
//     eraserBtn.style.backgroundColor = 'red';
//     return true;
// })
