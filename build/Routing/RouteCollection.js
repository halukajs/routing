'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class RouteCollection {
    constructor() {
        this._routes = [];
        this._namedRoutes = [];
    }
    add(route) {
        this._routes.push(route);
        return route;
    }
    clear() {
        this._routes = [];
        this._namedRoutes = [];
    }
    getByName(name) {
        return this._namedRoutes[name];
    }
    getRoutes() {
        return this._routes;
    }
    refreshNames() {
        this._namedRoutes = [];
        this._routes.forEach(x => {
            if (x.getName())
                this._namedRoutes[x.getName()] = x;
        });
    }
}
exports.default = RouteCollection;
//# sourceMappingURL=RouteCollection.js.map