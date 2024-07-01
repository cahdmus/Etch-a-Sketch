const etchboard = document.querySelector('#etchboard');
const body = document.querySelector('body');
const changeBtn = document.querySelector('#sizeBtn');

function createGrid(numberAcross) {
    for (row = 0; row < numberAcross; row++) {
        let rowBlock = document.createElement('div');
        rowBlock.classList.add('row');
        etchboard.appendChild(rowBlock);

        for (col = 0; col < numberAcross; col++) {
            let pixelBlock = document.createElement('div');
            pixelBlock.classList.add('pixelBlock');
            rowBlock.appendChild(pixelBlock);
        }
    }

    const pixels = document.querySelectorAll('div.pixelBlock');
    pixels.forEach(pixel => {
        pixel.addEventListener('mouseover', () => {
            pixel.classList.add('hoveredPixel');
        })
    })
}

changeBtn.addEventListener('click', () => {
    let popUp = document.createElement('div');
    popUp.classList.add('popUp');
    let title = document.createElement('h1');
    title.textContent = 'Choose the size of the grid';
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

    body.appendChild(popUp);

    confirmBtn.addEventListener('click', () => {
        const input = inputBox.value;

        if (input > 0 && input <= 100) {
            etchboard.innerHTML = "";
            createGrid(input);
            popUp.remove();
        } else {
            alert (`That's not a valid number`);
        }
    })

    closeBtn.addEventListener('click', () => {
        popUp.remove();
    })
})

createGrid(25);
