import { data } from './data';

// function sayHello(): void {
//     alert('Hello');
// }

// function getDataFromUser(message: string): string | null {
//     message = message === undefined ? 'введи что-нибудь' : message;
//     return prompt(message);
// }

// function getRandomNumber (min: number, max: number): number {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// };

const slidesContainerElement = document.querySelector<HTMLDivElement>('section.slider .slides-container');
const slidesCount = slidesContainerElement?.children.length || 0;
let currentSlideIndex = 0;

type Direction = -1 | 1;

function doSlide(direction: Direction): void {
    if (slidesContainerElement == null) {
        return;
    }

    if (currentSlideIndex === 0 && direction === -1 || 
        currentSlideIndex === slidesCount - 1 && direction === 1) {
        return;
    }

    currentSlideIndex += direction;
    const transformationValue = -100 * currentSlideIndex;

    slidesContainerElement.style.transform = `translateX(${transformationValue}vw)`;
}

// @ts-ignore
function leftSlide(): void {
    doSlide(-1);
}

// @ts-ignore
function rightSlide(): void {
    doSlide(1);
}

console.log(data);
