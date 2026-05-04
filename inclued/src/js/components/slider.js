import { Component } from '../base.js';

/**
 * Componente de Slider/Carrossel
 */
export class Slider extends Component {
    #container;
    #track;
    #slides;
    #prevBtn;
    #nextBtn;
    #dots;
    #currentIndex;
    #totalSlides;

    constructor(selector = '[data-component="slider"]') {
        super();
        this.#container = document.querySelector(selector);
        this.#track = this.#container?.querySelector('.testimonials__track');
        this.#slides = this.#track ? Array.from(this.#track.children) : [];
        this.#prevBtn = this.#container?.querySelector('.testimonials__btn--prev');
        this.#nextBtn = this.#container?.querySelector('.testimonials__btn--next');
        this.#dots = this.#container ? Array.from(this.#container.querySelectorAll('.testimonials__dot')) : [];
        this.#currentIndex = 0;
        this.#totalSlides = this.#slides.length;
    }

    init() {
        if (this.#totalSlides === 0) return;

        this.#prevBtn?.addEventListener('click', () => this.#goToPrevious());
        this.#nextBtn?.addEventListener('click', () => this.#goToNext());
        this.#dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.#goToSlide(index));
        });

        this.#updateSlider();
        window.addEventListener('resize', () => this.#updateSlider());
    }

    #goToPrevious() {
        this.#currentIndex = (this.#currentIndex - 1 + this.#totalSlides) % this.#totalSlides;
        this.#updateSlider();
    }

    #goToNext() {
        this.#currentIndex = (this.#currentIndex + 1) % this.#totalSlides;
        this.#updateSlider();
    }

    #goToSlide(index) {
        this.#currentIndex = index;
        this.#updateSlider();
    }

    #updateSlider() {
        const slideWidth = this.#slides[0]?.getBoundingClientRect().width || 0;
        const gap = 32;
        const offset = this.#currentIndex * (slideWidth + gap);

        this.#track.style.transform = `translateX(-${offset}px)`;

        this.#dots.forEach((dot, index) => {
            const isActive = index === this.#currentIndex;
            dot.classList.toggle('testimonials__dot--active', isActive);
            dot.setAttribute('aria-selected', isActive);
        });
    }

    destroy() {}
}
