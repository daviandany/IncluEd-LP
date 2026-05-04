import { Component } from '../base.js';

/**
 * Componente de Tabs
 */
export class Tabs extends Component {
    #container;
    #tabs;
    #panels;

    constructor(selector = '[data-component="feature-tabs"]') {
        super();
        this.#container = document.querySelector(selector);
        this.#tabs = this.#container ? Array.from(this.#container.querySelectorAll('[role="tab"]')) : [];
        this.#panels = this.#container ? Array.from(this.#container.querySelectorAll('[role="tabpanel"]')) : [];
    }

    init() {
        this.#tabs.forEach(tab => {
            tab.addEventListener('click', () => this.#activateTab(tab));
            tab.addEventListener('keydown', (e) => this.#handleKeydown(e));
        });
    }

    #activateTab(targetTab) {
        this.#tabs.forEach(tab => {
            const isActive = tab === targetTab;
            tab.classList.toggle('features__tab--active', isActive);
            tab.setAttribute('aria-selected', isActive);
            tab.setAttribute('tabindex', isActive ? '0' : '-1');
        });

        const targetId = targetTab.getAttribute('aria-controls');
        this.#panels.forEach(panel => {
            const isActive = panel.id === targetId;
            panel.classList.toggle('features__panel--active', isActive);
            panel.hidden = !isActive;
        });
    }

    #handleKeydown(event) {
        const currentIndex = this.#tabs.indexOf(document.activeElement);
        let nextIndex;

        switch (event.key) {
            case 'ArrowRight':
                nextIndex = (currentIndex + 1) % this.#tabs.length;
                break;
            case 'ArrowLeft':
                nextIndex = (currentIndex - 1 + this.#tabs.length) % this.#tabs.length;
                break;
            case 'Home':
                nextIndex = 0;
                break;
            case 'End':
                nextIndex = this.#tabs.length - 1;
                break;
            default:
                return;
        }

        event.preventDefault();
        this.#tabs[nextIndex].focus();
        this.#activateTab(this.#tabs[nextIndex]);
    }

    destroy() {}
}
