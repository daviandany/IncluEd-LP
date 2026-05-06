/**
 * Carrega componentes HTML da landing page.
 */

import { HTMLLoader } from './utils/html-loader.js';

async function initializeLandingPage() {
    try {
        await HTMLLoader.loadAll([
            { path: 'src/html/components/header.html', selector: '#header-slot' },
            { path: 'src/html/components/hero.html', selector: 'main' },
            { path: 'src/html/components/about.html', selector: 'main' },
            { path: 'src/html/components/features.html', selector: 'main' },
            { path: 'src/html/components/testimonials.html', selector: 'main' },
            { path: 'src/html/components/cta.html', selector: 'main' },
            { path: 'src/html/components/footer.html', selector: 'body' },
        ]);

        console.log('✓ Landing page carregada');
    } catch (error) {
        console.error('Erro ao carregar landing page:', error);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeLandingPage);
} else {
    initializeLandingPage();
}
