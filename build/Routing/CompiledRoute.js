'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
class CompiledRoute {
    constructor(uri, methods, name, middlewares, compiledAction, conditions) {
        this.uri = uri;
        this.methods = methods;
        this.name = name;
        this.compiledAction = compiledAction;
        this.middlewares = middlewares;
        this.conditions = conditions;
    }
    static FromRoute(route, compilerOptions) {
        let action = route.action;
        if ((0, lodash_1.isNull)(action)) {
            throw new TypeError('Action not implemented.');
        }
        // controller
        if ((0, lodash_1.isString)(action)) {
            const _action = route.action;
            const info = _action.split('.');
            if (info.length !== 2)
                throw new TypeError(`Invalid route action [${route.action}] for route [${route.uri}]`);
            // eslint-disable-next-line
            const ControllerClass = require(compilerOptions.path + '/' + info[0]).default;
            if (!ControllerClass)
                throw new TypeError(`Controller for action [${route.action}] doesn't export a default controller class.`);
            // grab the controller class
            const c = new ControllerClass();
            if (typeof (c[info[1]]) !== 'function')
                throw new TypeError(`Controller [${info[0]}] doesn't have method [${info[1]}] for action ${route.action}`);
            // push controller middlewares to route
            route.middlewares.push(...c.middlewares);
            action = (opts) => c[info[1]](opts);
        }
        return new CompiledRoute(route.uri, route.methods, route.getName(), route.middlewares, action, route.attribs.where || {});
    }
}
exports.default = CompiledRoute;
//# sourceMappingURL=CompiledRoute.js.map