import { data, Data } from './data';

function renderSlides(data: Data[]): void {
    const slider = getSliderElement()

    if (slider == null) {
        return;
    }

    let content = '';

    data.forEach((item) => {
        content += `<div class="slide-content">
        <img src="${item.image}" class="slide-background">
        <div class="slide-inner-content container">
            <h2>${item.title}</h2>
            <p>${item.description}</p>
            <button class="slide-button">Some action</button>
        </div>
    </div>`
    });

    console.log(content);

    slider.innerHTML = content;
}

function getSliderElement(): HTMLDivElement | null {
    return document.querySelector<HTMLDivElement>('section.slider .slides-container');
}

renderSlides(data);

const slidesContainerElement = getSliderElement();
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

function leftSlide(): void {
    doSlide(-1);
}

function rightSlide(): void {
    doSlide(1);
}

window['doSlide'] = doSlide;
window['leftSlide'] = leftSlide;
window['rightSlide'] = rightSlide;
