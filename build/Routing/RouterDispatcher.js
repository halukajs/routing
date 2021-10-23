'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name RouterDispatcher
 * @author Robin Panta <hacktivistic@gmail.com>
 */
const CompiledRoute_1 = require("./CompiledRoute");
class RouterDispatcher {
    constructor(router, opts) {
        this.router = router;
        this.options = opts;
    }
    *load() {
        for (const route of this.router.routes) {
            yield CompiledRoute_1.default.FromRoute(route, this.options);
        }
    }
    /* istanbul ignore next */
    create() {
        throw new TypeError('create() not implemented.');
    }
    /* istanbul ignore next */
    dispatch(_instance) {
        throw new TypeError('dispatch() not implemented.');
    }
    /* istanbul ignore next */
    createAndDispatch() {
        const app = this.create();
        return this.dispatch(app);
    }
}
exports.default = RouterDispatcher;
//# sourceMappingURL=RouterDispatcher.js.map