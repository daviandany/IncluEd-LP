/**
 * Validador de e-mail
 */
export class EmailValidator {
    validate(value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    }

    getErrorMessage() {
        return 'Por favor, insira um e-mail válido.';
    }
}
