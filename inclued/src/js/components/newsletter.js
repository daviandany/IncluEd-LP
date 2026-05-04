import { Component } from '../base.js';

/**
 * Componente de formulário newsletter
 */
export class NewsletterForm extends Component {
    #form;
    #validator;
    #notification;
    #errorElement;

    constructor(selector = '[data-component="newsletter-form"]', validator, notification) {
        super();
        this.#form = document.querySelector(selector);
        this.#validator = validator;
        this.#notification = notification;
        this.#errorElement = this.#form?.querySelector('.form-error');
    }

    init() {
        if (!this.#form) return;
        this.#form.addEventListener('submit', (e) => this.#handleSubmit(e));
    }

    #handleSubmit(event) {
        event.preventDefault();
        const emailInput = this.#form.querySelector('input[type="email"]');
        const email = emailInput.value.trim();

        this.#clearError();

        if (!this.#validator.validate(email)) {
            this.#showError(this.#validator.getErrorMessage());
            emailInput.focus();
            return;
        }

        this.#simulateSubmission(email);
    }

    #showError(message) {
        if (this.#errorElement) {
            this.#errorElement.textContent = message;
        }
    }

    #clearError() {
        if (this.#errorElement) {
            this.#errorElement.textContent = '';
        }
    }

    #simulateSubmission(email) {
        const submitBtn = this.#form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';

        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            this.#form.reset();
            this.#notification.show(
                `Bem-vindo! Enviamos um link de confirmação para ${email}.`,
                'success'
            );
        }, 1500);
    }

    destroy() {}
}
