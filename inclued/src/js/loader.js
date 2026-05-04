/**
 * Carregador de componentes e inicializador da aplicação
 */

import { HTMLLoader } from './utils/html-loader.js';
import { Navigation } from './components/navigation.js';
import { AnimatedCounter } from './components/counter.js';
import { Tabs } from './components/tabs.js';
import { Slider } from './components/slider.js';
import { NewsletterForm } from './components/newsletter.js';
import { ToastNotification } from './services/notification.js';
import { EmailValidator } from './services/validator.js';
import { Application } from './app.js';

/**
 * Carrega componentes HTML e inicializa aplicação
 */
async function initializeApp() {
    try {
        // 1. Carregar componentes HTML
        await HTMLLoader.loadAll([
            { path: 'src/html/components/header.html', selector: 'body' },
            { path: 'src/html/components/hero.html', selector: 'main' },
            { path: 'src/html/components/about.html', selector: 'main' },
            { path: 'src/html/components/features.html', selector: 'main' },
            { path: 'src/html/components/testimonials.html', selector: 'main' },
            { path: 'src/html/components/cta.html', selector: 'main' },
            { path: 'src/html/components/footer.html', selector: 'body' },
        ]);

        console.log('✓ Componentes HTML carregados');

        // 2. Inicializar aplicação JavaScript
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

    } catch (error) {
        console.error('Erro ao inicializar aplicação:', error);
    }
}

// Iniciar quando DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}
