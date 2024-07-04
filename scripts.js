const etchBoard = document.querySelector('#etchBoard');
const etchContainer = document.querySelector('#etchContainer');
const resizeBtn = document.querySelector('#resizeBtn');
const clearBtn = document.querySelector('#clearBoard');

const colorPalette = ['#fd6f41', '#f7cf0b', '#7cc947', '#46b1f9', '#7f7df8'];

const toolsBtns = document.querySelectorAll('.toolsBtns');
const BrushesBtns = document.querySelectorAll('.BrushesBtns');

let toolID = 'monochromatic';
toolsBtns.forEach(toolBtn => {
    toolBtn.addEventListener('click', e => {
        let button = e.currentTarget;
        toolsBtns.forEach(btn => btn !== button && btn.classList.remove('selected'));
        toolBtn.classList.toggle('selected');
        toolID = toolBtn.id;
    })
})
function createGrid(numberAcross) {
    for (i = 0; i < numberAcross * numberAcross; i++) {
        let pixelWidth = (100 / numberAcross) - 0.2;
        let pixelBlock = document.createElement('div');
        pixelBlock.classList.add('pixelBlock');
        pixelBlock.style.flexBasis = `${pixelWidth}%`;
        etchBoard.appendChild(pixelBlock);
    }

    const pixels = document.querySelectorAll('div.pixelBlock');
    pixels.forEach(pixel => {
        pixel.addEventListener('mouseover', () => {
            switch (toolID) {
                case 'eraser':
                    pixel.style.backgroundColor = `#37373a`;
                    pixel.style.boxShadow = `none`;
                    pixel.style.opacity = 1;
                    break;
                case 'rainbow':
                    let color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
                    pixel.style.backgroundColor = `${color}`;
                    pixel.style.boxShadow = `0px 0px 20px ${color}`;
                    pixel.style.opacity = 1;
                    break;
                case 'monochromatic':
                    pixel.style.backgroundColor = `red`;
                    pixel.style.boxShadow = `0px 0px 20px red`;
                    pixel.style.opacity = 1;
                    break;
                case 'opacity':
                    pixel.style.backgroundColor = `white`;
                    pixel.style.boxShadow = `0px 0px 20px white`;
                    const pixelStyle = getComputedStyle(pixel);
                    let currentOpacity = parseFloat(pixelStyle.opacity);
                    if (currentOpacity == 1) {
                        currentOpacity = 0.1;
                    } else if (currentOpacity < 1) {
                        currentOpacity = currentOpacity + 0.1;
                    }
                    pixel.style.opacity = currentOpacity;
                    break;
                default:
                    pixel.style.backgroundColor = `red`;
                    pixel.style.boxShadow = `0px 0px 20px red`;
                    pixel.style.opacity = 1;
            }
        })
        pixel.addEventListener('mousedown', event => {
            if (event.button == 1) {
                pixel.style.backgroundColor = `#37373a`;
                pixel.style.boxShadow = `none`;
                pixel.style.opacity = 1;
            }
        })

        clearBtn.addEventListener('click', () => {
            pixel.style.backgroundColor = `#37373a`;
            pixel.style.boxShadow = `none`;
            pixel.style.opacity = 1;
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
            resizeBtn.disabled = false;
        } else {
            alert(`Please enter a number between 0 and 100`);
        }
    })

    closeBtn.addEventListener('click', () => {
        popUp.remove();
        resizeBtn.disabled = false;
    })
}

resizeBtn.addEventListener('click', () => {
    createPopUp();
    resizeBtn.disabled = true;
})

createGrid(25);
