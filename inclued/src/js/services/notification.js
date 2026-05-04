/**
 * Serviço de notificação via Toast
 */
export class ToastNotification {
    #container;
    #defaultDuration;

    constructor(selector = '[data-component="toast-container"]', duration = 4000) {
        this.#container = document.querySelector(selector);
        this.#defaultDuration = duration;
    }

    show(message, type = 'info', duration = this.#defaultDuration) {
        if (!this.#container) return;

        const toast = document.createElement('div');
        toast.className = `toast toast--${type}`;
        toast.textContent = message;
        toast.setAttribute('role', 'alert');

        this.#container.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('toast--exit');
            toast.addEventListener('animationend', () => toast.remove());
        }, duration);
    }
}
