import { Component } from '../base.js';

/**
 * Componente de contador animado
 */
export class AnimatedCounter extends Component {
    #elements;
    #duration;
    #observer;

    constructor(selector = '[data-component="stats-counter"]', duration = 2000) {
        super();
        const container = document.querySelector(selector);
        this.#elements = container ? Array.from(container.querySelectorAll('[data-target]')) : [];
        this.#duration = duration;
    }

    init() {
        if (this.#elements.length === 0) return;

        this.#observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.#animateElement(entry.target);
                    this.#observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        this.#elements.forEach(el => this.#observer.observe(el));
    }

    #animateElement(element) {
        const target = parseInt(element.dataset.target, 10);
        const startTime = performance.now();

        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / this.#duration, 1);
            const eased = this.#easeOutQuart(progress);
            const current = Math.floor(eased * target);

            element.textContent = this.#formatNumber(current);

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = this.#formatNumber(target);
            }
        };

        requestAnimationFrame(update);
    }

    #easeOutQuart(x) {
        return 1 - Math.pow(1 - x, 4);
    }

    #formatNumber(num) {
        return num >= 1000 ? (num / 1000).toFixed(0) + 'k+' : num.toString();
    }

    destroy() {
        this.#observer?.disconnect();
    }
}
