import { Navigation } from './components/navigation.js';
import { AnimatedCounter } from './components/counter.js';
import { Tabs } from './components/tabs.js';
import { Slider } from './components/slider.js';
import { NewsletterForm } from './components/newsletter.js';
import { ToastNotification } from './services/notification.js';
import { EmailValidator } from './services/validator.js';

/**
 * Inicializador da aplicação
 */
export class Application {
    #components;
    #notification;

    constructor() {
        this.#components = new Map();
        this.#notification = new ToastNotification();
    }

    register(name, factory) {
        this.#components.set(name, factory);
        return this;
    }

    init() {
        const initialized = [];

        this.#components.forEach((factory, name) => {
            try {
                const component = factory();
                component.init();
                initialized.push({ name, component });
            } catch (error) {
                console.error(`Erro ao inicializar ${name}:`, error);
                this.#notification.show(`Erro ao carregar: ${name}`, 'error');
            }
        });

        console.log(`✓ App inicializado com ${initialized.length} componentes`);
        return initialized;
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    const validator = new EmailValidator();
    const notification = new ToastNotification();

    const app = new Application();

    app
        .register('navigation', () => new Navigation())
        .register('counter', () => new AnimatedCounter())
        .register('tabs', () => new Tabs())
        .register('slider', () => new Slider())
        .register('newsletter', () => new NewsletterForm(
            '[data-component="newsletter-form"]',
            validator,
            notification
        ));

    app.init();
});
