/**
 * Interface base para componentes
 */
export class Component {
    init() {
        throw new Error('init() must be implemented');
    }

    destroy() {
        throw new Error('destroy() must be implemented');
    }
}
