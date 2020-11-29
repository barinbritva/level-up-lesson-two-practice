// const dataFromUser = getDataFromUser();
// console.log(dataFromUser);

function sayHello() {
    alert('Hello');
}

function getDataFromUser(message) {
    message = message === undefined ? 'введи что-нибудь' : message;
    return prompt(message);
}

function getRandomNumber (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// const lButton = document.querySelector('.left-button');
// lButton.onclick = leftSlide;

const slidesContainerElement = document.querySelector('section.slider .slides-container');
const slidesCount = slidesContainerElement.children.length;
let currentSlideIndex = 0;
function doSlide(direction) {
    if (currentSlideIndex === 0 && direction === -1 || 
        currentSlideIndex === slidesCount - 1 && direction === 1) {
        return;
    }
    currentSlideIndex += direction;
    const transformationValue = -100 * currentSlideIndex;
    slidesContainerElement.style.transform = `translateX(${transformationValue}vw)`;
}

function leftSlide() {
    doSlide(-1);
}

function rightSlide() {
    doSlide(1);
}
