'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name Controller
 * @author Robin Panta <hacktivistic@gmail.com>
 */
class Controller {
    constructor() {
        this.middlewares = [];
    }
    middleware(middleware) {
        this.middlewares.push(middleware);
    }
}
exports.default = Controller;
//# sourceMappingURL=Controller.js.map