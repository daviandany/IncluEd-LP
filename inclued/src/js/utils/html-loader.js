/**
 * Sistema de carregamento de componentes HTML
 * Carrega arquivos HTML em elementos específicos
 */

export class HTMLLoader {
    static async loadComponent(path, targetSelector) {
        try {
            const response = await fetch(path);
            if (!response.ok) throw new Error(`Erro ao carregar ${path}`);
            const html = await response.text();
            const target = document.querySelector(targetSelector);
            if (target) {
                target.insertAdjacentHTML('beforeend', html);
            }
        } catch (error) {
            console.error(error);
        }
    }

    static async loadAll(components) {
        for (const { path, selector } of components) {
            await this.loadComponent(path, selector);
        }
    }
}
