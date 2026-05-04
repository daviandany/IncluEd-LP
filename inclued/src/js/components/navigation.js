import { Component } from '../base.js';

/**
 * Componente de navegação mobile
 */
export class Navigation extends Component {
    #toggleBtn;
    #menu;
    #isOpen;

    constructor(selector = '[data-component="header"]') {
        super();
        const container = document.querySelector(selector);
        this.#toggleBtn = container?.querySelector('.header__menu-toggle');
        this.#menu = container?.querySelector('.header__menu');
        this.#isOpen = false;
    }

    init() {
        if (!this.#toggleBtn || !this.#menu) return;
        this.#toggleBtn.addEventListener('click', () => this.#toggle());
        document.addEventListener('click', (e) => this.#handleOutsideClick(e));
        window.addEventListener('resize', () => this.#handleResize());
    }

    #toggle() {
        this.#isOpen = !this.#isOpen;
        this.#updateState();
    }

    #updateState() {
        this.#toggleBtn.setAttribute('aria-expanded', this.#isOpen);
        this.#menu.classList.toggle('is-open', this.#isOpen);
        document.body.style.overflow = this.#isOpen ? 'hidden' : '';
    }

    #handleOutsideClick(event) {
        if (this.#isOpen && !this.#menu.contains(event.target) && !this.#toggleBtn.contains(event.target)) {
            this.#isOpen = false;
            this.#updateState();
        }
    }

    #handleResize() {
        if (window.innerWidth >= 768 && this.#isOpen) {
            this.#isOpen = false;
            this.#updateState();
        }
    }

    destroy() {}
}
